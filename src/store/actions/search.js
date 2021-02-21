/* eslint no-undef: "off" */

import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import config from '../../../config';

export const UPDATE_WEATHER_DATA = 'UPDATE_WEATHER_DATA';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_IS_LOADING = 'SET_IS_LOADING';





/**
 * updateWeatherData - set data from API response
 * @param  {object} weatherData - response from API
 * @return {object} Action
 */
export const updateWeatherData = (weatherData) => {
    return {
        type: UPDATE_WEATHER_DATA,
        weatherData,
    };
}

/**
 * setErrorMessage - change or show error message
 * @param {object} errorMessage - message to display
 * @return {object} Action
 */
export const setErrorMessage = (errorMessage) => {
    return {
        type: SET_ERROR_MESSAGE,
        errorMessage,
    };
}

/**
 * setIsLoading - show or hide loading spinner
 * @param {boolean} isLoading
 * @return {object} Action
 */
export const setIsLoading = (isLoading) => {
    return {
        type: SET_IS_LOADING,
        isLoading,
    };
}

/**
 *
 * @export
 * @param {string} pincode
 * @returns
 */
export const searchByPincode = (pincode) => {
    return async (dispatch) => {
        const { appid, url } = config;
        dispatch(setIsLoading(true));

        try {
            const response = await Axios.get(`${url}?zip=${pincode}&appid=${appid}`);
            // console.log(`${url}?zip=${searchTerm}&appid=${appid}`)
            // console.log('response object:', response.data);
            // console.log('search Term Data'+responseJson)
            dispatch(setErrorMessage(''));
            dispatch(setIsLoading(false));
            dispatch(updateWeatherData(response.data));
            saveLastSuccessfulFetchData(pincode, response.data)
        }
        catch (error) {
            console.log(error);
            console.log('Could not fetch');
            dispatch(updateWeatherData({}));
            dispatch(setErrorMessage(`Could not fetch weather for ${pincode}`));
        }
    };
}

/**
 * 
 * Mehtod is used for get saved data from local storage otherwise give error
 * @param {string} pincode 
 */
export const getDataFromLocalStorage = (pincode) => {
    return async (dispatch) => {
        const data = await AsyncStorage.getItem(pincode);
        if (!data) {
            dispatch(updateWeatherData({}));
            dispatch(setErrorMessage(`Could not fetch weather for ${pincode}, Check your network connection and try again`));
        } else {
            dispatch(setErrorMessage(''));
            dispatch(setIsLoading(false));
            dispatch(updateWeatherData(JSON.parse(data)));
        }
    }
}

/**
 * Method is used for save successfully fetched data with pincode
 * @param {string} pincode 
 * @param {object} weatherData 
 */
const saveLastSuccessfulFetchData = async (pincode, weatherData) => {
    try {
        await AsyncStorage.setItem(pincode, JSON.stringify(weatherData))
    } catch (error) {
        console.log(`Error${error}`)
    }
}

