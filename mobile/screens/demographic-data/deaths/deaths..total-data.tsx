export default function TotalDataDeaths(props: any) {
    let deathStatistics = {
        total: 0,
        crude_death_rate: 0,
    };
    if (props.data.length != 0) {
        deathStatistics = props.data;
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
                        <TotalPopulation />
                    </Text>
                </View>
            </View>
            <View style={[styles.box, { backgroundColor: 'red' }]}>
                <Ionicons
                    name='ios-information-circle-outline'
                    size={50}
                    color='rgba(250,250,250,.7)'
                />
                <View style={styles.text}>
                    <Text style={styles.title}>Total Deaths</Text>
                    <Text style={styles.value}>
                        {deathStatistics.total || 0}
                    </Text>
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
                        {deathStatistics.crude_death_rate || 0}
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
import styles from './deaths.style';
