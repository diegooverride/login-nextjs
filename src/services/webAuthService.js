import webAuthApi from "utils/webAuthApi"
import Cookie from 'js-cookie'
import { addDays } from 'date-fns'

const webAuthService = {
  async getChallenge() {
    const response = await webAuthApi.get("challenge")
    return response.data
  },

  /**
   * Calls the .create() webauthn APIs and sends returns to server
   * @return {any} server response object
   */
  async createCredential() {
    try {
      await webAuthApi.get("challenge").then(response => {
        const challenge = stringToArrayBuffer(response.data.result)
        if (
          !PublicKeyCredential ||
          typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable !==
            "function"
        )
          return Promise.reject(
            "WebAuthn APIs are not available on this user agent."
          )

        var attachment = "platform"

        var createCredentialOptions = {
          rp: {
            name: "WebAuthn Sample App",
            icon: "https://example.com/rpIcon.png"
          },
          user: {
            id: stringToArrayBuffer("some.user.id"),
            name: "bob.smith@contoso.com",
            displayName: "Bob Smith",
            icon: "https://example.com/userIcon.png"
          },
          pubKeyCredParams: [
            {
              //External authenticators support the ES256 algorithm
              type: "public-key",
              alg: -7
            },
            {
              //Windows Hello supports the RS256 algorithm
              type: "public-key",
              alg: -257
            }
          ],
          authenticatorSelection: {
            //Select authenticators that support username-less flows
            requireResidentKey: true,
            //Select authenticators that have a second factor (e.g. PIN, Bio)
            userVerification: "required",
            //Selects between bound or detachable authenticators
            authenticatorAttachment: attachment
          },
          //Since Edge shows UI, it is better to select larger timeout values
          timeout: 50000,
          //an opaque challenge that the authenticator signs over
          challenge: challenge,
          //prevent re-registration by specifying existing credentials here
          excludeCredentials: [],
          //specifies whether you need an attestation statement
          attestation: "none"
        }

        try {
          navigator.credentials
            .create({
              publicKey: createCredentialOptions
            })
            .then(rawAttestation => {
              var attestation = {
                id: base64encode(rawAttestation.rawId),
                clientDataJSON: arrayBufferToString(
                  rawAttestation.response.clientDataJSON
                ),
                attestationObject: base64encode(
                  rawAttestation.response.attestationObject
                )
              }

              console.log("=== Attestation response ===")
              logVariable("id (base64)", attestation.id)
              logVariable("clientDataJSON", attestation.clientDataJSON)
              logVariable(
                "attestationObject (base64)",
                attestation.attestationObject
              )

              try {
                webAuthApi.put("credentials", attestation).then(response => {
                  const stringCredential = JSON.stringify(response.data.result)
                  localStorage.setItem("credential", stringCredential)
                  return response
                })
              } catch (error) {
                console.error("Erro ao armazenar credenciais", error)
              }
            })
        } catch (error) {
          console.error("Erro ao criar credenciais", error)
        }
      })
    } catch (error) {
      console.error("Erro ao recuperar challenge", error)
    }
  },

  /**
   * Calls the .get() API and sends result to server to verify
   * @return {any} server response object
   */
  async getAssertion() {
    const challenge = await webAuthApi.get("challenge")

    if (!PublicKeyCredential)
      return Promise.reject(
        "WebAuthn APIs are not available on this user agent."
      )

    const credential = JSON.parse(await localStorage.getItem("credential"))

    var allowCredentialsSelection = "filled"

    var credentialId = credential.id

    if (!credentialId) return Promise.reject("Please create a credential first")

    var allowCredentials = [
      {
        type: "public-key",
        id: Uint8Array.from(atob(credentialId), c => c.charCodeAt(0)).buffer
      }
    ]

    var getAssertionOptions = {
      //specifies which credential IDs are allowed to authenticate the user
      //if empty, any credential can authenticate the users
      allowCredentials: allowCredentials,
      //an opaque challenge that the authenticator signs over
      challenge: stringToArrayBuffer(challenge.data.result),
      //Since Edge shows UI, it is better to select larger timeout values
      timeout: 50000
    }

    const rawAssertion = await navigator.credentials.get({
      publicKey: getAssertionOptions
    })

    var assertion = {
      id: base64encode(rawAssertion.rawId),
      clientDataJSON: arrayBufferToString(rawAssertion.response.clientDataJSON),
      userHandle: base64encode(rawAssertion.response.userHandle),
      signature: base64encode(rawAssertion.response.signature),
      authenticatorData: base64encode(rawAssertion.response.authenticatorData)
    }

    console.log("=== Assertion response ===")
    logVariable("id (base64)", assertion.id)
    logVariable("userHandle (base64)", assertion.userHandle)
    logVariable("authenticatorData (base64)", assertion.authenticatorData)
    logVariable("clientDataJSON", assertion.clientDataJSON)
    logVariable("signature (base64)", assertion.signature)

    const verifiedCredentials = await webAuthApi.put("/assertion", { assertion, credential })

    if(verifiedCredentials) {
      Cookie.set("accessToken", 'token', {
        expires: addDays(new Date(), 1)
      })
      Cookie.set("userData", JSON.stringify({id: 1, name: "teste", email: "teste@teste.com", senha: "teste"}), {
        expires: addDays(new Date(), 1)
      })
    }

    return verifiedCredentials;
  }
}

/**
 * Base64 encodes an array buffer
 * @param {ArrayBuffer} arrayBuffer
 */
function base64encode(arrayBuffer) {
  if (!arrayBuffer || arrayBuffer.length == 0) return undefined

  return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)))
}

/**
 * Converts a string to an ArrayBuffer
 * @param {string} string string to convert
 * @returns {ArrayBuffer}
 */
function stringToArrayBuffer(str) {
  return Uint8Array.from(str, c => c.charCodeAt(0)).buffer
}

/**
 * Converts an array buffer to a UTF-8 string
 * @param {ArrayBuffer} arrayBuffer
 * @returns {string}
 */
function arrayBufferToString(arrayBuffer) {
  return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
}

/**
 * Logs a variable to console
 * @param {string} name variable name
 * @param {string} text variable content
 */
function logVariable(name, text) {
  console.log(name + ": " + text)
}

export default webAuthService
