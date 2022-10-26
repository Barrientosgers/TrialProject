import React from "react";

import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";

import classes from "./ListingGrid.module.css";

const DUMMY_LISTINGS: { id: string; name: string; price: number }[] = [
  { id: "01", name: "Australian Cat", price: 300 },
  { id: "02", name: "Cat", price: 500 },
  { id: "03", name: "Cat", price: 3000 },
];
const ListingGrid: () => JSX.Element = () => {
  const listings = DUMMY_LISTINGS.map((listing) => {
    return (
      <Card class="" id={listing.id}>
        <Link to={`/listing/${listing.id}`}>
          <img
            src="https://i.kym-cdn.com/photos/images/original/001/088/637/c67.jpg"
            alt="sample-cat-photo"
          />
          <div className={classes.container}>
            <h4>
              <b>{listing.name}</b>
            </h4>
            <p>${listing.price}</p>
          </div>
        </Link>
      </Card>
    );
  });

  return <div className={classes.grid}>{listings}</div>;
};

export default ListingGrid;
