import React from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Step2() {
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
                    navigation.navigate( 'Step3' )
                }}
                style={{
                    flex: 1, position: 'relative',
                    zIndex: 99,
                }}
            >
                <MaterialIcons name="update"
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
                        paddingHorizontal: 50
                    }}>
                    Be <Text style={{ fontWeight: 'bold' }}>Updated</Text> on IPOP's Latest new and Featured Articles
                </Text>

            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    navigation.navigate( 'Step3' )
                }}
                style={styles.stepTab}>
                <View style={styles.stepper}></View>
                <View style={styles.stepperActive}></View>
                <View style={styles.stepper}></View>
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