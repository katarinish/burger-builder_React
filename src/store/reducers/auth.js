import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utils';


const initialState = {
    idToken: null,
    userId: null,
    error: null,
    isLoading: false,
}

const initAuthenticate = (state, action) => updateObject(state, {
    isLoading: true, 
    error: null
});

const authenticateSuccess = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        idToken: action.idToken,
        userId: action.userId,
        error: null,
    });
}

const authenticateFailure = (state, action) => {
    return updateObject(state, {
        idToken: null,
        userId: null,
        error: action.error,
        isLoading: false,
    });
};


export default (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.INIT_AUTHENTICATE):
            return initAuthenticate(state, action);

        case (actionTypes.AUTHENTICATE_SUCCESS):
            return authenticateSuccess(state, action);

        case (actionTypes.AUTHENTICATE_FAILURE):
            return authenticateFailure(state, action);

        default:
            return state;
    }
}
