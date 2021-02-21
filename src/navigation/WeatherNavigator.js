import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import PincodeScreen from '../screens/PincodeScreen';
import FetchWeatherScreen from '../screens/FetchWeatherScreen'
import colors from "../constants/colors";

const WeatherNavigator = createStackNavigator(
    {
        Pincode: PincodeScreen,
        FetchWeather: FetchWeatherScreen,
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.colorPrimary,
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
);

export default createAppContainer(WeatherNavigator);