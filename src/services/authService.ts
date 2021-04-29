import api from 'utils/api'
import Cookie from 'js-cookie'
import { addDays } from 'date-fns'
import User from 'models/user'

interface loginResponse {
  token: string,
  user: User
}

const authService = {
  async signIn(username: string, password: string) {
    const result = await api.post('jwt/login', {
      email: username,
      password
    })
    .then(({ data }: {data: loginResponse}) => {
      
      if(data.token) {
        Cookie.set("accessToken", data.token, {
          expires: addDays(new Date(), 1)
        })
        Cookie.set("userData", data.user, {
          expires: addDays(new Date(), 1)
        })
      }

      return data
    })

    return result
  },

  async signOut() {
    Cookie.remove("accessToken")
  }
}

export default authService