import axios from 'axios';
import base from '../../../constants/Api';
import { View, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import * as React from 'react';
import styles from './home.style';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

//components
import Carousel from './components/carousel/carousel';
import FeautredArticles from './components/featured-articles/featured-articls';
import { ScrollView } from 'react-native-gesture-handler';
import HomeNav from './home-nav';

export default function Home() {
    const colorScheme = useColorScheme();

    const [ refreshing, setRefreshing ] = useState( false );
    const [ carouselData, setCarouselData ] = useState( [] );
    const [ feautredArticlesData, setFeautredArticlesData ] = useState( [] );

    const onRefresh = () => {
        setRefreshing( true );
        axios.get( base.apiURL + base.carousel ).then( ( response ) => {
            setCarouselData( response.data );
            axios.get( base.apiURL + base.featureArticles ).then( ( response ) => {
                setFeautredArticlesData( response.data );
                setRefreshing( false );
            } );
        } );
    };

    const refresh = () => {
        axios.get( base.apiURL + base.carousel ).then( ( response ) => {
            setCarouselData( response.data );
            axios.get( base.apiURL + base.featureArticles ).then( ( response ) => {
                setFeautredArticlesData( response.data );
            } );
        } );
    }

    useEffect( () => {
        async function fetchCarouseData() {
            axios.get( base.apiURL + base.carousel ).then( ( response ) => {
                setCarouselData( response.data );
            } );
        }

        async function fetchfeautredArticlesData() {
            axios.get( base.apiURL + base.featureArticles ).then( ( response ) => {
                setFeautredArticlesData( response.data );
            } );
        }

        fetchCarouseData();
        fetchfeautredArticlesData();
    }, [] );

    function changeArticle() {

    }


    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].homeBG, } ]}>
            <View style={{
                width: '100%',
                zIndex: 99,
                paddingTop: 50,
                backgroundColor: Colors[ colorScheme ].homeBG
            }}>
                <Image
                    style={{
                        height: 25,
                        width: 50,
                        resizeMode: 'stretch',
                        margin: 20,
                        marginTop: -5,

                    }}
                    source={require( '../../../assets/images/logo.png' )}
                />
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        tintColor='#426FC3'
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Carousel
                    data={carouselData}
                />

                <HomeNav
                    menu={( menu: any ) => {
                        changeArticle()
                    }}
                />

                <FeautredArticles
                    refresh={() => {
                        refresh()
                    }}
                    data={feautredArticlesData}
                />
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}
