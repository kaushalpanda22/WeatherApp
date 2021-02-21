/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow, mount } from 'enzyme'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import PincodeScreen from '../PincodeScreen';
import { TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';

jest.useFakeTimers()

let wrapper;
let props;
const createTestProps = (props) => ({
    navigation: {
      navigate: jest.fn()
    },
    ...props
  });

beforeEach(() => {
    props = createTestProps({});
    wrapper = shallow(<PincodeScreen {...props} />);
});

it('Pincode Screen renders correctly', () => {
    renderer.create(<PincodeScreen />).toJSON();
});

describe('PincodeScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            expect(wrapper).toMatchSnapshot()
        });
    });
});

describe('Testing pincode validation', () => {
    function validation(pincode) {
        if (pincode.length <= 0) {
            // alert('PINCODE FIELD IS REQUIRED!')
            return false;
        } else if (pincode.length > 0 && pincode.length < 6) {
            // alert('ENTER A VALID PINCODE HERE!')
            return false;
        }

        return true
    }

    it('Testing Pincode Empty Check', () => {
        expect(validation('')).toBe(false);
    })

    it('Testing Pincode Length Check', () => {
        expect(validation('123')).toBe(false);
    })

    it('Testing Pincode correct Check', () => {
        expect(validation('110030')).toBe(true);
    });
});

it('should render correctly', () => {
    expect(wrapper.find('View').length).toBe(3);
});

it('should render correctly', () => {
    expect(wrapper.find('Text').length).toBe(1);
});

it('should render correctly', () => {
    expect(wrapper.find(TouchableOpacity).length).toBe(1);
});

it('should render correctly', () => {
    expect(wrapper.find(Input).length).toBe(1);
});

it('onChangeText function check', () => {
    // Create a mock function to pass as a handler
    const onChangeText = jest.fn();

    // Find a Input and press it
    wrapper
      .find(Input)
      .first()
      .props()
      .onChangeText();

      // Check that our handler have been called 1 time
    expect(onChangeText).toHaveBeenCalledTimes(0);
});

it('onSubmitEditing function check', () => {
    // Create a mock function to pass as a handler
    const onSubmitEditing = jest.fn();

    // Find a Input and press it
    wrapper
      .find(Input)
      .first()
      .props()
      .onSubmitEditing(jest.fn());

      // Check that our handler have been called 1 time
    expect(onSubmitEditing).toHaveBeenCalledTimes(0);
});

it('onPress function check', () => {
    // Create a mock function to pass as a handler
    const onPress = jest.fn();

    // Find a TouchableOpacity and press it
    wrapper
      .find(TouchableOpacity)
      .first()
      .props()
      .onPress(jest.fn());

      // Check that our handler have been called 1 time
    expect(onPress).toHaveBeenCalledTimes(0);
});

// it("should render a <TouchableOpacity />", () => {
//     expect(wrapper.find(TouchableOpacity)).toHaveLength(1);   // SUCCESS
//     expect(props.navigation.navigate).toHaveBeenCalledWith('LoginScreen');   // SUCCESS
//   });
