import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  const [isBouncing, setIsBouncing] = useState(true);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsBouncing(false);
    navigate('/contact-details'); // Replace '/next-page' with the actual path of the next page
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
      <hr />
    </>
  );
};

export default StartingPageContent;
