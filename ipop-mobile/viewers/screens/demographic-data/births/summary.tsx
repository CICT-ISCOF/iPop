export default function Summary(props: any) {
    const colorScheme = useColorScheme();

    const sumamry = props.data;

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
                <View style={[styles.box, { backgroundColor: '#8FDA4F' }]}>
                    <Ionicons
                        name='ios-information-circle-outline'
                        size={50}
                        color='rgba(250,250,250,.7)'
                    />
                    <View style={styles.text}>
                        <Text style={styles.title}>Crud Birth Rate</Text>
                        <Text style={styles.value}>
                            {sumamry.crude_birth_rate || 0}
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
                            {sumamry.general_fertility_rate || 0}
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
                            {sumamry.total_live_births || 0}
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
import styles from './births.style';
