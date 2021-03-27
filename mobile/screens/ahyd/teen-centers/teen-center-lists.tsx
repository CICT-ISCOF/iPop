import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './teen-centerss.style';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import TopPadding from '../../../shared/top-padding/top-padding';
import BackContainer from '../../../shared/back-container/back-container';
import DynamicSmallHeader from '../../../shared/header/dynamic-small-header';

export default function TeenCenterList( { route }: any ) {
    const { data, number } = route.params;
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ show, setShow ] = React.useState( false )
    function scrollHandler( event: any ) {
        if ( event.nativeEvent.contentOffset.y < 1 ) {
            setShow( false )
        } else {
            setShow( true )
        }
    }


    return (
        <View style={[ styles.container, { padding: 0 } ]}>
            <TopPadding />

            <View style={show == true ? {} : { position: 'absolute', left: -500 }}>
                <DynamicSmallHeader text={'District ' + number} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={( event ) => {
                    scrollHandler( event )
                }}
                style={[ styles.container, { backgroundColor: Colors[ colorScheme ].homeBG, }, ]}>

                <View style={show != true ? {} : { position: 'absolute', left: -500 }}>
                    <BackContainer />
                    <Text
                        style={[ styles.menu, { color: Colors[ colorScheme ].text } ]}>
                        District {number}
                    </Text>
                </View>

                {data.data.map( ( tc: any, index: any ) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                navigation.navigate( 'ShowTeenCenter', {
                                    data: tc,
                                } );
                            }}
                            style={[ styles.teenCenter, ]}>
                            <FontAwesome5
                                name='university'
                                size={25}
                                color='#EF7896'
                            />
                            <View style={{
                                height: '100%', borderRightWidth: 1, marginLeft: 10, borderRightColor: 'rgba(150,150,150,.1)'
                            }} />

                            <View
                                style={{
                                    marginLeft: 20,
                                    flex: 4
                                }}>
                                <Text
                                    style={{
                                        flex: 1,
                                        color: Colors[ colorScheme ].text,
                                        fontSize: 20,
                                    }}>
                                    {tc.name}
                                </Text>
                                <Text style={{ flex: 0.3, color: 'gray' }}>
                                    {tc.municipality}
                                </Text>
                            </View>
                            <Entypo name="chevron-small-right" size={24} color="gray" />

                        </TouchableOpacity>
                    );
                } )}
                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    );
}

