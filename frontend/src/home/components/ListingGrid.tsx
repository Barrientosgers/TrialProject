import React, { useState, useEffect } from "react";

import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

import classes from "./ListingGrid.module.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

interface Listing {
  id: string;
  title: string;
  price: number;
}

const ListingGrid: () => JSX.Element = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [listings, setListings] = useState<Listing[]>([]);
  let listingItems;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/listing/`
        );
        setListings(responseData.listings);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlaces();
  }, [setListings, sendRequest]);

  listingItems = listings.map((listing) => {
    return (
      <Card class="" id={listing.id} key={listing.id}>
        <Link to={`/listing/${listing.id}`}>
          <img
            src="https://i.kym-cdn.com/photos/images/original/001/088/637/c67.jpg"
            alt="sample-cat"
          />
          <div className={classes.container}>
            <h4>
              <b>{listing.title}</b>
            </h4>
            <p>${listing.price}</p>
          </div>
        </Link>
      </Card>
    );
  });

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && <div className={classes.grid}>{listingItems}</div>}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
    </React.Fragment>
  );
};

export default ListingGrid;
