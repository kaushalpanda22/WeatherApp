/**
 * @format
 */

import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme'
import FetchWeatherScreen from '../FetchWeatherScreen';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


let wrapper;
const mockStore = configureMockStore([thunk]);
const store = mockStore({
    search: {
        weatherData: {},
        errorMessage: '',
        isLoading: false
    }
});

wrapper = shallow(
    <Provider store={store}>
        <FetchWeatherScreen navigation={{ getParam: jest.fn() }} />
    </Provider>
);

it('FetchWeatherScreen Screen renders correctly', () => {
    renderer.create(<Provider store={store}>
        <FetchWeatherScreen navigation={{ getParam: jest.fn() }} />
    </Provider>).toJSON();
});

describe('FetchWeatherScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            expect(wrapper).toMatchSnapshot()
        });
    });
});

test('navigation options', () => {
    const naviProp = { navigation: { navigate: () => { } } };
    const navigationOptions = FetchWeatherScreen.navigationOptions(naviProp);

    expect(navigationOptions).toMatchSnapshot();
});
