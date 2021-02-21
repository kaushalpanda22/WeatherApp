import moment from 'moment';

const utils = {
    toCelsius: (kelvinTemp) => {
        let celsiusTemp = kelvinTemp - 273.15;
        celsiusTemp = Math.round(celsiusTemp);
        return celsiusTemp;
    },
    toFahrenheit: (kelvinTemp) => {
        let fahrenheitTemp = ((9 / 5) * (kelvinTemp - 273)) + 32;
        fahrenheitTemp = Math.round(fahrenheitTemp);
        return fahrenheitTemp;
    },
    dateToFormat: (dateString) => {
        let dateFormat = moment(dateString).format('DD MMM YY');
        return dateFormat;
    },
};

export default utils;
