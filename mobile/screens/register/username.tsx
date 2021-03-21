export default function Username( { route }: any ) {
    const colorScheme = useColorScheme();
    const [ errors, setErrors ] = useState( false );
    const navigation = useNavigation();

    const { fullname } = route.params;

    const [ username, setUsername ] = useState( '' );

    return (
        <View
            style={[ styles.container, { backgroundColor: Colors[ colorScheme ].background, }, ]}>
            <TopPadding />
            <Text style={{ color: Colors[ colorScheme ].text, }}>
                Howdy!
            </Text>
            <Text style={[ styles.apptitle ]}>{fullname}</Text>
            <View style={[ styles.TextInputContianer, { marginTop: 100 } ]}>
                <Text
                    style={{
                        color: Colors[ colorScheme ].text,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        marginBottom: 7,
                    }}>
                    What would you like to be your username?
                </Text>
                <TextInput
                    autoFocus={true}
                    onChangeText={( text ) => {
                        setUsername( text );
                    }}
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        setErrors( false );
                        if ( username == '' ) {
                            return setErrors( true );
                        }
                        navigation.navigate( 'Password', {
                            fullname: fullname,
                            username: username,
                        } );
                    }}
                    style={[
                        styles.TextInput,
                        {
                            borderColor: Colors[ colorScheme ].border,
                            color: Colors[ colorScheme ].text,
                        },
                    ]}
                    placeholder='Enter Username'
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
                    Please set your username
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setErrors( false );
                        if ( username == '' ) {
                            return setErrors( true );
                        }
                        navigation.navigate( 'Password', {
                            fullname: fullname,
                            username: username,
                        } );
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate( 'Register', { fullname: fullname } );
                }}
                style={styles.ghostBtn}>
                <Text
                    style={[
                        styles.ghostBtnText,
                        { color: Colors[ colorScheme ].text },
                    ]}>
                    I will change my fullname
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
