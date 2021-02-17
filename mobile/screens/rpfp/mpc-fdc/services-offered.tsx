export default function ServiceOfferedMPCFDC(props: any) {
    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        title: {
            margin: 6,
            fontWeight: '700',
            fontSize: 25,
            color: '#02A1C7',
            marginTop: 50,
        },
        description: {
            padding: 10,
            color: Colors[colorScheme].text,
            lineHeight: 30,
        },
    });

    let mpc = props.data;
    mpc.files = [];
    if (mpc.name != undefined) {
        mpc = props.data;
    }
    return (
        <View style={[mpc.name != undefined ? {} : { display: 'none' }]}>
            <Text style={styles.title}>Servies Offered</Text>
            <Text style={styles.description}>{mpc.services} tae</Text>
        </View>
    );
}
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
