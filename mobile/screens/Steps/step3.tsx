import React from 'react';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Step3() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    return (
        <View style={{
            flex: 1,
        }}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    navigation.navigate( 'Step4' )
                }}
                style={{
                    flex: 1, position: 'relative',
                    zIndex: 99,
                }}
            >
                <MaterialCommunityIcons name="trophy-award"
                    style={{
                        top: '25%',
                        alignSelf: 'center',
                        position: 'absolute',
                    }}
                    size={170} color="#426FC3"
                />

                <Text
                    style={{
                        color: Colors[ colorScheme ].text,
                        zIndex: 9,
                        alignSelf: 'center', position: 'absolute',
                        top: '50%',
                        fontSize: Platform.OS == 'ios' ? 35 : 25,
                        fontWeight: '200',
                        textAlign: 'center',
                        paddingHorizontal: 30
                    }}>
                    View latest <Text style={{ fontWeight: 'bold' }}>{'\n'}Awards</Text>
                     ,  <Text style={{ fontWeight: 'bold' }}>Services</Text> and all data related to Iloilo Population Office
                </Text>

            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    navigation.navigate( 'Step4' )
                }}
                style={styles.stepTab}>
                <View style={styles.stepper}></View>
                <View style={styles.stepper}></View>
                <View style={styles.stepperActive}></View>
                <View style={styles.stepper}></View>
                <View style={styles.stepper}></View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create( {
    stepTab: {
        width: '100%',
        height: 90,
        zIndex: 100,
        position: 'absolute',
        bottom: '0%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    stepper: {
        width: 10,
        height: 10,
        borderRadius: 50,
        margin: 5,
        opacity: .5,
        backgroundColor: '#426FC3'
    },
    stepperActive: {
        width: 10,
        height: 10,
        borderRadius: 50,
        margin: 5,
        backgroundColor: '#426FC3'
    }
} )