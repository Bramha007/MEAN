import React from "react";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import { useForm } from "../../shared/hooks/form-hook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import "./Auth.css";

function Auth() {
    const [formState, inputHandler] = useForm(
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
    };

    return (
        <div>
            <Card className="authentication">
                <h2>Login Required</h2>
                <hr />
                <form>
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
                        LOGIN
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default Auth;
