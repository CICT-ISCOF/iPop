import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import styles from './municipality.style'
import { Ionicons } from '@expo/vector-icons';

export default function Years( props: any ) {
    const colorScheme = useColorScheme();

    const [ year, setYear ] = React.useState( "" )

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}>
            <View style={styles.header} />

            <View style={style.textInputContainer}>
                <View style={style.iconContainer}>
                    <Ionicons name="calendar-outline" size={24} color="gray" />
                </View>
                <TextInput
                    autoFocus={true}
                    keyboardType="numeric"
                    style={[ style.textInput, { color: Colors[ colorScheme ].text } ]}
                    placeholder="Enter year.."
                    value={year}
                    onChangeText={( text ) => {
                        setYear( text )
                    }}
                />
            </View>

            <TouchableOpacity
                onPress={() => {
                    props.year( year )
                }}
                style={style.button}>
                <Text style={{ color: 'white' }}>Submit</Text>
            </TouchableOpacity>
        </View >
    );
}

const style = StyleSheet.create( {
    textInputContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(150,150,150,.1)',
        margin: 20,
        padding: 7,
        borderRadius: 10

    },
    iconContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    textInput: {
        flex: 4,
    },

    button: {
        backgroundColor: '#426FC3',
        padding: 15,
        borderRadius: 5,
        margin: 20,
        alignItems: 'center',
        marginVertical: 5
    },

} )