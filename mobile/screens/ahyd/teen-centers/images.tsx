const styles = StyleSheet.create({
    scrollview: {
        height: 200,
        width: '100%',
        marginTop: 20,
    },
    image: {
        height: '100%',
        width: 300,
        resizeMode: 'stretch',
        borderWidth: 3,
        borderColor: 'rgba(150,150,150,0.9)',
    },
});

export default function TeenCenterImages(props: any) {
    let teenCenter = props.data;
    return (
        <View>
            <Text
                style={[
                    { textAlign: 'center', marginTop: '20%' },
                    teenCenter.services != ''
                        ? { position: 'absolute', left: -500 }
                        : {},
                ]}>
                No posted {teenCenter.name}'s photos yet..
            </Text>
            <ScrollView
                horizontal={true}
                style={[
                    styles.scrollview,
                    { backgroundColor: 'rgba(150,150,150,0.9)' },
                    teenCenter.services == ''
                        ? { position: 'absolute', left: -500 }
                        : {},
                ]}>
                {teenCenter.photos.map((data: any, index: any) => {
                    return (
                        <Image
                            key={index}
                            style={styles.image}
                            source={{ uri: data.photo.uri }}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

import React from 'react';
import { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
