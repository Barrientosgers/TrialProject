import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavLinks.module.css";

const NavLinks: React.FC = (props) => {
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
      <li>
        <NavLink to="/login">Sign In</NavLink>
      </li>
      <li>
        <NavLink to="/join">Join</NavLink>
      </li>
      {/* {auth.isLoggedin && (
        <li>
          <button onClick={auth.logout}>Logout</button>
        </li>
      )} */}
    </ul>
  );
};

export default NavLinks;
