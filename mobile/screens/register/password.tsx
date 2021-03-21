export default function Password( { route }: any ) {
    const colorScheme = useColorScheme();

    const navigation = useNavigation();

    const { fullname, username } = route.params;

    const [ password, setPassword ] = useState( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );
    const [ message, setMessage ] = useState( '' );

    const [ errors, setErrors ] = useState( false );

    async function validate() {
        setErrors( false );
        if ( password != confirmPassword ) {
            setMessage( 'Password does not match' );
            return setErrors( true );
        }
        if ( password == '' || confirmPassword == '' ) {
            setMessage( 'One or more fields should not be empty' );
            return setErrors( true );
        }
        if ( password.length < 3 ) {
            setMessage( 'Password is to weak' );
            return setErrors( true );
        }

        navigation.navigate( 'Avatar', {
            fullname: fullname,
            username: username,
            password: password,
        } );
    }

    let confirmPasswordInput: any;

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: Colors[ colorScheme ].background,
                },
            ]}>
            <TopPadding />
            <Text
                style={{
                    color: Colors[ colorScheme ].text,
                }}>
                Howdy!
            </Text>
            <Text style={styles.apptitle}>{fullname}</Text>
            <Text style={{ color: Colors[ colorScheme ].text }}>
                Your username is:{' '}
                <Text
                    style={{
                        color: '#80D23F',
                        fontSize: 20,
                        fontWeight: '700',
                    }}>
                    {username}
                </Text>
            </Text>
            <View style={[ styles.TextInputContianer, { marginTop: '50%' } ]}>
                <Text
                    style={{
                        color: Colors[ colorScheme ].text,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        marginBottom: 7,
                    }}>
                    What would you like to be your password?
                </Text>
                <TextInput
                    onChangeText={( text ) => {
                        setPassword( text );
                    }}
                    secureTextEntry={true}
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        confirmPasswordInput.focus();
                    }}
                    style={[
                        styles.TextInput,
                        {
                            borderColor: Colors[ colorScheme ].border1,
                            marginBottom: 0,
                            borderRadius: 0,
                            color: Colors[ colorScheme ].text,
                        },
                    ]}
                    placeholder='Enter Password'
                />
                <TextInput
                    ref={( input ) => {
                        confirmPasswordInput = input;
                    }}
                    onChangeText={( text ) => {
                        setConfirmPassword( text );
                    }}
                    secureTextEntry={true}
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        validate();
                    }}
                    style={[
                        styles.TextInput,
                        {
                            borderColor: Colors[ colorScheme ].border1,
                            borderRadius: 0,
                            color: Colors[ colorScheme ].text,
                        },
                    ]}
                    placeholder='Confirm Password'
                />
                <Text
                    style={[
                        {
                            alignSelf: 'flex-start',
                            color: 'red',
                            transform: [ { translateY: -12 } ],
                        },
                        errors == false
                            ? {
                                position: 'absolute',
                                top: -500,
                            }
                            : {},
                    ]}>
                    {message}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        validate();
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate( 'Username', {
                        fullname: fullname,
                        username: username,
                    } );
                }}
                style={styles.ghostBtn}>
                <Text
                    style={[
                        styles.ghostBtnText,
                        { color: Colors[ colorScheme ].text },
                    ]}>
                    I will change my username
                </Text>
            </TouchableOpacity>
        </View>
    );
}
import { useNavigation } from '@react-navigation/native';

import * as React from 'react';
import styles from './register.style';
import { StackActions } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Platform,
} from 'react-native';
import axios from 'axios';
import base from '../../constants/Api';
import TopPadding from '../../shared/top-padding/top-padding';
