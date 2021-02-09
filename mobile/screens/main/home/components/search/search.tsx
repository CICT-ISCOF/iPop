import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import styles from '../../home.style';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
export default function SearchNav(props: any) {
    const colorScheme = useColorScheme();

    const [search, setSearch] = useState(false);

    const searchHandler = () => {
        search == false ? setSearch(true) : setSearch(false);
    };
    return (
        <View
            style={[
                styles.nav,
                {
                    backgroundColor:
                        search == false
                            ? 'transparent'
                            : Colors[colorScheme].bg1,
                    padding: 7,
                    marginRight: 20,
                    marginBottom: -50,
                    width: '100%',
                    position: 'relative',
                    zIndex: 1,
                },
                props.hidden == true ? { marginBottom: -20 } : {},
            ]}>
            <View
                style={[
                    styles.textInputWrapper,
                    {
                        backgroundColor: Colors[colorScheme].lighterBg,
                        flexDirection: 'row',
                    },
                    props.hidden == true ? { display: 'none' } : {},
                ]}>
                <TouchableOpacity
                    onPress={() => {
                        searchHandler();
                    }}
                    style={[
                        {
                            marginLeft: -50,
                            marginRight: 60,
                        },
                        search != false
                            ? {}
                            : { position: 'absolute', top: -500 },
                    ]}>
                    <EvilIcons
                        style={{
                            transform: [{ scale: 1.5 }, { translateX: 3 }],
                        }}
                        name='chevron-left'
                        size={34}
                        color='black'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        searchHandler();
                    }}>
                    <Ionicons
                        style={[
                            { textAlign: 'right' },
                            search == false
                                ? {}
                                : { position: 'absolute', top: -500 },
                        ]}
                        name='ios-search'
                        size={20}
                        color={Colors[colorScheme].text}
                    />
                    <TextInput
                        style={[
                            {
                                width: 240,
                                height: 20,
                                alignSelf: 'center',
                                transform: [
                                    { translateX: -30 },
                                    { translateY: 5 },
                                ],
                                fontSize: 22,
                            },
                            search != false
                                ? {}
                                : { position: 'absolute', top: -500 },
                        ]}
                        placeholder='Search on iPOP'
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
