export default function PMOCSummary(props: any) {
    const colorScheme = useColorScheme();
    let PMCData = {
        sessions: 0,
        oriented_couples: 0,
        individuals_interviewed: 0,
    };
    if (props.data.length != 0) {
        PMCData = props.data;
    }
    return (
        <View
            style={{
                marginTop: 50,
            }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={props.visibility == true ? {} : { display: 'none' }}>
                <View style={[styles.box, { backgroundColor: '#FF7900' }]}>
                    <Ionicons
                        name='ios-information-circle-outline'
                        size={50}
                        color='rgba(250,250,250,.7)'
                    />
                    <View style={styles.text}>
                        <Text style={styles.title}>
                            Number of Sessions Conducted
                        </Text>
                        <Text style={styles.value}>{PMCData.sessions}</Text>
                    </View>
                </View>
                <View style={[styles.box, { backgroundColor: '#35A8FB' }]}>
                    <Ionicons
                        name='ios-information-circle-outline'
                        size={50}
                        color='rgba(250,250,250,.7)'
                    />
                    <View style={styles.text}>
                        <Text style={styles.title}>
                            Number of Couples orriented
                        </Text>
                        <Text style={styles.value}>
                            {PMCData.oriented_couples}
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
                        <Text style={styles.title}>
                            Number of Individuals Interviewed
                        </Text>
                        <Text style={styles.value}>
                            {PMCData.individuals_interviewed}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './pmoc.style';
