import React, { useEffect, useState } from "react";
import Cotter from "cotter"; //  1️⃣  Import Cotter

function App() {
  const [payload, setpayload] = useState<any>(null);

  //  2️⃣ Initialize and show the form
  useEffect(() => {
    var cotter = new Cotter("37517c5c-19cf-4e01-afed-7057521caa4a"); // 👈 Specify your API KEY ID here
    cotter
      .withFormID("form_default") // Use customization for form "form_default"
      .signInWithWebAuthnOrLink()
      .showEmailForm()
      .then(response => {
        setpayload(response); // show the response in our state
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {/*  3️⃣  Put a <div> that will contain the form */}
      <div id="cotter-form-container" style={{ width: 300, height: 300 }} />
      
      <pre>{JSON.stringify(payload, null, 4)}</pre>
    </div>
  );
}

export default App;