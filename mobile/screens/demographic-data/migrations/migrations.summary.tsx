export default function MigrationsSummary(props: any) {
    const colorScheme = useColorScheme();
    const summary = props.data;
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
                <View style={[styles.box, { backgroundColor: '#8B2BD2' }]}>
                    <Ionicons
                        name='ios-information-circle-outline'
                        size={50}
                        color='rgba(250,250,250,.7)'
                    />
                    <View style={styles.text}>
                        <Text style={styles.title}>Total In Migrations</Text>
                        <Text style={styles.value}>
                            {summary.total_in_migrations || 0}
                        </Text>
                    </View>
                </View>
                <View style={[styles.box, { backgroundColor: '#02A1C7' }]}>
                    <Ionicons
                        name='ios-information-circle-outline'
                        size={50}
                        color='rgba(250,250,250,.7)'
                    />
                    <View style={styles.text}>
                        <Text style={styles.title}>Total Out Migrations</Text>
                        <Text style={styles.value}>
                            {summary.total_out_migrations || 0}
                        </Text>
                    </View>
                </View>
                <View style={[styles.box, { backgroundColor: '#FF7900' }]}>
                    <Ionicons
                        name='ios-information-circle-outline'
                        size={50}
                        color='rgba(250,250,250,.7)'
                    />
                    <View style={styles.text}>
                        <Text style={styles.title}>Net Migrations</Text>
                        <Text style={styles.value}>
                            {summary.net_migrations || 0}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import styles from './migrations.style';
