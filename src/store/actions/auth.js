import * as actionTypes from './actionTypes';

import axios from 'axios';
const API_KEY = 'AIzaSyCYvJyFpjhGIAzVaqAv1EvW1MeR5Kqzl_s';

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

export const authenticate = ({email, password, isSignUpMode}) => {
    return (dispatch) => {
        dispatch(initAuthenticate());
        const requestPayload = {
            email,
            password,
            returnSecureToken: true,
        }

        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
        if (!isSignUpMode) {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
        }

        axios.post(url, requestPayload)
        .then(response => {
            console.log(response);
            dispatch(authenticateSuccess(response.data));
        })
        .catch(error => {
            console.log('Error authentication', error);
            dispatch(authenticateFailure(error));
        });
    }
};
