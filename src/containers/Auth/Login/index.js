import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from "./LoginForm";
import {isAuthenticatedUser} from "../utils";

const Login = () => {
    const history = useHistory();
    // useEffect(() => {
    //     if (isAuthenticatedUser()) {
    //         history.replace('/dashboard');
    //     }
    // }, []);
    return (
        <div>
            <LoginForm/>
        </div>

    );
};
export default Login;