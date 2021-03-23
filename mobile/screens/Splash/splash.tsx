import React from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash( { navigation }: any ) {


    React.useEffect( () => {
        ( async () => {
            if ( await AsyncStorage.getItem( 'has-stepper' ) == undefined ) {
                await AsyncStorage.setItem( 'has-stepper', 'true' )
                setTimeout( () => {
                    navigation.navigate( 'Step1' )
                }, 1000 );
            } else {
                setTimeout( () => {
                    navigation.navigate( 'Root' )
                }, 1000 );
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
                animation="zoomIn" easing="ease-out" duration={1000} iterationCount={1} direction="normal"
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
