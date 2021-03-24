import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../../../shared/locations/municipality.style'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function PMOCMenu( props: any ) {
    const colorScheme = useColorScheme();

    function setType( type: any ) {
        props.type( type )
    }
    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].background } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Select What to View on PMOC</Text>
            <Text style={{ color: 'gray', textAlign: 'center', marginTop: -20, textTransform: 'capitalize' }}> {props.municipality}</Text>
            <View style={styles.separator} />

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ width: Dimensions.get( 'screen' ).width }} >

                <TouchableOpacity
                    onPress={() => {
                        setType( 'Local PMOC Data' )
                    }}
                    style={[ styles.roundedButton ]}>
                    <View style={[ styles.roundedButtonIcon, { backgroundColor: 'rgba(248,146,54,.2)' } ]}>
                        <MaterialIcons name="local-offer" size={24} color="orange" />
                    </View>
                    <Text style={styles.roundedButtonText}>Local PMOC Data</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setType( 'Number of Couples By Months' )

                    }}
                    style={[ styles.roundedButton, props.show == false ? { position: 'absolute', left: -500 } : {} ]}>
                    <View style={[ styles.roundedButtonIcon, { backgroundColor: 'rgba(206,47,109,.2)' } ]}>
                        <Ionicons name="people-circle-outline" size={24} color="#CE2F6D" />
                    </View>
                    <Text style={styles.roundedButtonText}>Number of Couples By Months</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setType( 'PMC Couple Applicants by Age Group' )
                    }}
                    style={[ styles.roundedButton, props.show == false ? { position: 'absolute', left: -500 } : {} ]}>
                    <View style={[ styles.roundedButtonIcon, { backgroundColor: 'rgba(137,186,88,.2)' } ]}>
                        <FontAwesome5 name="stamp" size={24} color="#89BA58" />
                    </View>
                    <Text style={styles.roundedButtonText}>PMC Couple Applicants by Age Group</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setType( 'PMC Applicants by Employment Status and Sex' )
                    }}
                    style={[ styles.roundedButton, props.show == false ? { position: 'absolute', left: -500 } : {} ]}>
                    <View style={[ styles.roundedButtonIcon, { backgroundColor: 'rgba(222,215,26,.2)' } ]}>
                        <FontAwesome5 name="money-check-alt" size={24} color="#DED71A" />
                    </View>
                    <Text style={styles.roundedButtonText}>PMC Applicants by Employment Status and Sex</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setType( 'Knowledge on Family Planning among PMC Applicants' )
                    }}
                    style={[ styles.roundedButton, props.show == false ? { position: 'absolute', left: -500 } : {} ]}>
                    <View style={[ styles.roundedButtonIcon, { backgroundColor: 'rgba(151,231,249,.2)' } ]}>
                        <Fontisto name="injection-syringe" size={24} color="#97D5F9" />
                    </View>
                    <Text style={styles.roundedButtonText}>Knowledge on Family Planning among PMC Applicants</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setType( 'Percentage Distribution of PMC Applicants by Civil Status' )
                    }}
                    style={[ styles.roundedButton, props.show == false ? { position: 'absolute', left: -500 } : {} ]}>
                    <View style={[ styles.roundedButtonIcon, { backgroundColor: 'rgba(250,0,0,.5)' } ]}>
                        <MaterialCommunityIcons name="account-heart-outline" size={24} color="pink" />
                    </View>
                    <Text style={styles.roundedButtonText}>Percentage Distribution of PMC Applicants by Civil Status</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setType( 'PMC Applicants by Average Monthly Income and Sex' )
                    }}
                    style={[ styles.roundedButton, props.show == false ? { position: 'absolute', left: -500 } : {} ]}>
                    <View style={[ styles.roundedButtonIcon, { backgroundColor: 'rgba(0,0,0,.9)' } ]}>
                        <MaterialIcons name="attach-money" size={24} color="gold" />
                    </View>
                    <Text style={styles.roundedButtonText}>PMC Applicants by Average Monthly Income and Sex</Text>
                </TouchableOpacity>

            </ScrollView>
        </View >
    );
}
