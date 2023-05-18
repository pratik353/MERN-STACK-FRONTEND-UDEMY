import React, { useContext, useState } from "react";
import "./Auth.css";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_EMAIL, VALIDATOR_MIN, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import ErrorModal from "../../shared/components/UIElements/loading/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/loading/LoadingSpinner";
import {useForm} from '../../shared/hooks/form-hook';
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import useHttpClient from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/UIElements/imageUpload/ImageUpload";

const Auth = () => {
  const auth = useContext(AuthContext);
  const { error, isLoading, sendRequest, clearError} = useHttpClient();
  const navigate = useNavigate();

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value:'',
                isValid: false
            },
            password: {
                value:'',
                isValid: false
            }
        }
    );

    const [loginMode, setLoginMode] = useState(true);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState();

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        // setIsLoading(true);
        // if( loginMode ) {
        //   try {
        //     const response = await fetch('http://localhost:5000/api/users/login',{
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json'
        //       },
        //       // stringify converts javascript object into JSON object
        //       body: JSON.stringify({
        //         email: formState.inputs.email.value,
        //         password: formState.inputs.password.value,
        //       })
        //     });

        //     const responseData = await response.json();
        //     if( !response.ok){
        //       throw new Error(responseData.message);
        //     }

        //     setIsLoading(false);
        //     auth.login();

        //   } catch (error) {
        //     console.log(error);
        //     setIsLoading(false);
        //     setError(error.message || 'Somthing went wrong, please try again later.')
        //   }
        // } else {
        //   try {
        //     const response = await fetch('http://localhost:5000/api/users/signup',{
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json'
        //       },
        //       // stringify converts javascript object into JSON object
        //       body: JSON.stringify({
        //         username: formState.inputs.name.value,
        //         email: formState.inputs.email.value,
        //         password: formState.inputs.password.value,
        //       })
        //     });

        //     const responseData = await response.json();
        //     if( !response.ok){
        //       throw new Error(responseData.message);
        //     }

        //     setIsLoading(false);
        //     auth.login();

        //   } catch (error) {
        //     console.log(error);
        //     setIsLoading(false);
        //     setError(error.message || 'Somthing went wrong, please try again later.')
        //   }
        // }

        // USING CUSTOM HOOK
        if( loginMode ) {
          try {
            // const responseData = await sendRequest('http://localhost:5000/api/users/login', 'POST', JSON.stringify({ email: formState.inputs.email.value, password: formState.inputs.password.value}),{'Content-Type': 'application/json'});
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL+'/users/login', 'POST', JSON.stringify({ email: formState.inputs.email.value, password: formState.inputs.password.value}),{'Content-Type': 'application/json'});
            auth.login(responseData.userId, responseData.token);
          } catch (error) {
            console.log(error);
          }
      } else {
        let formData = new FormData();
        formData.append('username', formState.inputs.name.value);
        formData.append('email', formState.inputs.email.value,);
        formData.append('password', formState.inputs.password.value,);
        formData.append('image', formState.inputs.image.value);
        try {
          // Replaced by formdata
          // await sendRequest('http://localhost:5000/api/users/signup', 'POST', JSON.stringify({ username: formState.inputs.name.value,  email: formState.inputs.email.value, password: formState.inputs.password.value }), {'Content-Type': 'application/json'});
          // await sendRequest('http://localhost:5000/api/users/signup', 'POST', formData );
          await sendRequest(process.env.REACT_APP_BACKEND_URL+'/users/signup', 'POST', formData );
          setLoginMode(true);
        } catch (error) {
          console.log(error);
        }
      }
     
    }

    const switchModeHandler = () => {
      if(!loginMode){
        setFormData({
          ...formState.inputs,
          name: undefined,
          image: undefined
        }, formState.inputs.email.isValid && formState.inputs.password.isValid)
      } else {
        setFormData({
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          }
        }, false)
      }
      setLoginMode(prevMode => !prevMode);
    }

    // const errorHandler = () => {
    //   setError(null);
    // }

  return (
    <>
      <ErrorModal error={error} onClear={clearError}/>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!loginMode && <ImageUpload id="image" center onInput={inputHandler} errorText="Please provide an image"/>}
          {!loginMode && <Input element="input" id="name" type="text" lable="Your name" validators={[VALIDATOR_REQUIRE]} errorText="Please enter name" onInput={inputHandler}/>}
          <Input
            id="email"
            element="input"
            type="email"
            lable="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            lable="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />
          <Button type="submit" disabled= {!formState.isValid}>{loginMode ? 'LOGIN' : 'SIGNUP'}</Button>
        </form>
        <Button inverse onClick={switchModeHandler}>SWITCH TO {loginMode ? 'SIGNUP' : 'LOGIN'}</Button>
      </Card>
    </>
  );
};

export default Auth;
