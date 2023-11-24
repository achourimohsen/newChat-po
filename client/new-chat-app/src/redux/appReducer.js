import initialState from "./appState";
import globalTypes from "./globalTypes";

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case globalTypes.FETCH_DATA:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case globalTypes.FETCH_DATA_SUCCESS:
            return {
                ...state,
                auth: action.payload,
                loading: false,
                error: null,
            };

        case globalTypes.FETCH_DATA_ERROR:
            return {
                ...state,
                auth: null,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default appReducer;
