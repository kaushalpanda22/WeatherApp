/**
 * @format
 */

import 'react-native';
import React from 'react';
import utils from '../utils';

describe('Utils Functions Check', () => {
    it('toCelsius', () => {
        expect(utils.toCelsius(300)).toBe(27);
    })
    
    it('toFahrenheit', () => {
        expect(utils.toFahrenheit(300)).toBe(81);
    })

    it('dateToFormat', () => {
        expect(utils.dateToFormat('2018-02-24 06:00:00')).toBe('24 Feb 18');
    })
})