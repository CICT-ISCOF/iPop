import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import styles from './municipality.style'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export default function Barangays( props: any ) {
    const colorScheme = useColorScheme();

    const [ barangays, setBarangays ]: any = React.useState( [] );

    const renderBarangays = ( data: any ) => (
        <TouchableOpacity
            style={styles.button}
            onPress={( item: any ) => {
                props.barangayData( {
                    name: data.item.name
                } )
            }}
        >
            <FontAwesome name="map-signs" size={25} color="#B86E08" />
            <Text
                style={{
                    color: Colors[ colorScheme ].text,
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
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>{props.data.name}</Text>
            <View style={styles.separator} />

            <View>
                <FlatList
                    data={props.data.barangays}
                    renderItem={renderBarangays}
                    numColumns={1}
                    keyExtractor={barangays.index}
                    style={{ width: Dimensions.get( 'screen' ).width, height: '83%' }}
                />
            </View>
        </View>
    );
}
