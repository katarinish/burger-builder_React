import * as actionTypes from './actionTypes';

import axios from 'axios';
const API_KEY = 'AIzaSyCYvJyFpjhGIAzVaqAv1EvW1MeR5Kqzl_s';

const TO_SECONDS = 1000;

const initAuthenticate = () => ({
    type: actionTypes.INIT_AUTHENTICATE,
});

const authenticateSuccess = ({idToken, localId}) => ({
    type: actionTypes.AUTHENTICATE_SUCCESS,
    idToken,
    userId: localId,
});

export const authenticateFailure = (error) => ({
    type: actionTypes.AUTHENTICATE_FAILURE,
    error
});

const logOut = () => ({
   type: actionTypes.LOG_OUT,
});

const checkAuthExpireTime = (expirationTime) => {
    return dispatch => {
        setTimeout(() => dispatch(logOut()), expirationTime * TO_SECONDS);
    }
};

export const authenticate = ({email, password, isSignUpMode}) => {
    return (dispatch) => {
        dispatch(initAuthenticate());
        const requestPayload = {
            email,
            password,
            returnSecureToken: true,
        };

        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
        if (!isSignUpMode) {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
        }

        axios.post(url, requestPayload)
        .then(response => {
            console.log(response);
            dispatch(authenticateSuccess(response.data));
            dispatch(checkAuthExpireTime(response.data.expiresIn));
        })
        .catch(error => {
            console.log('Error authentication', error);
            dispatch(authenticateFailure(error.response.data.error));
        });
    }
};
