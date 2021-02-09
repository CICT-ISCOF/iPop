import * as React from 'react';
import styles from './menu.style';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function Menus() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const internalStyles = StyleSheet.create({
        itemWrapper: {
            backgroundColor: Colors[colorScheme].background,
            borderRadius: 7,
            paddingVertical: 15,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.17,
            shadowRadius: 5.49,
            elevation: 5,
        },
        icon: {
            marginRight: 10,
        },
        iconText: {
            fontWeight: '600',
            fontSize: 20,
            color: Colors[colorScheme].text,
        },
    });

    const navigate = (location: any) => {
        navigation.navigate(location);
    };

    const logout = () => {
        Alert.alert(
            'Log-out on IPOP?',
            'Are you sure you want to Log-out?',
            [
                {
                    text: 'Later',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Log-out',
                    onPress: () => {
                        AsyncStorage.clear();
                        navigation.navigate('Login');
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    navigate('PopulationData');
                }}
                style={{
                    marginTop: 20,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <Ionicons
                        style={internalStyles.icon}
                        name='ios-people'
                        size={20}
                        color='#A11D82'
                    />
                    <Text style={internalStyles.iconText}>Population Data</Text>
                </View>
            </TouchableOpacity>

            <Text
                style={[
                    styles.menu,
                    {
                        color: Colors[colorScheme].text,
                        marginVertical: 20,
                        marginTop: 40,
                        fontSize: 25,
                    },
                ]}>
                Demographic Data
            </Text>
            <TouchableOpacity
                onPress={() => {
                    navigate('Births');
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <FontAwesome5
                        name='baby'
                        style={internalStyles.icon}
                        size={20}
                        color='#7DCF3D'
                    />
                    <Text style={internalStyles.iconText}>Births</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate('Deaths');
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <FontAwesome
                        name='warning'
                        style={internalStyles.icon}
                        size={20}
                        color='red'
                    />
                    <Text style={internalStyles.iconText}>Deaths</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate('Migrations');
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <FontAwesome5
                        name='plane'
                        style={internalStyles.icon}
                        size={20}
                        color='#1086FE'
                    />
                    <Text style={internalStyles.iconText}>Migrations</Text>
                </View>
            </TouchableOpacity>

            <Text
                style={[
                    styles.menu,
                    {
                        color: Colors[colorScheme].text,
                        marginVertical: 20,
                        marginTop: 40,
                        fontSize: 25,
                    },
                ]}>
                RPFP Data
            </Text>
            <TouchableOpacity
                onPress={() => {
                    navigate('PMOCData');
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <Fontisto
                        name='persons'
                        style={internalStyles.icon}
                        size={20}
                        color='#A30045'
                    />
                    <Text style={internalStyles.iconText}>PMOC Data</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate('MPC-FDC');
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <MaterialCommunityIcons
                        name='home-city'
                        style={internalStyles.icon}
                        size={20}
                        color='orange'
                    />
                    <Text style={internalStyles.iconText}>MPC-FDC</Text>
                </View>
            </TouchableOpacity>

            <Text
                style={[
                    styles.menu,
                    {
                        color: Colors[colorScheme].text,
                        marginVertical: 20,
                        marginTop: 40,
                        fontSize: 25,
                    },
                ]}>
                AHYD Data
            </Text>
            <TouchableOpacity
                onPress={() => {
                    navigate('TeenCenters');
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <FontAwesome5
                        name='university'
                        style={internalStyles.icon}
                        size={20}
                        color='#02ADA3'
                    />
                    <Text style={internalStyles.iconText}>Teen Centers</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate('IssuesAndConcerns');
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <Entypo
                        name='info-with-circle'
                        style={internalStyles.icon}
                        size={20}
                        color='#4465B6'
                    />
                    <Text style={internalStyles.iconText}>
                        Issues and concers
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate('Others');
                }}
                style={{
                    marginTop: 20,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <Ionicons
                        style={internalStyles.icon}
                        name='ios-people'
                        size={20}
                        color='#A11D82'
                    />
                    <Text style={internalStyles.iconText}>Others</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    logout();
                }}
                style={{
                    marginTop: 20,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <SimpleLineIcons
                        name='logout'
                        style={internalStyles.icon}
                        size={20}
                        color='#15B1D7'
                    />
                    <Text style={internalStyles.iconText}>Log-out</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
