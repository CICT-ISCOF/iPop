import React, { useEffect, useState, useImperativeHandle, useRef, forwardRef } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export default function MapScreen(props: any, ref: any) {

    const colorScheme = useColorScheme();

    const [location, setLocation] = useState({
        coords: { latitude: 0, longitude: 0 },
        longitude: 0,
        latitudeDelta: 0,
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [type, setType]: any = useState('Standard');


    const [data, setData]: any = useState([
        {
            lat: 11.0050,
            lon: 122.5373,
            display_name: 'Iloilo Province',
        }
    ]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location: any = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();

        changeMap()

    }, [props.change]);

    function changeMap() {
        if (props.change != ' ') {
            const url = `https://us1.locationiq.com/v1/search.php?key=pk.ca7d72d67098fe33153685abf70e35a9&q=${props.change}&format=json`
            axios.get(url).then((response) => {
                setData(response.data)
            }).catch((error) => {
                console.error(error)
            });
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        map: {
            width: Dimensions.get('window').width,
            height: 490,
            marginLeft: -20,
            marginTop: 20
        },
        button: {
            backgroundColor: Colors[colorScheme].bg1,
            padding: 7,
            borderRadius: 5,
            marginRight: 10,
            minWidth: 80,
            alignItems: 'center'
        }
    });



    return (
        <View style={[
            props.change != ' ' ? {} : { display: 'none' }
        ]}>
            <View style={{
                flexDirection: 'row',
                marginTop: 50,
                marginLeft: -10,
                marginBottom: -70,
                position: 'relative',
                zIndex: 9
            }}>
                <TouchableOpacity
                    onPress={() => {
                        setType('standard')
                    }} style={styles.button}><Text style={{
                        color: Colors[colorScheme].text
                    }}>Standard</Text></TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setType('satellite')
                    }} style={styles.button}><Text style={{
                        color: Colors[colorScheme].text
                    }}>Satelite</Text></TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setType('hybrid')
                    }} style={styles.button}><Text style={{
                        color: Colors[colorScheme].text
                    }}>Hybrid</Text></TouchableOpacity>
            </View>
            <MapView
                region={{
                    latitude: data[0].lat,
                    longitude: data[0].lon,
                    latitudeDelta: 0.922,
                    longitudeDelta: 0.421,
                }}
                mapType={type}
                style={styles.map}

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
                        latitude: data[0].lat,
                        longitude: data[0].lon
                    }}
                    pinColor={"red"}
                    title={data[0].display_name}
                />
            </MapView>
        </View>
    );
}

import axios from 'axios';


