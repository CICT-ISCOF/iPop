import * as React from 'react';
import { Text, TouchableOpacity, View, Image, TextInput, BackHandler, } from 'react-native';
import styles from './login.style';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useState, useEffect } from 'react';
import axios from 'axios';
import base from '../../constants/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopPadding from '../../shared/top-padding/top-padding';

export default function Login( { navigation }: any ) {
    const colorScheme = useColorScheme();
    const [ username, setUsername ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ isLoading, setLoading ] = useState( false );
    const [ errors, setErrors ] = useState( false );

    let passwordInput: any;

    useEffect( () => {
        const backAction = () => {
            return false
        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        )

        return () => backHandler.remove();
    }, [] )

    function login() {
        if ( isLoading == false ) {
            setErrors( false );
            const data = {
                username: username,
                password: password,
            };
            if ( data.username == '' || data.password == '' ) {
                setLoading( false );
                return alert( 'Please key in your correct login info' );
            }
            setLoading( true );

            axios
                .post( base.apiURL + base.login, data, {
                    headers: base.loginHeaders,
                } )
                .then( ( response ) => {
                    navigation.replace( 'Root' );
                    AsyncStorage.setItem(
                        'user',
                        JSON.stringify( response.data.user )
                    );
                    AsyncStorage.setItem(
                        'token',
                        JSON.stringify( response.data.token )
                    );
                    console.log( response.data );
                    setLoading( false );
                } )
                .catch( () => {
                    setErrors( true );
                    setLoading( false );
                } );
        }
    };

    const register = () => {
        navigation.push( 'Register' );
    };

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].background, }, ]}>
            <TopPadding color={1} />
            <Image
                style={styles.image}
                source={require( '../../assets/images/logo.png' )}
            />

            <View style={styles.TextInputContianer}>
                <TextInput
                    autoFocus={true}
                    onChangeText={( text ) => {
                        setUsername( text );
                    }}
                    style={[
                        styles.TextInput,
                        {
                            borderColor: Colors[ colorScheme ].border1,
                            color: Colors[ colorScheme ].text,
                        },
                    ]}
                    placeholder='Username'
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        passwordInput.focus();
                    }}
                />

                <TextInput
                    onChangeText={( text ) => {
                        setPassword( text )
                    }}
                    ref={( input ) => passwordInput = input}
                    style={[
                        styles.TextInput,
                        {
                            borderColor: Colors[ colorScheme ].border1,
                            color: Colors[ colorScheme ].text,
                        },
                    ]}
                    placeholder='Password'
                    secureTextEntry={true}
                    blurOnSubmit={true}
                    returnKeyType='done'
                    onSubmitEditing={() => {
                        login();
                    }}
                />
            </View>

            <Text style={[
                {
                    textAlign: 'center',
                    color: 'red',
                    transform: [ { translateY: 15 } ],
                },
                errors == false
                    ? {
                        position: 'absolute',
                        top: -500,
                    }
                    : {},
            ]}>
                Username or password is in-correct
            </Text>

            <View style={styles.TextInputContianer}>
                <TouchableOpacity
                    onPress={() => {
                        login();
                    }}
                    disabled={isLoading == true ? true : false}
                    style={[
                        styles.button,
                        isLoading == true ? { opacity: 0.5 } : {},
                    ]}>
                    <Text style={styles.buttonText}>
                        {isLoading == true ? 'Loggin-in..' : 'Log-in'}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => {
                    register();
                }}
                style={styles.ghostBtn}>
                <Text
                    style={[
                        styles.ghostBtnText,
                        { color: Colors[ colorScheme ].text, },
                    ]}>
                    Not Registered? Create an account.
                </Text>
            </TouchableOpacity>
        </View>
    );
}
