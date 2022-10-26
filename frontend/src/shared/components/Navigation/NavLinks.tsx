import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavLinks.module.css";

const NavLinks: React.FC<{ isLoggedIn: boolean }> = (props) => {
  /* 
  TODO: 
  Add user context and update links according
   to user login status
  */
  // const auth = useContext(AuthContext);
  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink to="/discover">Explore</NavLink>
      </li>
      {!props.isLoggedIn && (
        <li>
          <NavLink to="/login">Sign In</NavLink>
        </li>
      )}
      {!props.isLoggedIn && (
        <li className={classes["nav-links__boxed"]}>
          <NavLink to="/join">Join</NavLink>
        </li>
      )}
      {props.isLoggedIn && (
        <li>
          <button /*TODO: onClick={ logout}*/>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
