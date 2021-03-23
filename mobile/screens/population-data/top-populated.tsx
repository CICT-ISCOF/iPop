import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base from '../../constants/Api';
import styles from '../../shared/locations/municipality.style'

export default function TopPopulated() {
    const colorScheme = useColorScheme();

    const [ data, setData ]: any = useState( [] );

    useEffect( () => {
        async function fetchData() {
            axios.get( base.apiURL + base.topPopulated ).then( ( response ) => {
                setData( response.data );
            } );
        }

        fetchData();
    }, [] );

    const renderData = ( data: any ) => (
        <View style={style.dataContainer}>
            <Text style={[ style.municipality ]}>
                {data.item[ 'data' ][ 'name' ] || 0}
            </Text>
            <Text style={[ style.value, , { color: Colors[ colorScheme ].text } ]}>
                {data.item[ 'data' ][ 'total' ] || 0}
            </Text>
            <Text style={style.percent}>
                {data.item[ 'data' ][ 'percent' ] || 0}
            </Text>
        </View>
    )

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].background } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Top Populated Municipalities</Text>
            <View style={styles.separator} />

            <View>
                <FlatList
                    data={data}
                    renderItem={renderData}
                    numColumns={1}
                    keyExtractor={data.index}
                    style={{ width: Dimensions.get( 'screen' ).width, height: '83%' }}
                />
            </View>

        </View>
    );
}

const style = StyleSheet.create( {
    dataContainer: {
        margin: 9,
        padding: 10,
        borderLeftWidth: 3,
        borderLeftColor: '#FF0000',
        backgroundColor: 'rgba(150,150,150,.05)',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        marginVertical: 5,
        width: '95%'
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