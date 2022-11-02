import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import classes from "./Listing.module.css";

const Listing: React.FunctionComponent<{
  listing: { id: string; title: string; price: number };
}> = (props) => {
  // const [editModal, setEditModal] = useState(false);
  // const openEditModalHandler = () => {
  //   setEditModal(true);
  // };
  // const closeEditModalHandler = () => {
  //   setEditModal(false);
  // };

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
          <h1>{Listing.name}</h1>
          <p>
            Aegean cats are a medium-sized, muscular, semi-longhaired cat. The
            coat is bicolour or tricolour with one of the colours being almost
            always white. White usually takes up between 1/4 to 9/10 of the
            body. The colour of their coat might include many other colours and
            patterns. Their paws are medium in size and have a round shape.
            Their tail can be long and "hooked". The ears have a wide base and
            rounded tips and are covered by hair.
          </p>
          <p>
            Aegean cats are a medium-sized, muscular, semi-longhaired cat. The
            coat is bicolour or tricolour with one of the colours being almost
            always white. White usually takes up between 1/4 to 9/10 of the
            body. The colour of their coat might include many other colours and
            patterns. Their paws are medium in size and have a round shape.
            Their tail can be long and "hooked". The ears have a wide base and
            rounded tips and are covered by hair.
          </p>
          <p>
            Aegean cats are a medium-sized, muscular, semi-longhaired cat. The
            coat is bicolour or tricolour with one of the colours being almost
            always white. White usually takes up between 1/4 to 9/10 of the
            body. The colour of their coat might include many other colours and
            patterns. Their paws are medium in size and have a round shape.
            Their tail can be long and "hooked". The ears have a wide base and
            rounded tips and are covered by hair.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Listing;
