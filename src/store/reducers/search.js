import {
    UPDATE_WEATHER_DATA,
    SET_ERROR_MESSAGE,
    SET_IS_LOADING,
} from '../actions/search';

const initialState = {
    weatherData: {},
    errorMessage: '',
    isLoading: false,
};

const searchReducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case UPDATE_WEATHER_DATA:
            return {
                weatherData: action.weatherData,
            };

        case SET_ERROR_MESSAGE:
            return {
                errorMessage: action.errorMessage,
            };

        case SET_IS_LOADING: {
            return {
                isLoading: action.isLoading,
            };
        }

        default:
            return state;
    }
};

export default searchReducer;
