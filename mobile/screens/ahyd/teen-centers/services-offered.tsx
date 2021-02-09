export default function ServiceOfferedTeenCenters() {
    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        title: {
            margin: 10,
            fontWeight: '700',
            fontSize: 25,
            color: 'red',
            marginTop: 50,
        },
        description: {
            padding: 10,
            color: Colors[colorScheme].text,
            lineHeight: 30,
        },
    });
    return (
        <View>
            <Text style={styles.title}>Servies Offered</Text>
            <Text style={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                culpa eum praesentium perspiciatis quo inventore quisquam
                aspernatur commodi molestias. Tempore quo eligendi nobis
                suscipit aspernatur molestiae esse libero ad perferendis!
            </Text>
        </View>
    );
}
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
