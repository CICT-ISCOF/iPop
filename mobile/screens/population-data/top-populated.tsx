import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons';
import styles from './pop-data.style';
import { FontAwesome } from '@expo/vector-icons';
import Selects from './select';
import PopProfile from './pop-profile';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base from '../../constants/Api';

export default function TopPopulated() {
    const colorScheme = useColorScheme();

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            axios.get(base.apiURL + base.topPopulated).then((response) => {
                setData(response.data);
            });
        }

        fetchData();
    }, []);

    return (
        <View
            style={{
                marginTop: 50,
            }}>
            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[colorScheme].text,
                    },
                ]}>
                Top Populated Municipality (All over Iloilo)
            </Text>
            <View style={styles.separator}></View>
            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={[styles.th, { flex: 2 }]}>
                    <Text
                        style={{
                            color: Colors[colorScheme].text,
                            fontWeight: '800',
                        }}>
                        Municipality
                    </Text>
                </View>
                <View style={[styles.td, { flex: 0.4 }]}>
                    <Text
                        style={{
                            color: '#1873FF',
                            fontWeight: '800',
                        }}>
                        Total
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#3EA662',
                            fontWeight: '800',
                        }}>
                        Percentage
                    </Text>
                </View>
            </View>

            {data.map((municipality, index) => {
                return (
                    <View
                        key={index}
                        style={[
                            styles.tr,
                            ,
                            { borderColor: Colors[colorScheme].border },
                        ]}>
                        <View style={[styles.th, { flex: 2 }]}>
                            <Text style={{ color: Colors[colorScheme].text }}>
                                {municipality['data']['name'] || 0}
                            </Text>
                        </View>
                        <View style={[styles.td, { flex: 0.4 }]}>
                            <Text
                                style={{
                                    color: '#1873FF',
                                }}>
                                {municipality['data']['total'] || 0}
                            </Text>
                        </View>
                        <View style={[styles.td]}>
                            <Text
                                style={{
                                    color: '#3EA662',
                                    fontWeight: '700',
                                }}>
                                {municipality['data']['percent'] || 0}%
                            </Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}
