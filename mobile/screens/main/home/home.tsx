import { View, Image, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react'; import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

import base from '../../../constants/Api';
import * as React from 'react';
import styles from './home.style';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import Carousel from './components/carousel/carousel';
import FeautredArticles from './components/featured-articles/featured-articls';
import HomeNav from './home-nav';
import SearchScreen from './search-screen'
import TopPadding from '../../../shared/top-padding/top-padding';
import { useNavigation } from '@react-navigation/native';


export default function Home() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
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

    const [ showSearch, setShowSearch ] = useState( false )
    const [ show, setShow ] = useState( true )
    function scrollHandler( event: any ) {
        if ( event.nativeEvent.contentOffset.y > 1 ) {
            setShow( false )
        } else {
            setShow( true )
        }
    }

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].homeBG, } ]}>

            <TopPadding />

            <SearchScreen
                show={showSearch}
                showSearch={() => {
                    setShowSearch( false )
                }}
            />

            <View
                style={[ {
                    width: '100%',
                    zIndex: 99,
                    paddingTop: 50,
                    backgroundColor: Colors[ colorScheme ].homeBG,
                    flexDirection: 'row',
                    paddingHorizontal: 10
                },
                show == true ? {} : { position: 'absolute', left: -500 }
                ]}>
                <View style={{ flex: 4 }}>
                    <Image
                        style={{
                            height: 25,
                            width: 50,
                            resizeMode: 'stretch',
                            marginBottom: 10,
                        }}
                        source={require( '../../../assets/images/logo.png' )}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setShowSearch( true )
                    }}
                >
                    <Ionicons name="search-outline" size={24} color="#426FC3" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate( 'Others' );
                    }}>
                    <Entypo
                        style={{ marginLeft: 20 }}
                        name='info-with-circle'
                        size={24}
                        color='#426FC3'
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                onScroll={( event ) => {
                    scrollHandler( event )
                }}
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
