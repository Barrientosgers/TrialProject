import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../shared/pages/NotFound";
import Listing from "../components/Listing";

import classes from "./ListingPage.module.css";

const DUMMY_LISTINGS: { id: string; name: string; price: number }[] = [
  { id: "01", name: "Australian Cat", price: 300 },
  { id: "02", name: "Cat", price: 500 },
  { id: "03", name: "Cat", price: 3000 },
];

const ListingPage: () => JSX.Element = () => {
  const listingId = useParams().lid;
  const isValidListing = DUMMY_LISTINGS.find(
    (listing) => listing.id === listingId
  );
  console.log(isValidListing);

  return (
    <div className={classes["listing-page"]}>
      {isValidListing && <Listing listing={isValidListing} />}
      {!isValidListing && <NotFound />}
      {
        //isValidListing && <Suggestions />
      }
    </div>
  );
};

export default ListingPage;
