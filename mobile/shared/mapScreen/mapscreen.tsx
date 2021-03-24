import React, { useEffect, useState, useImperativeHandle, useRef, forwardRef } from 'react';
import { View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import axios from 'axios';


export default function MapScreen( props: any ) {
    const colorScheme = useColorScheme();

    const [ location, setLocation ] = useState( {
        coords: { latitude: 0, longitude: 0 },
        longitude: 0,
        latitudeDelta: 0,
    } )

    const [ data, setData ]: any = useState( [
        {
            lat: 11.0050,
            lon: 122.5373,
            display_name: 'Iloilo Province',
        }
    ] )

    useEffect( () => {
        ( async () => {
            let { status } = await Location.requestPermissionsAsync();
            if ( status !== 'granted' ) {
                alert( 'Permission to access location was denied' );
                return
            }
            let location: any = await Location.getCurrentPositionAsync( {} );
            setLocation( location )
        } )();

        changeMap()
    }, [ props.location ] )

    function changeMap() {
        if ( props.location != undefined ) {
            const url = `https://us1.locationiq.com/v1/search.php?key=pk.ca7d72d67098fe33153685abf70e35a9&q=${ props.location.barangay.name } ${ props.location.municipality }&format=json`
            axios.get( url ).then( ( response ) => {
                setData( response.data )
            } ).catch( ( error ) => {
                console.error( error )
            } )
        }

    }

    return (
        <View >
            <MapView
                region={{
                    latitude: data[ 0 ].lat,
                    longitude: data[ 0 ].lon,
                    latitudeDelta: 1.52,
                    longitudeDelta: 1.421,
                }}
                mapType="standard"
                style={{
                    width: Dimensions.get( 'window' ).width,
                    height: Dimensions.get( 'window' ).height + 50,
                    marginTop: -50,
                    position: 'absolute'
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    pinColor={"#1ED760"}
                    title={"You are here"}
                />

                <Marker
                    coordinate={{
                        latitude: data[ 0 ].lat,
                        longitude: data[ 0 ].lon
                    }}
                    pinColor={"red"}
                    title={data[ 0 ].display_name}
                />
            </MapView>
        </View>
    );
}
