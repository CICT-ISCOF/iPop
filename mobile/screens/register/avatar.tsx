export default function Avatar({ route }: any) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const { fullname, username, password } = route.params;

    const [image, setImage] = useState('');
    const [imageBase64, setImageBase64] = useState('');

    const [errors, setErrors] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert(
                        'Sorry, we need camera roll permissions to set-up your avatar!'
                    );
                }
            }
        })();
    }, []);

    const register = () => {
        if (isLoading == false) {
            setErrors(false);
            setLoading(true);
            let data: any = {
                fullname: fullname,
                username: username,
                password: password,
                district: 'N/A',
                municipality: 'N/A',
                barangay: 'N/A',
                role: 'Viewer',
            };
            if (image != '') {
                data['profile_picture'] = imageBase64;
            }
            axios
                .post(base.apiURL + base.register, data, {
                    headers: base.headers,
                })
                .then((response) => {
                    navigation.navigate('Login', {
                        message: 'Successfully created your account',
                    });
                    alert('Successfully created your account');
                    setLoading(false);
                })
                .catch((error) => {
                    setErrors(true);
                    setLoading(false);
                });
        }
    };

    async function changeAvatar() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            let imageUri = `data:image/jpg;base64,${result.base64}`;
            setImage(result.uri);
            setImageBase64(result.base64 + '');
        }
    }

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: Colors[colorScheme].background,
                },
            ]}>
            <TopPadding />
            <Text
                style={{
                    color: Colors[colorScheme].text,
                }}>
                Let us set up your{' '}
            </Text>
            <Text style={styles.apptitle}>IPOP's' Avatar</Text>

            <TouchableOpacity
                onPress={() => {
                    changeAvatar();
                }}
                style={[
                    styles.profileContainerMain,
                    {
                        backgroundColor: Colors[colorScheme].background,
                        borderColor: Colors[colorScheme].background,
                    },
                ]}>
                <View style={styles.profileContainer}>
                    <Image
                        style={[
                            styles.profile,
                            { borderColor: Colors[colorScheme].background },
                        ]}
                        source={
                            image != ''
                                ? { uri: image }
                                : require('../../assets/avatars/boy-blue.png')
                        }
                    />
                </View>
                <View
                    style={[
                        styles.iconHolder,
                        { backgroundColor: Colors[colorScheme].lighterBg },
                    ]}>
                    <AntDesign
                        name='camera'
                        size={24}
                        color={Colors[colorScheme].text}
                    />
                </View>
            </TouchableOpacity>
            <Text
                style={[
                    {
                        color: 'red',
                        transform: [{ translateY: -12 }],
                    },
                    errors == false
                        ? {
                              position: 'absolute',
                              top: -500,
                          }
                        : {},
                ]}>
                Username is already been taken
            </Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Username', {
                        fullname: fullname,
                        username: username,
                        password: password,
                    });
                }}>
                <Text
                    style={[
                        { color: Colors[colorScheme].text },
                        errors == false
                            ? {
                                  position: 'absolute',
                                  top: -500,
                              }
                            : {},
                    ]}>
                    Go Back to Username Screen
                </Text>
            </TouchableOpacity>
            <View style={[styles.TextInputContianer, { marginTop: '20%' }]}>
                <TouchableOpacity
                    onPress={() => {
                        register();
                    }}
                    disabled={isLoading == true ? true : false}
                    style={[
                        styles.button,
                        isLoading == true ? { opacity: 0.5 } : {},
                    ]}>
                    <Text style={styles.buttonText}>
                        {' '}
                        {isLoading == true
                            ? 'Creating your account'
                            : 'Create my account '}
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => {
                    register();
                }}
                disabled={isLoading == true ? true : false}
                style={[
                    styles.ghostBtn,
                    isLoading == true ? { opacity: 0.5 } : {},
                ]}>
                <Text
                    style={[
                        styles.ghostBtnText,
                        { color: Colors[colorScheme].text },
                    ]}>
                    {isLoading == false
                        ? 'Skip this step and continue creating my account'
                        : 'Please wait..'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={isLoading == true ? true : false}
                style={[
                    styles.ghostBtn,
                    isLoading == true ? { opacity: 0.5 } : { bottom: 40 },
                ]}
                onPress={() => {
                    navigation.navigate('Password', {
                        fullname: fullname,
                        username: username,
                        password: password,
                    });
                }}>
                <Text
                    style={[
                        styles.ghostBtnText,
                        { color: Colors[colorScheme].text },
                    ]}>
                    {isLoading == false ? ' I will change my password' : ' '}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import styles from './register.style';
import { StackActions } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useState } from 'react';
import { Text, TouchableOpacity, View, Image, Platform } from 'react-native';
import axios from 'axios';
import base from '../../constants/Api';
import TopPadding from '../../shared/top-padding/top-padding';
import { useEffect } from 'react';
