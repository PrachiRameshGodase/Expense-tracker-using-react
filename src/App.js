import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import StartingPageContent from './components/StartingPage/StartingPageContent';
import ContactDetails from './components/Pages/ContactDetails';

import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Layout/Header';
import ForgotPassword from './components/Pages/ForgotPassword';
import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker';

function App() {
  const isAuth=useSelector(state=>state.auth.isAuthenticated)
  return (
    <Fragment>
     
    <Header/>
      <Routes>
        <Route path="/dashboard" element={<StartingPageContent />} />
        <Route path='/expensetracker' element={<ExpenseTracker/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path="/contact-details" element={<ContactDetails />} />
        <Route path="/" element={isAuth ? <Navigate to="/dashboard" /> : <AuthForm />} />
    </Routes>



    </Fragment>
  );
}

export default App;
