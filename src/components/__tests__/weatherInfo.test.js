/**
 * @format
 */

import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import { shallow } from 'enzyme'
import WeatherInfo from '../weatherInfo';

const mockWeatherData = require('../../../__mocks__/weatherResponse.json');

it('WeatherInfo component renders correctly', () => {
    renderer.create(<WeatherInfo />);
});

describe('WeatherInfo', () => {
    describe('Rendering', () => {
        it('should match to snapshot - Primary', () => {
            const component = shallow(<WeatherInfo label="test label" isLoading />)
            expect(component).toMatchSnapshot("Primary WeatherInfo snapshot")
        });

        it('should match to snapshot - Secondary', () => {
            const component = shallow(<WeatherInfo label="test label" isLoading={false} />)
            expect(component).toMatchSnapshot("Secondary WeatherInfo snapshot")
        });

        it('should match to snapshot', () => {
            const component = shallow(<WeatherInfo errorMessage='Could not fetch weather' />)
            expect(component).toMatchSnapshot()
        });

        it('should render correctly when loading', () => {
            const component = shallow(<WeatherInfo label="test label" isLoading />)
            expect(component.find('View').length).toBe(1);
        });

        it('should render correctly when loading false and errormessage', () => {
            const component = shallow(<WeatherInfo label="test label" isLoading={false} errorMessage='Test' />)
            expect(component.find('View').length).toBe(2);
            expect(component.find('Text').length).toBe(1);
        });

        it('should render correctly when loading false and mock weatherData', () => {
            const component = shallow(<WeatherInfo isLoading={false} errorMessage='' weatherData={mockWeatherData} />)
            expect(component.find('View').length).toBe(3);
            expect(component.find('Text').length).toBe(1);
            expect(component.find('FlatList').length).toBe(1);
        });

        it('should render correctly when loading false and empty weatherData', () => {
            const component = shallow(<WeatherInfo isLoading={false} errorMessage='' />)
            expect(component.find('View').length).toBe(2);
            expect(component.find('Text').length).toBe(1);
        });

        it('should flatlist return keyExtractor correctly', () => {
            const component = shallow(<WeatherInfo isLoading={false} errorMessage='' weatherData={mockWeatherData} />)
            const key = component
                .find('FlatList')
                .props()
                .keyExtractor({ dt: 1519074000 });

            expect(key).toEqual('1519074000')
        });
    });

    describe('.renderItem', () => {
        let renderItemShallowWrapper;
        const mockItem = mockWeatherData.list[0];
        let wrapper;
        let RenderItem;
        beforeAll(() => {
            wrapper = shallow(<WeatherInfo isLoading={false} errorMessage='' weatherData={mockWeatherData} />)
            // find the component whose property is rendered as renderItem={[Function]}
            // if we presume it's imported as ComponentWithRenderItemProp
            // find it and get it's renderItem property 
            RenderItem = wrapper.find('FlatList').prop('renderItem');
        });

        it('should match the snapshot', () => {
            // and since it's a component render it as such
            // with mockItem
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
            // generate snapshot for the renderItem
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });

        it('should match the snapshot - Haze', () => {
            mockItem.weather[0].main = 'Haze';
            // and since it's a component render it as such
            // with mockItem
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
            // generate snapshot for the renderItem
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });

        it('should match the snapshot - Snow', () => {
            mockItem.weather[0].main = 'Snow';
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });

        it('should match the snapshot - Clear', () => {
            mockItem.weather[0].main = 'Clear';
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });

        it('should match the snapshot - Rain', () => {
            mockItem.weather[0].main = 'Rain';
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });

        it('should match the snapshot - Fog', () => {
            mockItem.weather[0].main = 'Fog';
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });

        it('should match the snapshot - Default', () => {
            mockItem.weather[0].main = 'abc';
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });

        it('should render correctly - renderItem - View', () => {
            expect(renderItemShallowWrapper.find('View').length).toBe(4);
        });

        it('should render correctly - renderItem - Text', () => {
            expect(renderItemShallowWrapper.find('Text').length).toBe(3);
        });
    });
});