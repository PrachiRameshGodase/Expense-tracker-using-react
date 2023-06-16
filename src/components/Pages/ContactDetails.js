// import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';
// import classes from './ContactDetails.module.css';
// import { useNavigate } from 'react-router-dom';

// function ContactDetails() {
//   const [isBouncing, setIsBouncing] = useState(true);
//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     setIsBouncing(false);
//     navigate('/contact-details'); // Replace '/contact-details' with the actual path of the next page
//   };

// const submitHandler=(event)=>{
//     event.preventDefault()
// }

//   return (
//     <div>
//       <div className={classes.starting}>
//         <h1>Winners never quit, Quitters never win..</h1>
//         <Button
//           variant="danger"
//           className={isBouncing ? classes.bouncing : ''}
//           onClick={handleButtonClick}
//           style={{ height: 'auto', whiteSpace: 'normal' }}
//         >
//           Your profile is 64% completed.<br />A complete Profile has higher chances of landing a job. Complete now
//         </Button>
//       </div>
//       <hr />
//       <div className={classes.main}>
//         <h2>Contact Details</h2>
//         <form onSubmit={submitHandler}>
//             <label htmlFor='name'>Full Name:</label>
//             <input type='text' id='name'/>
//             <label htmlFor='profilephoto'>Profile Photo URL:</label>
//             <input type='text' id='profilephoto'/>
//             <Button variant="danger">Update</Button>
//         </form>
//         <hr/>
//       </div>
//     </div>
//   );
// }

// export default ContactDetails;

import React, { useEffect, useRef, useState } from "react";
import { Button } from 'react-bootstrap';
import classes from './ContactDetails.module.css';
import { useNavigate } from 'react-router-dom';


const ContactDetails = () => {
  const fullNameRef = useRef();
  const urlRef = useRef();
  const [initialName, setInitialName] = useState("");
  const [initialUrl, setInitialUrl] = useState("");

  const [isBouncing, setIsBouncing] = useState(true);
        const navigate = useNavigate();

        const handleButtonClick = () => {
            setIsBouncing(false);
             navigate('/contact-details'); // Replace '/contact-details' with the actual path of the next page
  };

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDOK295ELdPlDwRD3Doj62RleCtXSGNQec",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Authentication error");
        }
      })
      .then((res) => {
        console.log(res.users[0].displayName);
        setInitialName(res.users[0].displayName);
        setInitialUrl(res.users[0].photoUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateFormDataHandler = (event) => {
    event.preventDefault();
    const nameRefValue = fullNameRef.current.value;
    const urlRefValue = urlRef.current.value;
    const localStr = localStorage.getItem("token");
    console.log(localStr);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDOK295ELdPlDwRD3Doj62RleCtXSGNQec",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStr,
          displayName: nameRefValue,
          photoUrl: urlRefValue,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("User details updated successfully");
          // You can navigate to a success page or perform any other action
        } else {
          console.log("User details update failed");
          // Handle the error or display an error message to the user
        }
      })
      .catch((error) => {
        console.log("Error occurred while updating user details", error);
      });
  };

  return (
    <div>
      <div className={classes.starting}>
        <h1>Winners never quit, Quitters never win..</h1>
        <Button
          variant="danger"
          className={isBouncing ? classes.bouncing : ''}
          onClick={handleButtonClick}
           style={{ height: 'auto', whiteSpace: 'normal' }}
         >
           Your profile is 64% completed.<br />A complete Profile has higher chances of landing a job. Complete now
         </Button>
       </div>
      <hr />
      <div className={classes.main}>
         <h2>Contact Details</h2>
         <form onSubmit={updateFormDataHandler}>
             <label htmlFor='name'>Full Name:</label>
             <input type='text' id='name' ref={fullNameRef} defaultValue={initialName}/>
            <label htmlFor='profilephoto'>Profile Photo URL:</label>
            <input type='text' id='profilephoto' ref={urlRef} defaultValue={initialUrl}/>
            <Button variant="danger">Update</Button>
        </form>
        <hr/>
       </div>
    </div>
   
  );
};

export default ContactDetails;

