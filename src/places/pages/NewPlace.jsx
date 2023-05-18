import React, { useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/utils/validators';
import './NewPlace.css';
import './PlaceForm.css';
import { useForm } from "../../shared/hooks/form-hook";
import useHttpClient from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/loading/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/loading/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../shared/components/UIElements/imageUpload/ImageUpload";

const NewPlace = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { error, isLoading, sendRequest, clearError} = useHttpClient();
  const [formState, inputHandler] = useForm({
    title:{
      value:'',
      isValid: false
    },
    description:{
      value:'',
      isValid: false
    },
    address:{
      value:'',
      isValid: false
    },
    image: {
      value: null,
      isValid: false
    }
  }, false);

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      // formData.append('creator', auth.userId); // it is extract on backend from sending token
      formData.append('image', formState.inputs.image.value);

      // await sendRequest('http://localhost:5000/api/places', 'POST', JSON.stringify({
      //    title: formState.inputs.title.value, 
      //    description: formState.inputs.description.value,
      //    address: formState.inputs.address.value,
      //    creator: auth.userId
      //   }),{'Content-Type': 'application/json'});

      // await sendRequest('http://localhost:5000/api/places', 'POST', formData, {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places`, 'POST', formData, {
        Authorization : auth.token
      });

        navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <ImageUpload id="image" center onInput={inputHandler} errorText="Please provide an image"/>
        <Input
          id='title'
          element="input"
          type="text"
          lable="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please enter valid title"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textArea"
          lable="Description"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="please enter valid description(at least 5 characters)"
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          lable="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please enter valid address"
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
      </form>
    </>
  );
};

export default NewPlace;
