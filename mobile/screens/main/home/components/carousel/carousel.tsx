import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './carousel.style'

export default function Carousel( props: any ) {
    const images = props.data;

    return (
        <View>
            <Text
                style={[
                    styles.placeholder,
                    images.length == 0
                        ? {}
                        : { position: 'absolute', left: 500 },
                ]}>
                Nothing to show..
            </Text>
            <ScrollView
                horizontal={true}
                style={[
                    styles.scrollview,
                    { backgroundColor: 'rgba(150,150,150,0.2)' },
                    images.length != 0
                        ? {}
                        : { position: 'absolute', left: 500 },
                ]}>
                {
                    images.map( ( image: any, index: any ) => (
                        <Image
                            key={index}
                            style={styles.image}
                            source={{ uri: image.photo.uri }}
                        />
                    ) )
                }
            </ScrollView>
        </View>
    );
}


