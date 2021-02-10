export default function TotalDataMIgration(props: any) {
    let migrationStatistics = {
        total_in_migrations: 0,
        total_out_migrations: 0,
        net_migrations: 0,
    };
    if (props.data.length != 0) {
        migrationStatistics = props.data;
    }
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={props.visibility == true ? {} : { display: 'none' }}>
            <View style={[styles.box, { backgroundColor: '#DF0F64' }]}>
                <Ionicons
                    name='ios-information-circle-outline'
                    size={50}
                    color='rgba(250,250,250,.7)'
                />
                <View style={styles.text}>
                    <Text style={styles.title}>Total Population</Text>
                    <Text style={styles.value}>
                        {' '}
                        <TotalPopulation />
                    </Text>
                </View>
            </View>
            <View style={[styles.box, { backgroundColor: '#8B2BD2' }]}>
                <Ionicons
                    name='ios-information-circle-outline'
                    size={50}
                    color='rgba(250,250,250,.7)'
                />
                <View style={styles.text}>
                    <Text style={styles.title}>Total In Migrations</Text>
                    <Text style={styles.value}>
                        {migrationStatistics.total_in_migrations || 0}
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
                        {migrationStatistics.total_out_migrations || 0}
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
                        {migrationStatistics.net_migrations || 0}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import TotalPopulation from '../total-population';
import styles from './migrations.style';
