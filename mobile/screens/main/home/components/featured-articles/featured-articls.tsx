export default function FeautredArticles(props: any) {
    const colorScheme = useColorScheme();

    let feedBackground = colorScheme == 'dark' ? '#242526' : 'white';

    const articles = props.data;

    //
    return (
        <View
            style={{
                marginTop: -40,
            }}>
            {articles.map((article: any, index: any) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.featuredArticle,
                            {
                                backgroundColor: feedBackground,
                            },
                        ]}>
                        <Image
                            style={[
                                styles.image,
                                article.photos.length != 0
                                    ? {}
                                    : { display: 'none' },
                            ]}
                            source={
                                article.photos.length != 0
                                    ? { uri: article.photos[0].file.uri }
                                    : { uri: '' }
                            }
                        />

                        <View style={styles.texts}>
                            <Text
                                style={[
                                    styles.title,
                                    ,
                                    { color: Colors[colorScheme].text },
                                ]}>
                                {article.title}
                            </Text>
                            <Text
                                style={[{ color: Colors[colorScheme].text1 }]}>
                                {article.body}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

import React, { useState, useEffect } from 'react';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';
import homeStyle from '../../home.style';
import { Text, View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import base from '../../../../../constants/Api';

const styles = StyleSheet.create({
    featuredArticle: {
        flexDirection: 'row',
        marginTop: 7,
        padding: 20,
    },
    image: {
        height: 70,
        width: 70,
        marginRight: 15,
        marginTop: 5,
    },
    texts: {
        width: '80%',
    },
    title: {
        fontWeight: '600',
        fontSize: 20,
        marginTop: -5,
        marginBottom: 15,
    },
});
