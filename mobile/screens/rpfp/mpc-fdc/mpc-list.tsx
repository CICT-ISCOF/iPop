import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from '../../../shared/locations/municipality.style'
import * as get from './mpc.service'


export default function MPCList( props: any ) {
    const colorScheme = useColorScheme();

    const [ data, setData ] = useState( [] )

    useEffect( () => {
        getMPCFDC()
    }, [] )

    function getMPCFDC() {
        get.getMPCFDC( props.municipality, props.district )
            .then( ( data: any ) => {
                setData( data )
            } )
    }


    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Select MPCFDC</Text>
            <Text style={{ color: 'gray', textAlign: 'center', marginTop: -20, textTransform: 'capitalize' }}>{props.municipality}</Text>
            <View style={styles.separator} />

            {
                data.map( ( mpc: any, index: any ) => (
                    <TouchableOpacity
                        style={styles.button}
                        key={index}

                        onPress={() => {
                            props.mpc( mpc )
                        }}
                    >
                        <MaterialCommunityIcons
                            name='home-city'
                            size={16} color={Colors[ colorScheme ].text1} />
                        <Text
                            style={{
                                color: Colors[ colorScheme ].text,
                                marginLeft: 15,
                                textTransform: 'capitalize',
                                fontSize: 20,
                                flex: 3
                            }}
                        > {mpc.name}</Text>
                        <Text style={{ color: 'gray', textTransform: 'capitalize' }}>     {mpc.location} </Text>
                        <Entypo name="chevron-small-right" size={24} color="gray" />
                    </TouchableOpacity>
                ) )
            }



        </View>
    );
}
