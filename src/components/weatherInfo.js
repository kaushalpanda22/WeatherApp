import _ from 'lodash';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import styles from '../constants/styles';
import utils from '../utils/utils';


/**
 * Used for get icon of weather based on below params
 * @param {string} description
 * @param {string} sys
 * @returns
 */
const genIcon = (description, sys) => {
  const { pod } = sys;
  const dayTime = pod === 'd';
  // console.log('pod : ' + pod + ' dayTime: ' + dayTime);
  let icon;
  switch (description) {
    case 'Haze':
      icon = dayTime ?
        (<Icon name="ios-cloudy" style={styles.weatherIcon} size={40} color="#FFFFFF" />) :
        (<Icon name="ios-cloudy-night" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
      break;
    case 'Snow':
      icon = (<Icon name="ios-snow" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
      break;
    case 'Clouds':
      icon = (<Icon name="ios-cloudy" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
      break;
    case 'Clear':
      icon = dayTime ?
        (<Icon name="ios-sunny" style={styles.weatherIcon} size={40} color="#FFFF44" />) :
        (<Icon name="ios-moon" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
      break;
    case 'Rain':
      icon = (<Icon name="ios-rainy" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
      break;
    case 'Fog':
      icon = (<Icon name="ios-partly-sunny" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
      break;
    default:
      icon = (<Icon name="ios-sunny" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
      break;
  }
  return icon;
};


/**
 * render content when weather data will be available
 * @param {object} weatherData
 * @returns
 */
const renderContent = weatherData =>
  (
    <View>
      {_.isEmpty(weatherData) ?
        <Text style={styles.weatherInfo}>{'Search for a location'}</Text>
        :
        <View style={{ marginBottom: 16 }}>

          <Text style={styles.sectionTitle}>{weatherData.city.name}, {weatherData.city.country}</Text>
          <FlatList
            data={weatherData.list.slice(0, 5)}
            // data={weatherData.list}
            // maxToRenderPerBatch={5}
            horizontal={false}
            renderItem={({ item }) =>
              <Card
                containerStyle={{ elevation: 5, backgroundColor: colors.colorPrimary }}>
                <View style={styles.cardViewContainer}>
                  <View style={{ flex: 1, alignSelf: 'center' }}>
                    <Text style={styles.sectionDescription}>{`${utils.dateToFormat(item.dt_txt)}`}</Text>
                  </View>

                  <View style={styles.tempContainer} >
                    <Text style={styles.tempratureText}>{`${utils.toCelsius(item.main.temp)} °C`}</Text>
                    <Text style={styles.weatherDesc}>{item.weather[0].main}, {item.weather[0].description}</Text>
                  </View>

                  <View style={{
                    flex: 1, alignSelf: 'center'
                  }}>
                    {genIcon(item.weather[0].main, item.sys)}
                  </View>

                </View>
              </Card>
            }
            keyExtractor={({ dt }, index) => dt.toString()}
          />
        </View>
      }
    </View>
  );

/**
* render view when error occurred 
* @param {string} errorMessage
* @returns
*/
const renderError = errorMessage =>
  (
    <View style={styles.errorContainer}>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );

const WeatherInfo = (props) => {
  const { weatherData, errorMessage, isLoading } = props;
  const stuff = _.isEmpty(errorMessage) ?
    renderContent(weatherData) :
    renderError(errorMessage);
  return (
    <View style={styles.centered}>
      {isLoading ?
        <ActivityIndicator color={colors.colorPrimary} size='large' /> :
        stuff}
    </View>
  );
};


export default WeatherInfo;