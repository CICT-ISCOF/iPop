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
import { useNavigation } from '@react-navigation/native';

export default function Register( { route }: any ) {
    const colorScheme = useColorScheme();
    const [ errors, setErrors ] = useState( false );
    const navigation = useNavigation();

    const login = () => {
        navigation.navigate( 'Login' );
    };

    const [ fullname, setFullname ] = useState( '' );

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: Colors[ colorScheme ].background,
                },
            ]}>
            <TopPadding />

            <View style={[ styles.TextInputContianer, , ]}>
                <Text
                    style={{
                        color: Colors[ colorScheme ].text,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        marginBottom: 7,
                    }}>
                    What is your fullname?
                </Text>
                <TextInput
                    autoFocus={true}
                    onChangeText={( text ) => {
                        setFullname( text );
                    }}
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        setErrors( false );
                        if ( fullname == '' ) {
                            return setErrors( true );
                        }
                        navigation.navigate( 'Username', { fullname: fullname } );
                    }}
                    style={[
                        styles.TextInput,
                        {
                            borderColor: Colors[ colorScheme ].border,
                            color: Colors[ colorScheme ].text,
                        },
                    ]}
                    placeholder='Enter Fullname'
                    value={
                        route.params != undefined
                            ? route.params.fullname
                            : fullname
                    }
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
                    Please enter your fullname
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setErrors( false );
                        if ( fullname == '' ) {
                            return setErrors( true );
                        }
                        navigation.navigate( 'Username', { fullname: fullname } );
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => {
                    login();
                }}
                style={styles.ghostBtn}>
                <Text
                    style={[
                        styles.ghostBtnText,
                        { color: Colors[ colorScheme ].text },
                    ]}>
                    Back to Login
                </Text>
            </TouchableOpacity>
        </View>
    );
}
