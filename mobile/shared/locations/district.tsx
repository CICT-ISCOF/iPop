import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import styles from './municipality.style'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function District( props: any ) {
    const colorScheme = useColorScheme();

    const districts = [ 'I', 'II', , 'III', , 'IV' ]


    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Select District</Text>
            <View style={styles.separator} />

            <View>
                {
                    districts.map( ( district: any, index: any ) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.button}
                            onPress={() => {
                                props.district( district )
                            }}
                        >
                            <MaterialCommunityIcons name="map-marker-distance" size={24} color="#645FA9" />
                            <Text
                                style={{
                                    color: 'gray',
                                    marginLeft: 15,
                                    fontSize: 20,
                                    flex: 3
                                }}
                            > District {district}</Text>
                            <Entypo name="chevron-small-right" size={24} color="gray" />
                        </TouchableOpacity>
                    ) )

                }
            </View>
        </View>
    );
}
