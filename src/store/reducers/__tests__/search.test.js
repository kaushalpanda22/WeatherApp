import searchReducer from "../search"
import { UPDATE_WEATHER_DATA, SET_ERROR_MESSAGE, SET_IS_LOADING } from "../../actions/search";

const mockWeatherData = require('../../../../__mocks__/weatherResponse.json');
const initialState = {
    weatherData: {},
    errorMessage: '',
    isLoading: false,
};

describe('weather reducer', () => {
    it('should return the initial state', () => {
        expect(searchReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle UPDATE_WEATHER_DATA', () => {
        expect(
            searchReducer(initialState, {
                type: UPDATE_WEATHER_DATA,
                weatherData: mockWeatherData
            })
        ).toEqual({
            weatherData: mockWeatherData
        })
    })

    it('should handle SET_ERROR_MESSAGE', () => {
        expect(
            searchReducer(initialState, {
                type: SET_ERROR_MESSAGE,
                errorMessage: 'Something went wrong'
            })
        ).toEqual({
            errorMessage: 'Something went wrong'
        })
    })

    it('should handle SET_IS_LOADING', () => {
        expect(
            searchReducer(initialState, {
                type: SET_IS_LOADING,
                isLoading: true
            })
        ).toEqual({
            isLoading: true
        })
    })

    it('should handle DEFAULT', () => {
        expect(
            searchReducer(initialState, {})
        ).toEqual(initialState)
    })
})