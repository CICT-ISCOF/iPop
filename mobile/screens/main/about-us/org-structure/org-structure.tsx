import axios from 'axios';
import base from '../../../../constants/Api';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../../../../constants/Colors';

import useColorScheme from '../../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../../shared/back-container/back-container';
import TopPadding from '../../../../shared/top-padding/top-padding';
import DynamicSmallHeader from '../../../../shared/header/dynamic-small-header';


export default function OrgStructure() {
    const colorScheme = useColorScheme();
    const [ photo, setPhoto ] = useState( '' );

    const [ show, setShow ] = React.useState( false )
    function scrollHandler( event: any ) {
        if ( event.nativeEvent.contentOffset.y < 1 ) {
            setShow( false )
        } else {
            setShow( true )
        }
    }

    useEffect( () => {
        async function fetchData() {
            axios.get( base.apiURL + base.orgStructure ).then( ( response ) => {
                setPhoto( response.data.photo.uri );
            } );
        }

        fetchData();
    }, [] )

    return (
        <View style={[ styles.container, { padding: 0 } ]}>

            <View style={show == true ? {} : { position: 'absolute', left: -500 }}>
                <DynamicSmallHeader text="Organizational Structure" />
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
                        Organizational Structure
                    </Text>
                </View>

                <Image style={styles.image} source={{ uri: photo }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
    },
    menu: {
        fontWeight: 'bold',
        fontSize: 25,
        width: '100%',
        marginBottom: 50,
        marginTop: -40,
        textAlign: 'center',
        paddingHorizontal: 50
    },
    image: {
        width: '100%',
        alignSelf: 'center',
        height: '200%',
        resizeMode: 'stretch',
    },
} );
