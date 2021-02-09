export default function TotalDataMIgrations() {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={[styles.box, { backgroundColor: '#DF0F64' }]}>
                <Ionicons
                    name='ios-information-circle-outline'
                    size={50}
                    color='rgba(250,250,250,.7)'
                />
                <View style={styles.text}>
                    <Text style={styles.title}>Total Population</Text>
                    <Text style={styles.value}>2</Text>
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
                    <Text style={styles.value}>2</Text>
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
                    <Text style={styles.value}>2</Text>
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
                    <Text style={styles.value}>2</Text>
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
import styles from './migrations.style';
