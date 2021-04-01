
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from '../../../shared/locations/municipality.style'
import axios from 'axios';
import base from '../../../constants/Api';

export default function PMOCSummary( props: any ) {
    const colorScheme = useColorScheme()
    const [ data, setData ]: any = useState( {} )

    useEffect( () => {
        filter()
    }, [] )

    async function filter() {
        const filter = {
            municipality: props.data.municipality,
            year: props.data.year,
        }
        const url =
            base.apiURL +
            'pmoccs?' +
            `?municipality=${ filter[ 'municipality' ] }&year=${ filter[ 'year' ] }`
        axios.get( url ).then( ( response ) => {
            if ( response.data.data != null ) {
                setData( response.data.data[ 0 ] )
            } else {
                alert( `No data on year ${ filter.year }` )
            }
        } )
    }

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>PMOC Data</Text>
            <Text style={{ color: 'gray', textAlign: 'center', marginTop: -20, textTransform: 'capitalize' }}>{props.data.barangay}, {props.data.municipality}</Text>
            <View style={styles.separator} />

            <View style={[ style.dataContainer, { borderLeftColor: '#49BDD7', } ]}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 4 }}> Number of Sessions Conducted</Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.sessions || 0}
                </Text>
            </View>

            <View style={[ style.dataContainer, { borderLeftColor: '#F89236', } ]}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 4 }}>Number of Couples orriented</Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.oriented_couples || 0}
                </Text>
            </View>


            <View style={[ style.dataContainer, { borderLeftColor: '#59B259', } ]}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 4 }}> Number of Individuals Interviewed</Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.individuals_interviewed || 0}
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

