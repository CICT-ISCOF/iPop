import React from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";


export default function Splash( { navigation }: any ) {

    NetInfo.addEventListener( state => {
        setInterval( () => {
            if ( !state.isConnected ) {
                navigation.navigate( 'NoInternet' )
            }
        }, 1000 )
    } );

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require( '../../assets/audio/netflix_intro.mp3' )
        );
        sound.setVolumeAsync( .1 )
        sound.playAsync();
    }
    React.useEffect( () => {
        const unsubscribe = navigation.addListener( 'focus', () => {
            playSound()
        } )
        return () => {
            unsubscribe()
        }
    }, [ navigation ] )

    React.useEffect( () => {
        ( async () => {
            if ( await AsyncStorage.getItem( 'has-stepper' ) == undefined ) {
                await AsyncStorage.setItem( 'has-stepper', 'true' )
                setTimeout( () => {
                    navigation.navigate( 'Step1' )
                }, 3000 );
            } else {
                setTimeout( () => {
                    navigation.navigate( 'Root' )
                }, 3000 );
            }
        } )()

    }, [ navigation ] )


    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}
        >
            <Animatable.Image
                animation="zoomIn" easing="ease-out" duration={2000} iterationCount={1} direction="normal"
                style={{
                    resizeMode: 'stretch',
                    position: 'absolute',
                    zIndex: 9,
                    height: 50,
                    width: 100,
                    alignSelf: 'center'
                }}
                source={require( '../../assets/images/logo.png' )}
            />

        </View>
    );
}
