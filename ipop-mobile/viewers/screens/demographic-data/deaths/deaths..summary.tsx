export default function DeathSummary(props: any) {
    const colorScheme = useColorScheme();
    const summary = props.data;
    useEffect(() => {
        console.log(props.data);
    }, []);

    return (
        <View>
            <Text
                style={[
                    {
                        fontSize: 25,
                        fontWeight: '600',
                    },
                    { color: Colors[colorScheme].text },
                ]}>
                Provincial Summary
            </Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={[styles.box, { backgroundColor: 'red' }]}>
                    <Ionicons
                        name='ios-information-circle-outline'
                        size={50}
                        color='rgba(250,250,250,.7)'
                    />
                    <View style={styles.text}>
                        <Text style={styles.title}>Total Deaths</Text>
                        <Text style={styles.value}>{summary.total || 0}</Text>
                    </View>
                </View>
                <View style={[styles.box, { backgroundColor: 'orange' }]}>
                    <Ionicons
                        name='ios-information-circle-outline'
                        size={50}
                        color='rgba(250,250,250,.7)'
                    />
                    <View style={styles.text}>
                        <Text style={styles.title}>Crud Birth Rate</Text>
                        <Text style={styles.value}>
                            {summary.crude_death_rate || 0}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import styles from './deaths.style';
