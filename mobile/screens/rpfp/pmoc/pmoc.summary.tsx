export default function PMOCSummary() {
    const colorScheme = useColorScheme();
    return (
        <View
            style={{
                marginTop: 50,
            }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
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
                        <Text style={styles.value}>2</Text>
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
                        <Text style={styles.title}>
                            Number of Individuals Interviewed
                        </Text>
                        <Text style={styles.value}>2</Text>
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
