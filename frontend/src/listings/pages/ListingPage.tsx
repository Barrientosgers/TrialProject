import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../shared/pages/NotFound";
import Listing from "../components/Listing";
import { useHttpClient } from "../../shared/hooks/http-hook";
import classes from "./ListingPage.module.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const ListingPage: () => JSX.Element = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [listing, setListing] = useState(null);
  const listingId = useParams().lid;
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/listing/${listingId}`
        );
        setListing(responseData.listing);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaces();
  }, [sendRequest, listingId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {!isLoading && (
        <div className={classes["listing-page"]}>
          {listing && <Listing listing={listing} />}
          {!listing && <NotFound />}
          {
            //isValidListing && <Suggestions />
          }
        </div>
      )}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
    </React.Fragment>
  );
};

export default ListingPage;
