import React from "react";
import GoogleButton from "react-google-button";

function Login() {
    const handleSubmit = () => {
        // TODO: Impelment Login using Firebase
    };

    return (
        <div>
            <GoogleButton
                type="dark"
                label="Sign in with Google"
                onClick={handleSubmit}
            />
        </div>
    );
}

export default Login;
