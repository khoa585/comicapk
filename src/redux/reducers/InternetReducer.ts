import * as types from '../constants/Internet';
const initialState = {
    isInternet: true
};
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.isInternet: {
            return {
                ...state,
                isInternet: action.payload.isInter
            };
        }
        default:
            return state;
    }
};
export default reducer; 
