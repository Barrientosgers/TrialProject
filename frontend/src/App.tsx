import React, { useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import HomePage from "./home/pages/HomePage";
import ListingPage from "./listings/pages/ListingPage";
import UpdateListing from "./listings/pages/UpdateListing";
import NewListing from "./listings/pages/NewListing";
import NotFound from "./shared/pages/NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoggedOut, setIsLoggedOut] = useState(false);

  //const navigate = useNavigate();

  const login = () => {
    setIsLoggedIn(true);
    //navigate("/");
    console.log(isLoggedIn);
  };

  // const logout = () => {
  //   setIsLoggedOut(false);
  // };

  return (
    <Router>
      <MainNavigation isLoggedIn={isLoggedIn} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listing/:lid/edit" element={<UpdateListing />} />
          <Route path="/listing/:lid" element={<ListingPage />} />
          <Route
            path="/login"
            element={
              <React.Fragment>
                <h1>Login</h1>
                <button onClick={login}>Login</button>
              </React.Fragment>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
