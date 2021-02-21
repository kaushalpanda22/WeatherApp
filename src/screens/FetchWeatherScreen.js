import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import WeatherInfo from '../components/weatherInfo';
import styles from '../constants/styles';
import * as weatherActions from '../store/actions/search';
import NetworkUtils from '../utils/NetworkUtil';

const FetchWeatherScreen = props => {
    const { weatherData, errorMessage, isLoading } = useSelector(state => state.search);
    const dispatch = useDispatch();
    const pincode = props.navigation.getParam('param_pincode');

    useEffect(() => {
        fetchData()
    }, [dispatch]);

    const fetchData = useCallback(async () => {
        const isConnected = await NetworkUtils.isNetworkAvailable()
        dispatch(isConnected ?
            weatherActions.searchByPincode(pincode) : weatherActions.getDataFromLocalStorage(pincode));
    }, [dispatch])

    return (
        <View style={styles.container}>
            <WeatherInfo
                weatherData={weatherData}
                errorMessage={errorMessage}
                isLoading={isLoading}
            />
        </View>
    );
}

FetchWeatherScreen.navigationOptions = () => {
    return {
        title: 'Weather Forcast',
    }
}

export default FetchWeatherScreen;