import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css"


const AuthForm = () => {
  
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setisLoading]=useState(false);
  const authCtx=useContext(AuthContext)
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const confirmPassword=confirmPasswordInputRef.current.value;
    console.log(enteredEmail, enteredPassword,confirmPassword);


    if(enteredPassword===confirmPassword){
    setisLoading(true)
    let url;
    if (isLogin) {
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDOK295ELdPlDwRD3Doj62RleCtXSGNQec"
    } else {
      url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOK295ELdPlDwRD3Doj62RleCtXSGNQec"

    }
    fetch(url,
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      setisLoading(false)
      if (response.ok) {
        return response.json()
      } else {
        //The response holds error
        return response.json().then((data) => {
          console.log(data);
          let errorMessage="Authencation failed!";
          // if(data && data.error && data.error.message){
          //   errorMessage=data.error.message 
          // }
          // alert(errorMessage);
          throw new Error(errorMessage)
        });
      }
    }).then(data=>{
      console.log(data)
      authCtx.login(data.idToken);
     
        console.log("successfully sign up")
        navigate("/dashboard");
    //   authCtx.autoLogout();
      
    }).catch(err=>{
      alert(err.message);
    })
  }
  else{
    alert("Password is wrong")
    
  }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.control}>
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          type="password"
          id="confirmpassword"
          ref={confirmPasswordInputRef}
          required
        />
      </div>

        <div className={classes.actions}>
          {!isLoading && <button >{isLogin ? "Login" : "Create Account"}</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          <Link className={classes.forgot} to="/forgotpassword">Forgot Password</Link>
        </div>
      </form>
      
    </section>
    
  );
};

export default AuthForm;