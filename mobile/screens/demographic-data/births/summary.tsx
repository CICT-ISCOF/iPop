import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from '../../../shared/locations/municipality.style'
import axios from 'axios';
import base from '../../../constants/Api';

export default function Summary( props: any ) {

    const [ data, setData ]: any = useState( {} );


    useEffect( () => {
        async function getSummary() {
            const url = base.apiURL + 'birth-statistics/summary';
            axios.get( url ).then( ( response ) => {
                setData( response.data );
            } );
        }

        getSummary();
    }, [] )


    const colorScheme = useColorScheme();

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Provincial Birth Data</Text>
            <View style={styles.separator} />

            <View style={[ style.dataContainer, { borderLeftColor: '#49BDD7', } ]}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 4 }}>Crud Birth Rate</Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.crude_birth_rate || 0}
                </Text>
            </View>

            <View style={[ style.dataContainer, { borderLeftColor: '#F89236', } ]}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 4 }}>General Fertility Rate</Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.general_fertility_rate || 0}
                </Text>
            </View>

            <View style={[ style.dataContainer, { borderLeftColor: '#59B259', } ]}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 4 }}>Total Live Births</Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.total_live_births || 0}
                </Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create( {
    dataContainer: {
        margin: 9,
        padding: 20,
        borderLeftWidth: 3,
        borderLeftColor: '#FF0000',
        backgroundColor: 'rgba(150,150,150,.05)',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        marginVertical: 5,
        width: '95%',
        flexDirection: 'row'
    },
    municipality: {
        textTransform: 'capitalize',
        color: 'gray'
    },
    value: {
        fontSize: 20,
        transform: [
            { translateY: 5 }
        ],
        fontWeight: 'bold'
    },
    percent: {
        alignSelf: 'flex-end',
        marginTop: -15,
        color: 'orange'
    },

} )