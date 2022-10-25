import React from "react";

import classes from "./Header.module.css";

const Header: React.FC<{ children: React.ReactNode }> = (props) => {
  return <header className={classes["main-header"]}>{props.children}</header>;
};

export default Header;
