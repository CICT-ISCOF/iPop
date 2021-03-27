import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import base from '../../../constants/Api';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import TopPadding from '../../../shared/top-padding/top-padding';
import styles from './service.style';
import BackContainer from '../../../shared/back-container/back-container'; import DynamicSmallHeader from '../../../shared/header/dynamic-small-header';



export default function ShowServices( { route }: any ) {
    const colorScheme = useColorScheme();
    let feedBackground = colorScheme == 'dark' ? '#242526' : 'white';
    const [ data, setData ] = useState( { title: '', offers: [] } );

    useEffect( () => {
        async function fetchData() {
            axios
                .get( base.apiURL + base.services + '/' + route.params.data )
                .then( ( response ) => {
                    setData( response.data );
                    console.log( response.data );
                } );
        }

        fetchData();
    }, [] );



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
                <DynamicSmallHeader text={data.title} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={( event ) => {
                    scrollHandler( event )
                }}
                style={[ styles.container, { backgroundColor: Colors[ colorScheme ].homeBG, }, ]}>

                <View style={show != true ? {} : { position: 'absolute', left: -1500 }}>
                    <BackContainer hidden={true} />
                    <Text
                        style={[ styles.menu, { color: Colors[ colorScheme ].text } ]}>
                        {data.title}
                    </Text>
                </View>

                {data.offers.map( ( service: any, index: any ) => {
                    return (
                        <View
                            style={[
                                styles.button,
                                { backgroundColor: Colors[ colorScheme ].background },
                            ]}>
                            <AntDesign name="customerservice"
                                style={{ width: 20 }}
                                size={24}
                                color='#3F66DA'
                            />
                            <View style={styles.separator} />
                            <Text
                                style={[
                                    styles.buttonText,
                                    { color: Colors[ colorScheme ].text },
                                ]}>
                                {service.title}
                            </Text>
                        </View>
                    );
                } )}
            </ScrollView>
        </View>
    );
}
