import { useRef } from 'react'
import { Link } from "react-router-dom";

function ForgotPassword() {
    const emailRef = useRef();


    const forgotPasswordHandler = () => {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDOK295ELdPlDwRD3Doj62RleCtXSGNQec",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: emailRef.current.value,
            }),
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("error occured while changing password");
            }
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            // Handle specific error type
            console.log("A TypeError occurred:", err.message);
          });
      };
  return (
    <div>
    <h4>Enter the registered email</h4>
    <input placeholder="Email" ref={emailRef}></input>
    <button
          style={{ backgroundColor: "brown" }}
          onClick={forgotPasswordHandler}
        >
          Send Link
        </button>
        <p>
          Already a user?
          <Link to="/">
            <b style={{ color: "yellow" }}>LOGIN</b>
          </Link>
        </p>

    </div>
  )
}

export default ForgotPassword
