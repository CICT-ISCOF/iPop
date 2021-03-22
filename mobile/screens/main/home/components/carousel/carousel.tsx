import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './carousel.style'
import { Entypo } from '@expo/vector-icons';


export default function Carousel( props: any ) {
    const images = props.data;
    const scrollViewRef: any = useRef();
    const [ step, setStep ]: any = useState( 0 )
    const [ position, setPosition ]: any = useState( 0 )




    return (
        <View>
            <Text
                style={[
                    styles.placeholder,
                    images.length == 0
                        ? {}
                        : { position: 'absolute', left: 500 },
                ]}>
                Nothing to show..
            </Text>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                horizontal={true}
                decelerationRate={0}
                snapToInterval={380 - ( 0 + 0 )}
                snapToAlignment={"center"}
                centerContent={true}
                directionalLockEnabled={true}
                bounces={false}
                onScroll={event => {
                    if ( event.nativeEvent.contentOffset.x > 50 ) {
                        if ( event.nativeEvent.contentOffset.x < position ) {
                            if ( step != 0 ) {
                                setStep( step - 1 )
                            }
                            setPosition( event.nativeEvent.contentOffset.x )
                            return
                        }
                        if ( step != images.length ) {
                            setStep( step + 1 )
                            setPosition( event.nativeEvent.contentOffset.x )
                        }
                    }

                }}
                style={[
                    styles.scrollview,
                    images.length != 0 ? {} : { position: 'absolute', left: 500 },
                ]}
            >
                {
                    images.map( ( image: any, index: any ) => {
                        if ( props.type == undefined ) {
                            return (
                                <Image
                                    key={index}
                                    style={styles.image}
                                    source={{ uri: image.photo.uri }}
                                />
                            )
                        }
                        if ( props.type == 'Show' ) {
                            return (
                                <Image
                                    key={index}
                                    style={styles.image}
                                    source={{ uri: image.file.uri }}
                                />
                            )
                        }
                    } )
                }
            </ScrollView>

            <View
                style={[
                    styles.buttons,
                    { left: 0 },
                    images.length == 0 || images.length == 1 ?
                        { position: 'absolute', left: 500 } : {}
                ]}>
                <TouchableOpacity
                    onPress={() => {
                        scrollViewRef.current.scrollTo( { x: position - 380, animated: true } )
                    }}
                >
                    <Entypo name="chevron-with-circle-left" size={34} color="white" />
                </TouchableOpacity>
            </View>

            <View
                style={[
                    styles.buttons,
                    { right: 0 },
                    images.length == 0 || images.length == 1 ?
                        { position: 'absolute', left: 500 } : {}
                ]}>
                <TouchableOpacity
                    onPress={() => {
                        scrollViewRef.current.scrollTo( { x: position + 380, animated: true } )
                    }}
                >
                    <Entypo name="chevron-with-circle-right" size={34} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.stepTab}>
                {
                    images.map( ( image: any, index: any ) => (
                        <View
                            style={[
                                step == index ? styles.stepperActive : styles.stepper,
                                images.length == 0 || images.length == 1 ? { position: 'absolute', left: 500 } : {}
                            ]}
                        />
                    ) )

                }
            </View>
        </View>
    );
}


