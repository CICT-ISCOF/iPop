import TopPadding from '../../../../shared/top-padding/top-padding';

export default function Awards() {
    const colorScheme = useColorScheme();

    let feedBackground = colorScheme == 'dark' ? '#242526' : 'white';

    const [awards, setAwards] = useState([]);

    useEffect(() => {
        async function fetchData() {
            axios.get(base.apiURL + base.awards).then((response) => {
                setAwards(response.data);
            });
        }

        fetchData();
    }, []);

    return (
        <View style={[styles.container, { padding: 0 }]}>
            <TopPadding />
            <ScrollView
                style={[
                    styles.container,
                    {
                        backgroundColor: Colors[colorScheme].bg1,
                    },
                ]}>
                <BackContainer hidden={true} />
                <Text
                    style={[styles.menu, { color: Colors[colorScheme].text }]}>
                    Awards
                </Text>

                {awards.map((award: any, index: any) => {
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
                                    styles.title,
                                    { color: Colors[colorScheme].text },
                                ]}>
                                {award.title}
                            </Text>
                            <Text
                                style={[{ color: Colors[colorScheme].text1 }]}>
                                {award.url}
                            </Text>
                            <ScrollView
                                style={styles.scrollview}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {award.medias.map((media: any, index: any) => {
                                    return (
                                        <Image
                                            style={styles.image}
                                            source={{ uri: media.file.uri }}
                                        />
                                    );
                                })}
                            </ScrollView>
                        </View>
                    );
                })}
                <View style={{ height: 150 }} />
            </ScrollView>
        </View>
    );
}
import axios from 'axios';
import base from '../../../../constants/Api';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../../shared/back-container/back-container';
import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './awards.style';
