import * as ActionTypes from './ActionTypes';

export const Partners = (state = { partners: [],isLoading: false, errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PARTNERS:
            return {...state, errMess: null, partners: action.payload};
        case ActionTypes.PARTNERS_FAILED:
            return {...state, errMess: action.payload};
        case ActionTypes.PARTNERS_LOADING:
            return {...state, errMess: null, isLoading: true, partners:[]}

        default:
            return state;
    }
};