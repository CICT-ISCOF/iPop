
import Colors from '../../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useColorScheme from '../../../hooks/useColorScheme';
import axios from 'axios';
import base from '../../../constants/Api';
import React, { useState, useEffect } from 'react';
import styles from './program-areas.style';
import { View, Text, ScrollView, Image } from 'react-native';
import BackContainer from '../../../shared/back-container/back-container';
import TopPadding from '../../../shared/top-padding/top-padding'; import DynamicSmallHeader from '../../../shared/header/dynamic-small-header';
import Carousel from '../home/components/carousel/carousel';



export default function ShowProgramAreas( { route }: any ) {
    const [ data, setData ] = useState( {
        title: '',
        activities: [],
        description: '',
    } );
    const colorScheme = useColorScheme();
    let feedBackground = colorScheme == 'dark' ? '#242526' : 'white';

    useEffect( () => {
        async function fetchData() {
            axios
                .get( base.apiURL + base.programAreas + '/' + route.params.data )
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
                        style={[ styles.menu, { color: Colors[ colorScheme ].text, textAlign: 'left', paddingLeft: 0, marginTop: -50, } ]}>
                        {data.title}
                    </Text>
                </View>
                <Text
                    style={[
                        {
                            color: Colors[ colorScheme ].text,
                            marginBottom: 40,
                            lineHeight: 30,
                            textAlign: 'left',
                            marginTop: -10
                        },
                    ]}>
                    {data.description}
                </Text>
                {
                    data.activities.map( ( award: any, index: any ) => {
                        return (
                            <View
                                style={[
                                    styles.article,
                                    {
                                        backgroundColor: feedBackground,
                                    },
                                ]}>

                                <Text
                                    style={[
                                        styles.title1,
                                        { color: Colors[ colorScheme ].text },
                                    ]}>
                                    {award.title}
                                </Text>

                                <Carousel
                                    type="Show"
                                    data={award.files}
                                />

                                <Text
                                    style={[
                                        {
                                            color: Colors[ colorScheme ].text1,
                                            lineHeight: 30,
                                        },
                                    ]}>
                                    {award.description}
                                </Text>

                                <View style={{ height: 50 }} />
                            </View>
                        );
                    } )
                }
                <View style={{ height: 150 }} />
            </ScrollView>
        </View>
    );
}
