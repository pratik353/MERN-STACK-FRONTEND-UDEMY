import React, { useContext, useState } from "react";
import "./Auth.css";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_EMAIL, VALIDATOR_MIN, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import {useForm} from '../../shared/hooks/form-hook';
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const auth = useContext(AuthContext);
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

    const authSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }

    const switchModeHandler = () => {
      if(!loginMode){
        setFormData({
          ...formState.inputs,
          name: undefined,
        }, formState.inputs.email.isValid && formState.inputs.password.isValid)
      } else {
        setFormData({
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        }, false)
      }
      setLoginMode(prevMode => !prevMode);
    }

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
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
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a valid password."
          onInput={inputHandler}
        />
        <Button type="submit" disabled= {!formState.isValid}>{loginMode ? 'LOGIN' : 'SIGNUP'}</Button>
      </form>
      <Button inverse onClick={switchModeHandler}>SWITCH TO {loginMode ? 'SIGNUP' : 'LOGIN'}</Button>
    </Card>
  );
};

export default Auth;
