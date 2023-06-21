import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  const [isBouncing, setIsBouncing] = useState(true);
  
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsBouncing(false);
    navigate('/contact-details'); // Replace '/next-page' with the actual path of the next page
  };


  const verifyEmailHandler = () => {
    setIsBouncing(false);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDOK295ELdPlDwRD3Doj62RleCtXSGNQec",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("token"),
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        console.log("verified the email succesfully")
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("not verified");
        }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      
  };
  return (
    <React.Fragment>
    <h1 className='flex items-center justify-center mt-5'>Welcome to Expense Tracker!</h1>
     <section className="bg-gradient-to-b from-purple-900 via-pink-400 to-purple-900 wd-full  max-w-md rounded-6 shadow-md py-4 text-center text-white mx-auto my-5 rounded-4 mb-3">
    <Button
          variant="danger"
          className={isBouncing ? classes.bouncing : ''}
          onClick={verifyEmailHandler}
          
        >
        Your profile is incomplete. Verify Email
    </Button>
    
    </section>

    <section className="bg-gradient-to-b from-purple-900 via-pink-400 to-purple-900 wd-full  max-w-md rounded-6 shadow-md py-4 text-center text-white mx-auto my-5 rounded-4">
    <Button
          variant="danger"
          className={isBouncing ? classes.bouncing : ''}
          onClick={handleButtonClick}
        >
          Your profile is incomplete. Complete now.
    </Button>
    </section>
    <section className="bg-gradient-to-b from-purple-900 via-pink-400 to-purple-900 wd-full  max-w-md rounded-6 shadow-md py-4 text-center text-white mx-auto my-5 rounded-4 ">
    <Link to="/expensetracker"><Button variant="danger"
          className={isBouncing ? classes.bouncing : ''}>Visit now Expense Tracker!</Button></Link>
    </section>
    
     
    </React.Fragment>
  );
};

export default StartingPageContent;
