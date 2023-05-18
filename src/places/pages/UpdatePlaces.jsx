import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card/Card";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_MIN, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE,} from "../../shared/utils/validators";
import useHttpClient from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/loading/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/loading/LoadingSpinner";
import "./PlaceForm.css";
import { AuthContext } from "../../shared/context/auth-context";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famouse sky scrapers in the world",
    imageUrl:
      "https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_334,q_75,w_579/https://assets.simpleviewinc.com/simpleview/image/upload/crm/newyorkstate/GettyImages-486334510_CC36FC20-0DCE-7408-77C72CD93ED4A476-cc36f9e70fc9b45_cc36fc73-07dd-b6b3-09b619cd4694393e.jpg",
    address:
      "Empire State Building 20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empi. State Building",
    description: "One of the most famouse sky scrapers in the world",
    imageUrl:
      "https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_334,q_75,w_579/https://assets.simpleviewinc.com/simpleview/image/upload/crm/newyorkstate/GettyImages-486334510_CC36FC20-0DCE-7408-77C72CD93ED4A476-cc36f9e70fc9b45_cc36fc73-07dd-b6b3-09b619cd4694393e.jpg",
    address:
      "Empire State Building 20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u2",
  },
];

const UpdatePlaces = () => {
  const navigate = useNavigate();
  const placeId = useParams().placeId;
  const auth = useContext(AuthContext);
  const { error, isLoading, sendRequest, clearError} = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value:'',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  // const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);
  // let identifiedPlace;

  useEffect(() => {
    const getPlaceById = async () => {
      try {
        // const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
        setLoadedPlace(responseData.place);
        setFormData({
          title: {
            value:responseData.place.title,
            isValid: true,
          },
          description: {
            value: responseData.place.description,
            isValid: true,
          },
        }, true) 
      } catch (error) {
        console.log(error);
      };
    };

    getPlaceById();
  },[sendRequest, placeId, setFormData])

  // useEffect(()=>{
  //   if(identifiedPlace){
  //     setFormData({
  //       title: {
  //         value:identifiedPlace.title,
  //         isValid: true,
  //       },
  //       description: {
  //         value: identifiedPlace.description,
  //         isValid: true,
  //       },
  //     }, true) 
  //   }
   
  //   // setIsLoading(false); 
  // },[setFormData,identifiedPlace]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // await sendRequest(`http://localhost:5000/api/places/${placeId}`, 
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`, 
        'PATCH', 
        JSON.stringify({
         title: formState.inputs.title.value, 
         description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization : auth.token
        });
        navigate(-1)
    } catch (error) {
      console.log(error);
    }
  };

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if(isLoading){
    return (
      <div className="center">
        <h2>loading...</h2>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          lable="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid title"
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          lable="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter valid description"
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>
    </>
  );
};

export default UpdatePlaces;
