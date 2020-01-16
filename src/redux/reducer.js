import { CAMPSITE, CAMPSITES }  from '../shared/campsites';
import { COMMMENTS, COMMENTS }  from '../shared/comments';
import { PARTNERS }  from '../shared/partners';
import { PROMOTIONS }  from '../shared/promotions';

export const initialState = {
    campsites: CAMPSITES,
    comments: COMMENTS,
    partners: PARTNERS,
    promotions: PROMOTIONS
};

export const Reducer = (state = initialState, action) => {
    return state;
};