import React, { useState } from "react";

import classes from "./MainNavigation.module.css";

import Header from "./Header";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import { Link } from "react-router-dom";

const MainNavigation: React.FC = () => {
  const [drawerIsOpen, setDrawerIsOpen]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const openDrawerHandler: () => void = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler: () => void = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {
        drawerIsOpen && <p>Hello</p> // show close tag here
      }
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className={classes["main-navigation__drawer-nav"]}>
          <NavLinks />
        </nav>
      </SideDrawer>
      <Header>
        <button
          className={classes["main-navigation__menu-btn"]}
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className={classes["main-navigation__title"]}>
          <Link to="/">Logo</Link>
        </h1>
        <nav className={classes["main-navigation__header-nav"]}>
          <NavLinks />
        </nav>
      </Header>
    </React.Fragment>
  );
};

export default MainNavigation;
