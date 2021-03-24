import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from '../../../shared/locations/municipality.style'
import axios from 'axios';
import base from '../../../constants/Api';
import TotalPopulation from '../total-population';

export default function TotalData( props: any ) {
    const colorScheme = useColorScheme()
    const [ data, setData ]: any = useState( {} )

    useEffect( () => {
        filter()
    }, [] )

    async function filter() {
        const filter = {
            municipality: props.data.municipality,
            barangay: props.data.barangay,
            year: props.data.year,
        }

        const url =
            base.apiURL +
            'birth-statistics?' +
            `?municipality=${ filter[ 'municipality' ] }&barangay=${ filter[ 'barangay' ] }&year=${ filter[ 'year' ] }`
        axios.get( url ).then( ( response ) => {
            if ( response.data.data != null ) {
                setData( response.data.data )

            } else {
                alert( `No data on year ${ filter.year }` )
            }
        } )
    }

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].background } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Birth Data of {props.data.barangay}, {props.data.municipality}</Text>
            <View style={styles.separator} />

            <View style={[ style.dataContainer, { borderLeftColor: '#9376FB', } ]}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 4 }}>Total Population</Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    < TotalPopulation />
                </Text>
            </View>

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
        flexDirection: 'row',
        paddingVertical: 30

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

