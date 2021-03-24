import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../../../shared/locations/municipality.style'
import { FontAwesome5 } from '@expo/vector-icons';

export default function BirthMenu( props: any ) {
    const colorScheme = useColorScheme();

    function setType( type: any ) {
        props.type( type )
    }
    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Select What to View on {props.text}</Text>
            <View style={styles.separator} />

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ width: Dimensions.get( 'screen' ).width }} >

                <TouchableOpacity
                    onPress={() => {
                        setType( 'Provincial Data' )
                    }}
                    style={[ styles.roundedButton ]}>
                    <View style={[ styles.roundedButtonIcon, { backgroundColor: 'rgba(30,215,96,.2)' } ]}>
                        <MaterialIcons name="self-improvement" size={24} color="#1ED760" />
                    </View>
                    <Text style={styles.roundedButtonText}>Provincial Data</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setType( 'Local Data' )

                    }}
                    style={[ styles.roundedButton, props.show == false ? { position: 'absolute', left: -500 } : {} ]}>
                    <View style={[ styles.roundedButtonIcon, { backgroundColor: 'rgba(248,146,54,.2)' } ]}>
                        <MaterialIcons name="local-offer" size={24} color="orange" />
                    </View>
                    <Text style={styles.roundedButtonText}>Local Data</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setType( 'Charts' )
                    }}
                    style={[ styles.roundedButton, props.show == false ? { position: 'absolute', left: -500 } : {} ]}>
                    <View style={[ styles.roundedButtonIcon, { backgroundColor: 'rgba(7,108,201,.2)' } ]}>
                        <FontAwesome5 name="chart-pie" size={24} color="#076DC9" />
                    </View>
                    <Text style={styles.roundedButtonText}>Charts</Text>
                </TouchableOpacity>

            </ScrollView>
        </View >
    );
}
