import React from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/utils/validators';
import './NewPlace.css';
import './PlaceForm.css';
import { useForm } from "../../shared/hooks/form-hook";

const NewPlace = () => {
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
  }, false);

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
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
  );
};

export default NewPlace;
