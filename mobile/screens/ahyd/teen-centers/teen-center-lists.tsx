export default function TeenCenterList({ route }: any) {
    const { data, number } = route.params;
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <View style={[styles.container, { padding: 0 }]}>
            <TopPadding />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[
                    styles.container,
                    {
                        backgroundColor: Colors[colorScheme].bg1,
                    },
                ]}>
                <BackContainer hidden={true} />
                <Text
                    style={[styles.menu, { color: Colors[colorScheme].text }]}>
                    District {number}
                </Text>
                {data.data.map((tc: any, index: any) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                navigation.navigate('ShowTeenCenter', {
                                    data: tc,
                                });
                            }}
                            style={[
                                styles.teenCenter,
                                {
                                    backgroundColor:
                                        Colors[colorScheme].background,
                                },
                            ]}>
                            <FontAwesome5
                                name='university'
                                size={20}
                                color='#02ADA3'
                            />

                            <View
                                style={{
                                    marginLeft: 20,
                                }}>
                                <Text
                                    style={{
                                        flex: 1,
                                        color: Colors[colorScheme].text,
                                        fontSize: 18,
                                    }}>
                                    {tc.name}
                                </Text>
                                <Text style={{ flex: 0.3, color: '#02A1C7' }}>
                                    {tc.municipality}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    );
}
import { FontAwesome5 } from '@expo/vector-icons';

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './teen-centerss.style';
import { useNavigation } from '@react-navigation/native';

import { Picker } from '@react-native-community/picker';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import TopPadding from '../../../shared/top-padding/top-padding';
import SearchNav from '../../main/home/components/search/search';
import BackContainer from '../../../shared/back-container/back-container';
