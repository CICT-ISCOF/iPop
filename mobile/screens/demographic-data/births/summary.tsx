export default function Summary(props: any) {
    const colorScheme = useColorScheme();
    const screenWidth = Dimensions.get('window').width;
    const sumamry = props.data;

    return (
        <View>
            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[colorScheme].text,
                        marginLeft: -0,
                    },
                ]}>
                Provincial Summary
            </Text>
            <View style={[styles.separator, { marginLeft: -20 }]}></View>
            <ScrollView
                horizontal={true}
                style={{ width: screenWidth, marginLeft: -20, paddingLeft: 20 }}
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
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './births.style';
