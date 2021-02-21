import { UPDATE_WEATHER_DATA, SET_ERROR_MESSAGE, SET_IS_LOADING } from '../search';
import * as actions from '../search';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");
const mockAxios = require("axios");
const mockStore = configureStore([thunk]);
const weatherData = require('../../../../__mocks__/weatherResponse.json');
const pincode = '110030'
const store = mockStore({
    search: {
        weatherData: {},
        errorMessage: '',
        isLoading: false
    }
});

describe('CurrentWeather - Actions', () => {
    it('should create an action to update weather data', () => {
        const expectedAction = {
            type: UPDATE_WEATHER_DATA,
            weatherData
        };

        expect(actions.updateWeatherData(weatherData)).toEqual(expectedAction);
    });

    it('should create an action to set error message', () => {
        const errorMessage = 'message to display';
        const expectedAction = {
            type: SET_ERROR_MESSAGE,
            errorMessage
        };

        expect(actions.setErrorMessage(errorMessage)).toEqual(expectedAction);
    });

    it('should create an action to set loading', () => {
        const isLoading = true;
        const expectedAction = {
            type: SET_IS_LOADING,
            isLoading
        };

        expect(actions.setIsLoading(isLoading)).toEqual(expectedAction);
    });

    // test('should test for searchByPincode', async() => {
    //     store.dispatch(actions.searchByPincode(pincode));
    //   });

    describe("searchByPincode action creator", () => {
        it("fetches successfully data from an API", async () => {
            mockAxios.default.get.mockImplementationOnce(() =>
                Promise.resolve({
                    data: weatherData
                })
            );
            expect.assertions(4);
            
            await store.dispatch(actions.searchByPincode(pincode));
            const action = store.getActions();

            expect(action[0].type).toEqual(SET_IS_LOADING);
            expect(action[1].type).toEqual(SET_ERROR_MESSAGE);
            expect(action[2].type).toEqual(SET_IS_LOADING);
            expect(action[3].type).toEqual(UPDATE_WEATHER_DATA);
        });

    });

    describe("getDataFromLocalStorage action creator", () => {
        it("fetches successfully data from an Local Storage", async () => {
            await store.dispatch(actions.getDataFromLocalStorage(pincode));
            const action = store.getActions();

            expect.assertions(1);
            expect(action[0].type).toEqual(SET_IS_LOADING);
        });
    });

});