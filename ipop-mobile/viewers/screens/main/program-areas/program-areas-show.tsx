export default function ShowProgramAreas({ route }: any) {
    const [data, setData] = useState({
        title: '',
        activities: [],
        description: '',
    });
    const colorScheme = useColorScheme();
    let feedBackground = colorScheme == 'dark' ? '#242526' : 'white';

    useEffect(() => {
        async function fetchData() {
            axios
                .get(base.apiURL + base.programAreas + '/' + route.params.data)
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
                <Text
                    style={[
                        {
                            color: Colors[colorScheme].text,
                            marginBottom: 20,
                            lineHeight: 30,
                        },
                    ]}>
                    {data.description}
                </Text>
                {data.activities.map((award: any, index: any) => {
                    return (
                        <View
                            style={[
                                styles.article,
                                {
                                    backgroundColor: feedBackground,
                                },
                            ]}>
                            <Text
                                style={[
                                    styles.title1,
                                    { color: Colors[colorScheme].text },
                                ]}>
                                {award.title}
                            </Text>
                            <Text
                                style={[
                                    {
                                        color: Colors[colorScheme].text1,
                                        lineHeight: 30,
                                    },
                                ]}>
                                {award.description}
                            </Text>
                            <ScrollView
                                style={[
                                    styles.scrollview,
                                    award.files.lenth == 0
                                        ? { position: 'absolute', left: -550 }
                                        : {},
                                ]}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {award.files.map((media: any, index: any) => {
                                    return (
                                        <Image
                                            style={styles.image}
                                            source={{ uri: media.file.uri }}
                                        />
                                    );
                                })}
                            </ScrollView>
                            <View style={{ height: 50 }} />
                        </View>
                    );
                })}
                <View style={{ height: 150 }} />
            </ScrollView>
        </View>
    );
}
import Colors from '../../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useColorScheme from '../../../hooks/useColorScheme';
import axios from 'axios';
import base from '../../../constants/Api';
import React, { useState, useEffect } from 'react';
import styles from './program-areas.style';
import { View, Text, ScrollView, Image } from 'react-native';
import BackContainer from '../../../shared/back-container/back-container';
import TopPadding from '../../../shared/top-padding/top-padding';
