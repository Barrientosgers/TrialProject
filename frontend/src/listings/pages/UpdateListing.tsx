import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Modal from "../../shared/components/UIElements/Modal";
import Listing from "../../models/Listing";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UpdateListing = () => {
  const listingId = useParams().lid;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState<Listing>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      // image: {
      //   value: "",
      //   isValid: false,
      // },
    },
    false
  );

  const fetchPlace = async () => {
    console.log(`${process.env.REACT_APP_BACKEND_URL}/listing/${listingId}`);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/listing/${listingId}`
      );
      console.log(responseData.listing);
      setLoadedPlace(responseData.listing);
      setFormData(
        {
          title: {
            value: responseData.listing.title,
            isValid: true,
          },
          description: {
            value: responseData.listing.description,
            isValid: true,
          },
          price: {
            value: responseData.listing.price,
            isValid: true,
          },
          // image: {
          //   value: responseData.listing.image,
          //   isValid: true,
          // },
        },
        true
      );
    } catch (err) {
      // redirect to main
    }
  };

  useEffect(() => {
    fetchPlace();
  }, [listingId, setFormData, sendRequest]);

  // edit submit handler
  const editListingFormSubmitHandler: (
    event: React.FormEvent<HTMLFormElement>
  ) => void = async (event) => {
    event.preventDefault();
    console.log("sending request");
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/listing/${listingId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          price: formState.inputs.price.value,
          // image: formState.inputs.image.value,
        }),
        {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + auth.token,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    // alert success to user
    showSuccessModalHandler();
    fetchPlace();
  };
  // redirect back to listing page
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const showSuccessModalHandler = () => {
    setShowSuccessModal(true);
  };

  const hideSuccessModalHandler = () => {
    console.log("oink");
    setShowSuccessModal(false);
  };

  // delete handler
  const deleteHandler: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void = async (event) => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/listing/${listingId}`,
        "DELETE",
        null,
        {
          // Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {
      console.log(err);
    }
    console.log("successfully deleted");
    navigate("/");
  };

  if (!loadedPlace || error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    );
  }

  // modal for deletion
  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <button onClick={cancelDeleteHandler}>CANCEL</button>
            <button onClick={deleteHandler}>DELETE</button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <Modal
        show={showSuccessModal}
        onCancel={hideSuccessModalHandler}
        header="Successfully updated"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <button onClick={hideSuccessModalHandler}>OK</button>
          </React.Fragment>
        }
      >
        <p>Successfully updated the listing.</p>
      </Modal>
      {!isLoading && loadedPlace && (
        <form
          id="update-listing"
          className="place-form"
          onSubmit={editListingFormSubmitHandler}
        >
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            type="text"
            label="Description"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description"
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Input
            id="price"
            element="input"
            type="number"
            label="Price"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
            errorText="Please enter a valid price"
            onInput={inputHandler}
            initialValue={loadedPlace.price}
            initialValid={true}
          />
          {/* <ImageUpload
            center
            onInput={inputHandler}
            id="image"
            errorText="Please provide an image"
            initialValue={loadedPlace.price}
          /> */}
          <button type="submit" id="submit-button">
            Submit
          </button>
        </form>
      )}
      <button disabled={!formState.isValid} onClick={showDeleteWarningHandler}>
        Delete Listing
      </button>
    </React.Fragment>
  );
};

export default UpdateListing;
