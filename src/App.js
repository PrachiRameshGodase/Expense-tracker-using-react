import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import AuthForm from "./components/Auth/AuthForm";
import StartingPageContent from "./components/StartingPage/StartingPageContent";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Routes>
        {!authCtx.isLoggedIn && <Route path="/" element={<AuthForm />} />}
        {authCtx.isLoggedIn && (
          <Route path="/dashboard" element={<StartingPageContent />} />
        )}
        <Route path="*" element={<StartingPageContent />} />
      </Routes>
    </>
  );
}

export default App;
