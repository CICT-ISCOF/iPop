export default function Carousel(props: any) {
    const images = props.data;

    return (
        <View>
            <Text
                style={[
                    {
                        alignSelf: 'center',
                        marginTop: '75%',
                    },
                    images.length == 0
                        ? {}
                        : { position: 'absolute', left: 500 },
                ]}>
                No data to show..
            </Text>
            <ScrollView
                horizontal={true}
                style={[
                    styles.scrollview,
                    { backgroundColor: 'rgba(150,150,150,0.9)' },
                    images.length != 0
                        ? {}
                        : { position: 'absolute', left: 500 },
                ]}>
                {images.map((image: any, index: any) => {
                    return (
                        <Image
                            key={index}
                            style={styles.image}
                            source={{ uri: image.photo.uri }}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';

const styles = StyleSheet.create({
    scrollview: {
        height: 200,
        width: '100%',
    },
    image: {
        height: '100%',
        width: 300,
        resizeMode: 'stretch',
        borderWidth: 3,
        borderColor: 'rgba(150,150,150,0.9)',
    },
});
