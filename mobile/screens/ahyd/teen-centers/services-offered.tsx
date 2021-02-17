export default function ServiceOfferedTeenCenters(props: any) {
    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        title: {
            margin: 10,
            fontSize: 20,
            marginTop: 50,
        },
        description: {
            padding: 10,
            color: Colors[colorScheme].text1,
            lineHeight: 30,
        },
    });
    let teenCenter = props.data;

    return (
        <View>
            <Text
                style={[
                    styles.title,
                    { color: Colors[colorScheme].text },
                    teenCenter.services == '' || teenCenter.services == null
                        ? { position: 'absolute', left: -500 }
                        : {},
                ]}>
                Servies Offered:
            </Text>
            <Text
                style={[
                    { textAlign: 'center', marginTop: '50%' },
                    teenCenter.services != ''
                        ? { position: 'absolute', left: -500 }
                        : {},
                ]}>
                No posted {teenCenter.name}'s services yet..
            </Text>
            <Text style={styles.description}>{teenCenter.services}</Text>
        </View>
    );
}
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
