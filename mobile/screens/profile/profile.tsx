import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';

import Colors from '../../constants/Colors';

import useColorScheme from '../../hooks/useColorScheme';
import BackContainer from '../../shared/back-container/back-container';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import TopPadding from '../../shared/top-padding/top-padding';
export default function ProfileScreen() {
    const [user, setUser] = useState({
        fullname: '',
        profile_picture: { uri: '' },
    });

    useEffect(() => {
        async function fetchAndSetUser() {
            let userToSet: any = await AsyncStorage.getItem('user');
            let user = JSON.parse(userToSet);
            setUser(user);
            console.log(user.profile_picture);
        }

        fetchAndSetUser();
    }, []);

    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            paddingTop: 30,
            backgroundColor: Colors[colorScheme].background,
        },
        menu: {
            fontWeight: '700',
            fontSize: 35,
            marginBottom: 30,
        },
        name: {
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 28,
        },
        address: {
            marginTop: 20,
            textAlign: 'center',
            fontSize: 20,
        },
        list: {
            padding: 10,
            borderBottomWidth: 1,
            color: Colors[colorScheme].text,
            lineHeight: 30,
        },
        cover: {
            height: 250,
            width: '100%',
            resizeMode: 'cover',
            borderTopEndRadius: 20,
            borderTopLeftRadius: 20,
        },
        profileContainerMain: {
            backgroundColor: Colors[colorScheme].background,
            borderRadius: 100,
            marginTop: -100,
            height: 205,
            width: 205,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            borderWidth: 2,
            borderColor: Colors[colorScheme].background,
        },
        profileContainer: {
            borderRadius: 100,
            borderWidth: 10,
            borderColor: 'gray',
            height: 198,
            width: 198,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        },
        profile: {
            height: 190,
            width: 190,
            borderRadius: 100,
            borderWidth: 4,
            borderColor: Colors[colorScheme].background,
        },
    });
    return (
        <ScrollView style={[styles.container, { padding: 0 }]}>
            <TopPadding />
            <ScrollView
                style={[
                    styles.container,
                    {
                        backgroundColor: Colors[colorScheme].background,
                    },
                ]}>
                <BackContainer hidden={true} />
                <Text
                    style={[styles.menu, { color: Colors[colorScheme].text }]}>
                    {user.fullname || 'Juan De La Cruz'}
                </Text>
                <Image
                    blurRadius={9}
                    style={styles.cover}
                    source={
                        user.profile_picture == null
                            ? require('../../assets/IPOP/Iloilo-Provincial-Capitol-Panay-News-2.jpg')
                            : { uri: user.profile_picture.uri }
                    }
                />

                <View style={styles.profileContainerMain}>
                    <View style={styles.profileContainer}>
                        <Image
                            style={styles.profile}
                            source={
                                user.profile_picture == null
                                    ? require('../../assets/IPOP/Iloilo-Provincial-Capitol-Panay-News-2.jpg')
                                    : { uri: user.profile_picture.uri }
                            }
                        />
                    </View>
                </View>
                <Text
                    style={[styles.name, { color: Colors[colorScheme].text }]}>
                    {user.fullname || 'Juan De La Cruz'}
                </Text>
                <Text
                    style={[
                        styles.address,
                        { color: Colors[colorScheme].text },
                    ]}>
                    Lagubang, Baortac Nuevo
                </Text>
            </ScrollView>
        </ScrollView>
    );
}
