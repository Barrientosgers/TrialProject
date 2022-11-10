import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import classes from "./Listing.module.css";

const Listing: React.FunctionComponent<{
  listing: { id: string; title: string; description: string; price: number };
}> = (props) => {
  return (
    <React.Fragment>
      <div
        className={classNames(classes["sticky-outer-wrapper"], classes.sidebar)}
      >
        <div
          className={classNames(
            classes["sticky-inner-wrapper"],
            classes["inner-sticky"],
            classes.inner
          )}
        >
          <div className={classes.checkout}>
            <h2>${props.listing.price}</h2>
            <div>
              <Link to="" className={classes["contact-button"]}>
                Contact Seller
              </Link>
            </div>
            <div>
              {/* TODO: Change to if is loggedIn*/}
              <Link to={`/listing/${props.listing.id}/edit`}>Edit</Link>
            </div>
          </div>
          <div className={classes.checkout}></div>
        </div>
      </div>
      <div className={classes.main}>
        <nav className={classes["categories-breadcrumbs"]}></nav>
        <h1 className={classes["listing-title"]}>{props.listing.title}</h1>
        <div className={classes["listing-img-container"]}>
          <img
            src="https://i.kym-cdn.com/photos/images/original/001/088/637/c67.jpg"
            alt="sample-cat"
          />
        </div>
        <div className={classes.description}>
          <h1>{props.listing.title}</h1>
          <p>{props.listing.description}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Listing;
