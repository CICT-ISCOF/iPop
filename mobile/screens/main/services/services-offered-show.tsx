export default function ShowServices({ route }: any) {
    const colorScheme = useColorScheme();
    let feedBackground = colorScheme == 'dark' ? '#242526' : 'white';
    const [data, setData] = useState({ title: '', offers: [] });

    useEffect(() => {
        async function fetchData() {
            axios
                .get(base.apiURL + base.services + '/' + route.params.data)
                .then((response) => {
                    setData(response.data);
                    console.log(response.data);
                });
        }

        fetchData();
    }, []);

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
                    {data.title}
                </Text>
                {data.offers.map((service: any, index: any) => {
                    return (
                        <View
                            style={[
                                styles.article,
                                {
                                    backgroundColor: feedBackground,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                },
                            ]}>
                            <MaterialCommunityIcons
                                name='radar'
                                size={24}
                                color='#3F66DA'
                                style={{
                                    marginTop: -20,
                                    marginRight: 20,
                                }}
                            />

                            <Text
                                style={[
                                    styles.title1,
                                    { color: Colors[colorScheme].text },
                                ]}>
                                {service.title}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import base from '../../../constants/Api';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import TopPadding from '../../../shared/top-padding/top-padding';
import styles from './service.style';
import BackContainer from '../../../shared/back-container/back-container';
