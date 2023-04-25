import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./Auth.css";

function Auth() {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginModeMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const authSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    };

    const isLoginModeModeHandler = () => {
        if (!isLoginMode)
            setFormData(
                { ...formState.inputs, name: undefined },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        else {
            setFormData(
                { ...formState.inputs, name: { value: "", isValid: false } },
                false
            );
        }
        setIsLoginModeMode((prev) => !prev);
    };

    return (
        <div>
            <Card className="authentication">
                <h2>{!isLoginMode ? "Sign Up" : "Login Required"}</h2>
                <hr />
                <form>
                    {!isLoginMode && (
                        <Input
                            element="input"
                            type="text"
                            id="name"
                            label="Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter your name"
                            onInput={inputHandler}
                        />
                    )}
                    <Input
                        element="input"
                        // value={formState.email.value}
                        type="email"
                        id="email"
                        label="Email"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address"
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        // value={formState.password.value}
                        type="password"
                        id="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid password atleast 5 characters"
                        onInput={inputHandler}
                    />
                    <Button
                        onClick={authSubmitHandler}
                        disabled={!formState.isValid}
                    >
                        {!isLoginMode ? "SIGNUP" : "LOGIN"}
                    </Button>
                </form>
                <Button inverse onClick={isLoginModeModeHandler}>
                    SWITCH TO SIGNUP
                </Button>
            </Card>
        </div>
    );
}

export default Auth;
