import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from '../../../shared/locations/municipality.style'
import TopPadding from '../../../shared/top-padding/top-padding';
import Carousel from '../../main/home/components/carousel/carousel';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ShowMPC( { route }: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}>
            <View style={{
                backgroundColor: Colors[ colorScheme ].homeBG
            }}>
                <TopPadding />
                <ScrollView style={{ paddingTop: 50, height: '100%' }} showsVerticalScrollIndicator={false}>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                        style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                        <Entypo name="chevron-thin-left" size={24} color={Colors[ colorScheme ].text} />
                    </TouchableOpacity>
                    <Carousel type="Show" data={route.params.data.files} />

                    <Text style={[ styles.title, { color: Colors[ colorScheme ].text, textTransform: 'capitalize' } ]}>
                        District <Text style={{ textTransform: 'uppercase' }}> {route.params.district}  </Text>
                        {route.params.data.name}
                        <Text style={{ textTransform: 'uppercase' }}>  MPCFDC</Text>
                    </Text>
                    <Text style={{ color: 'gray', textAlign: 'center', marginTop: -10, textTransform: 'capitalize' }}>
                        {route.params.municipality}
                    </Text>

                    <Text
                        style={{
                            fontSize: 25,
                            color: Colors[ colorScheme ].text,
                            margin: 20,
                            fontWeight: '800',
                            marginTop: 50
                        }}
                    >
                        Services Offered
                        </Text>
                    <Text style={{
                        padding: 20,
                        color: Colors[ colorScheme ].text1,
                        lineHeight: 30,
                    }} >
                        {
                            route.params.services == "" || route.params.services == null
                                ? 'No posted services yet...' : route.params.services
                        }

                    </Text>



                </ScrollView>
            </View>
        </View>
    );
}
