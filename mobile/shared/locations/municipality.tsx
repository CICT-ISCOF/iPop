import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import styles from './municipality.style'
import axios from 'axios';
import base from '../../constants/Api';
import { FontAwesome5 } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons';

export default function Municipalities( props: any ) {
    const colorScheme = useColorScheme();

    const [ municipalities, setMunicipalities ]: any = React.useState( [] );

    const baseURL = base.apiURL + 'location';
    React.useEffect( () => {
        const url = baseURL + '/municipalities?province_code=0630';
        axios.get( url ).then( ( response ) => {
            setMunicipalities( response.data );
        } );
    }, [] );

    async function getBarangays( municipality_code: any ) {
        let url = baseURL + '/barangays?municipality_code=' + municipality_code;
        axios.get( url ).then( ( response ) => {
            let barangays = response.data
            url = `${ baseURL }/municipality-code?municipality_code=${ municipality_code }`;
            axios.get( url ).then( ( response ) => {
                props.data( {
                    barangays: barangays,
                    name: response.data.name,
                    code: response.data.code
                } )
            } );
        } );
    }

    const renderMunicipalities = ( data: any ) => (
        <TouchableOpacity
            style={styles.button}
            onPress={( item: any ) => {
                getBarangays( data.item.code )
            }}
        >
            <FontAwesome5 name="map-marker-alt" size={25} color="#FC671E" />
            <Text
                style={{
                    color: 'gray',
                    marginLeft: 15,
                    textTransform: 'capitalize',
                    fontSize: 20,
                    flex: 3
                }}
            > {data.item.name}</Text>
            <Entypo name="chevron-small-right" size={24} color="gray" />
        </TouchableOpacity>
    )

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Choose Municipality</Text>
            <View style={styles.separator} />

            <View>
                <FlatList
                    data={municipalities}
                    renderItem={renderMunicipalities}
                    numColumns={1}
                    keyExtractor={municipalities.index}
                    style={{ width: Dimensions.get( 'screen' ).width, height: '83%' }}
                />
            </View>
        </View>
    );
}
