import * as actionTypes from './actionTypes';

import axios from 'axios';
const API_KEY = 'AIzaSyCYvJyFpjhGIAzVaqAv1EvW1MeR5Kqzl_s';

const TO_SECONDS = 1000;
const TO_MSECONDS = 1000;
const TOKEN = 'token';
const EXPIRATION_DATE = 'expirationDate';
const LOCAL_ID = 'localId';

const calculateExpirationDate = (expiresIn) => {
    const totalSecs = new Date().getTime() + expiresIn * TO_SECONDS;
    return new Date(totalSecs);
};

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

export const setAuthRedirectPath = (path) => ({
   type: actionTypes.SET_AUTH_REDIRECT_PATH,
   path,
});


export const logout = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(EXPIRATION_DATE);
    localStorage.removeItem(LOCAL_ID);

    return {
        type: actionTypes.LOG_OUT,
    }
};

const checkAuthExpireTime = (expirationTime) => {
    return dispatch => {
        setTimeout(() => dispatch(logout()), expirationTime * TO_SECONDS);
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
            localStorage.setItem(TOKEN, response.data.idToken);
            localStorage.setItem(EXPIRATION_DATE, calculateExpirationDate(response.data.expiresIn));
            localStorage.setItem(LOCAL_ID, response.data.localId);

            dispatch(authenticateSuccess(response.data));
            dispatch(checkAuthExpireTime(response.data.expiresIn));
        })
        .catch(error => {
            dispatch(authenticateFailure(error.response.data.error));
        });
    }
};

export const checkAuthentificationState = () => {
    return dispatch => {
        const token = localStorage.getItem(TOKEN);
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem(EXPIRATION_DATE));

            if (expirationDate > new Date()) {
                const localId = localStorage.getItem(LOCAL_ID);

                dispatch(authenticateSuccess({
                    idToken: token,
                    localId,
                }));
                dispatch(checkAuthExpireTime((expirationDate.getTime() - new Date().getTime()) / TO_MSECONDS));
            } else {
                dispatch(logout());
            }
        }
    }
};
