export default function TotalData(props: any) {
    let birthSatistics = {
        crude_birth_rate: 0,
        general_fertility_rate: 0,
        total_live_births: 0,
    };
    if (props.data.length != 0) {
        birthSatistics = props.data;
    }
    const screenWidth = Dimensions.get('window').width;

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={
                props.visibility == true
                    ? { width: screenWidth, marginLeft: -20, paddingLeft: 20 }
                    : { display: 'none' }
            }>
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
            <View style={[styles.box, { backgroundColor: '#8FDA4F' }]}>
                <Ionicons
                    name='ios-information-circle-outline'
                    size={50}
                    color='rgba(250,250,250,.7)'
                />
                <View style={styles.text}>
                    <Text style={styles.title}>Crud Birth Rate</Text>
                    <Text style={styles.value}>
                        {birthSatistics.crude_birth_rate || 0}
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
                    <Text style={styles.title}>General Fertility Rate</Text>
                    <Text style={styles.value}>
                        {birthSatistics.general_fertility_rate || 0}
                    </Text>
                </View>
            </View>

            <View style={[styles.box, { backgroundColor: '#35A8FB' }]}>
                <Ionicons
                    name='ios-information-circle-outline'
                    size={50}
                    color='rgba(250,250,250,.7)'
                />
                <View style={styles.text}>
                    <Text style={styles.title}>Total Live Births</Text>
                    <Text style={styles.value}>
                        {birthSatistics.total_live_births || 0}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import TotalPopulation from '../total-population';
import styles from './births.style';
