import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

const DUMMY_LISTING_DATA = {
  id: "01",
  title: "Australian Cat",
  description:
    'Aegean cats are a medium-sized, muscular, semi-longhaired cat. The coat is bicolour or tricolour with one of the colours being almost always white. White usually takes up between 1/4 to 9/10 of the body. The colour of their coat might include many other colours and patterns. Their paws are medium in size and have a round shape. Their tail can be long and "hooked". The ears have a wide base and rounded tips and are covered by hair.',
  price: 300,
  image: "",
};

const UpdateListing = () => {
  const listingId = useParams().lid;
  console.log(listingId);
  const [loadedPlace, setLoadedPlace] = useState<Listing>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
      image: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        // TODO: query backend here
        setLoadedPlace(DUMMY_LISTING_DATA);
        setFormData(
          {
            title: {
              value: DUMMY_LISTING_DATA.title,
              isValid: true,
            },
            description: {
              value: DUMMY_LISTING_DATA.description,
              isValid: true,
            },
            price: {
              value: DUMMY_LISTING_DATA.price,
              isValid: true,
            },
            image: {
              value: DUMMY_LISTING_DATA.image,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        // redirect to main
      }
    };

    fetchPlace();
  }, [setFormData]);

  // edit submit handler
  const formSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => void = (
    event
  ) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      console.log(formData);
    } catch (err) {}
  };
  // redirect back to listing page
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  // delete handler
  const deleteHandler: (event: React.MouseEvent<HTMLButtonElement>) => void = (
    event
  ) => {
    setShowConfirmModal(false);
    /*try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/places/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}*/
    // TODO: redirect to home
  };

  if (!loadedPlace) {
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
      <form
        id="update-listing"
        className="place-form"
        onSubmit={formSubmitHandler}
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
        <ImageUpload
          center
          onInput={inputHandler}
          id="image"
          errorText="Please provide an image"
          initialValue={loadedPlace.price}
        />
        <button type="submit" id="submit-button">
          Submit
        </button>
      </form>
      <button onClick={showDeleteWarningHandler}>Delete Listing</button>
    </React.Fragment>
  );
};

export default UpdateListing;
