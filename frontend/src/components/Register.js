import React from "react";
import GoogleButton from "react-google-button";

function Register() {
    const handleSubmit = () => {
        // TODO: Impelment Register using Firebase
        /* 
        Account should be register with google and get store in firebase
        if account with email is already created then print "Account already exist"
        else print "Account created successfully"
        */
    };

    return (
        <div>
            <GoogleButton
                type="dark"
                label="Sign up with Google"
                onClick={handleSubmit}
            />
        </div>
    );
}

export default Register;
