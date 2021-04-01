import TopPadding from '../../../../shared/top-padding/top-padding';
import * as Linking from 'expo-linking';

export default function Awards() {
    const colorScheme = useColorScheme();

    let feedBackground = colorScheme == 'dark' ? '#242526' : 'white';

    const [ awards, setAwards ] = useState( [] );

    useEffect( () => {
        async function fetchData() {
            axios.get( base.apiURL + base.awards ).then( ( response ) => {
                setAwards( response.data );
            } );
        }

        fetchData();
    }, [] )

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
                <DynamicSmallHeader text="Awards" />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={( event ) => {
                    scrollHandler( event )
                }}
                style={[ styles.container, { backgroundColor: Colors[ colorScheme ].homeBG, }, ]}>

                <View style={show != true ? {} : { position: 'absolute', left: -500 }}>
                    <BackContainer hidden={true} />
                    <Text
                        style={[ styles.menu, { color: Colors[ colorScheme ].text } ]}>
                        Awards
                    </Text>
                </View>

                {
                    awards.map( ( award: any, index: any ) => (
                        <View
                            style={[ styles.article, { backgroundColor: feedBackground, }, ]}>
                            <Text style={[ styles.title, { color: Colors[ colorScheme ].text }, ]}>
                                {award.title}
                            </Text>
                            <TouchableOpacity onPress={() => {
                                Linking.openURL( award.url )
                            }}>
                                <Text style={[ { color: Colors[ colorScheme ].text1 } ]}>
                                    {award.url}
                                </Text>
                            </TouchableOpacity>
                            <Carousel type="Show" data={award.medias} />

                        </View>
                    ) )
                }
                <View style={{ height: 150 }} />
            </ScrollView>
        </View>
    );
}
import axios from 'axios';
import base from '../../../../constants/Api';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../../shared/back-container/back-container';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './awards.style'; import Carousel from '../../home/components/carousel/carousel';
import DynamicSmallHeader from '../../../../shared/header/dynamic-small-header';

