import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

import styles from '../../shared/locations/municipality.style'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function POPDataMenu( props: any ) {
    const colorScheme = useColorScheme();

    function setType( type: any ) {
        props.type( type )
    }

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].background } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Select What to View</Text>
            <View style={styles.separator} />

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ width: Dimensions.get( 'screen' ).width }} >

                <TouchableOpacity
                    onPress={() => {
                        setType( 'Top Populated Muncipalities' )
                    }}
                    style={[ styles.roundedButton ]}>
                    <View style={[ styles.roundedButtonIcon, { backgroundColor: 'rgba(250,0,0,.2)' } ]}>
                        <AntDesign name="linechart" size={34} color="red" />
                    </View>
                    <Text style={styles.roundedButtonText}>Top Populated Municipalities</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setType( 'Population profile' )

                    }}
                    style={[ styles.roundedButton, props.show == false ? { position: 'absolute', left: -500 } : {} ]}>
                    <View style={[ styles.roundedButtonIcon, { backgroundColor: 'rgba(33,163,241,.2)' } ]}>
                        <MaterialCommunityIcons name="account-circle-outline" size={34} color="#21A3F1" />
                    </View>
                    <Text style={styles.roundedButtonText}>Population Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setType( 'Population Pyramid' )
                    }}
                    style={[ styles.roundedButton, props.show == false ? { position: 'absolute', left: -500 } : {} ]}>
                    <View style={[ styles.roundedButtonIcon, { backgroundColor: 'rgba(194,108,117,.2)' } ]}>
                        <Feather name="triangle" size={34} color="#C26C75" />
                    </View>
                    <Text style={styles.roundedButtonText}>Population Pyramid</Text>
                </TouchableOpacity>

            </ScrollView>
        </View >
    );
}
