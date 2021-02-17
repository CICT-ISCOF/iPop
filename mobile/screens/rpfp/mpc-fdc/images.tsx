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
    title: {
        transform: [{ translateY: 40 }],
        textAlign: 'center',
    },
});

export default function MPCFDCImages(props: any) {
    let mpc = props.data;
    // mpc.files = [];
    // if (mpc.name != undefined) {
    //     mpc.files = props.data.files;
    // }
    return (
        <View>
            <Text
                style={[
                    styles.title,
                    mpc.name != undefined ? {} : { display: 'none' },
                    mpc.files.length != 0 ? {} : { display: 'none' },
                ]}>
                Image(s) of {mpc.name}
            </Text>
            <ScrollView
                horizontal={true}
                style={[
                    styles.scrollview,
                    { backgroundColor: 'rgba(150,150,150,0.9)', marginTop: 50 },
                    mpc.files.length != 0 ? {} : { display: 'none' },
                    mpc.name != undefined ? {} : { display: 'none' },
                ]}>
                {mpc.files.map((image: any, index: any) => {
                    return (
                        <Image
                            key={index}
                            style={styles.image}
                            source={{ uri: image.file.uri }}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

import React from 'react';
import { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
