import React, { useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import colors from '../constants/colors';
import styles from '../constants/styles';

/**
 * Pincode Screen
 */
const PincodeScreen = props => {
    const [pincode, setPincode] = useState('');
    const validation = (pincode) => {
        if (pincode.length <= 0) {
            Alert.alert('PINCODE FIELD IS REQUIRED!')
            return false;
        } else if (pincode.length > 0 && pincode.length < 6) {
            Alert.alert('ENTER A VALID PINCODE HERE!')
            return false;
        }
        return true
    }
    return (
        <View style={styles.body}>
            <StatusBar backgroundColor={colors.colorPrimary} barStyle='light-content' />
            <View style={styles.sectionContainer}>
                <Input
                    keyboardType={'numeric'}
                    placeholder='Enter Pincode'
                    errorStyle={{ color: 'red' }}
                    leftIcon={
                        <Icon
                            name='code'
                            size={24}
                            color='black'
                        />
                    }
                    onChangeText={(pincode) => setPincode(pincode)}
                    onSubmitEditing={() =>
                        validation(pincode) ?
                            props.navigation.navigate('FetchWeather', {
                                param_pincode: pincode,
                            }) : ''}
                // errorMessage='ENTER A VALID PINCODE HERE'
                />
                <View style={{ height: 50 }}></View>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () =>
                            validation(pincode) ?
                                props.navigation.navigate('FetchWeather', {
                                    param_pincode: pincode,
                                }) : ''

                    }
                >
                    <Text style={styles.submitButtonText}> Fetch </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PincodeScreen;

