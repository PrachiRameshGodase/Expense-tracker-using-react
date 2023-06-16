// import { useContext } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import AuthForm from './components/Auth/AuthForm';
// import StartingPageContent from './components/StartingPage/StartingPageContent';
// import ContactDetails from './components/Pages/ContactDetails';
// import AuthContext from './store/auth-context';
// import 'bootstrap/dist/css/bootstrap.css';

// function App() {
//   const authCtx = useContext(AuthContext);
//   return (
//     <>
//       <Routes>
//         {!authCtx.isLoggedIn && <Route path="/" element={<AuthForm />} />}
//         {authCtx.isLoggedIn && (
//           <>
//             <Route path="/dashboard" element={<StartingPageContent />} />
//             <Route path="/contact-details" element={<ContactDetails />} />
//           </>
//         )}
        
        
//       </Routes>
//     </>
//   );
// }

// export default App;
import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import StartingPageContent from './components/StartingPage/StartingPageContent';
import ContactDetails from './components/Pages/ContactDetails';
import AuthContext from './store/auth-context';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    // If the user is logged in, you can perform any necessary actions here, such as fetching data or updating the context.
    if (authCtx.isLoggedIn) {
      // Perform any desired actions for logged-in users
    }
  }, [authCtx.isLoggedIn]);

  return (
    <React.Fragment>
      {/* <Routes>
        {!authCtx.isLoggedIn && <Route path="/" element={<AuthForm />} />}
        {authCtx.isLoggedIn && <Navigate to="/dashboard" />}
        <Route path="/dashboard" element={<StartingPageContent />} />
        <Route path="/contact-details" element={<ContactDetails />} />
      </Routes> */}

<Routes>
  {!authCtx.isLoggedIn && <Route path="/" element={<AuthForm />} />}
  {authCtx.isLoggedIn && <Route path="/" element={<Navigate to="/dashboard" />} />} {/* Move the <Navigate> component inside a <Route> */}
  <Route path="/dashboard" element={<StartingPageContent />} />
  <Route path="/contact-details" element={<ContactDetails />} />
</Routes>

    </React.Fragment>
  );
}

export default App;
