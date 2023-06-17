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
    <>
      <div className={classes.starting}>
        <h1>Welcome to Expense Tracker!</h1>
        <Button
          variant="info"
          className={isBouncing ? classes.bouncing : ''}
          onClick={handleButtonClick}
        >
          Your profile is incomplete. Complete now.
        </Button>
      </div>
      <Link to="/expensetracker">Expense Tracker</Link>
      <hr />
      
      
      <Button onClick={verifyEmailHandler}>verify email</Button>
    </>
  );
};

export default StartingPageContent;
