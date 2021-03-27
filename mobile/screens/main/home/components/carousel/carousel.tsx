import React, { useState, useRef } from 'react';
import { View, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './carousel.style'

export default function Carousel( props: any ) {

    const images = props.data;
    const scrollViewRef: any = useRef();
    const [ step, setStep ]: any = useState( 0 )
    const [ position, setPosition ]: any = useState( 0 )

    return (
        <View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                horizontal={true}
                decelerationRate={0}
                snapToInterval={310 - ( 0 + 0 )}
                snapToAlignment={"center"}
                centerContent={true}
                directionalLockEnabled={true}
                bounces={false}
                onScroll={event => {
                    if ( event.nativeEvent.contentOffset.x > 50 ) {
                        setPosition( event.nativeEvent.contentOffset.x )
                        if ( event.nativeEvent.contentOffset.x < position ) {
                            if ( step != 0 ) {
                                setStep( step - 1 )
                            }
                            return
                        }
                        if ( step != images.length ) {
                            setStep( step + 1 )
                        }
                    }

                }}
                style={[
                    styles.scrollview,
                    images.length != 0 ? { marginLeft: -9 } : { position: 'absolute', left: 500 },
                ]}
            >
                {
                    images.map( ( image: any, index: any ) => {
                        if ( props.type == undefined ) {
                            return (
                                <View style={[
                                    { padding: 5 },
                                ]}>
                                    <Image
                                        key={index}
                                        style={styles.image}
                                        source={{ uri: image.photo.uri }}
                                    />
                                </View>
                            )
                        }
                        if ( props.type == 'Show' ) {
                            return (
                                <View style={[
                                    { padding: 5 },
                                ]}>
                                    <Image
                                        key={index}
                                        style={styles.image}
                                        source={{ uri: image.file.uri }}
                                    />
                                </View>
                            )
                        }

                    } )
                }
            </ScrollView>

            {/* <View
                style={[
                    styles.buttons,
                    { left: 0 },
                    images.length == 0 || images.length == 1 ?
                        { position: 'absolute', left: 500 } : {}
                ]}>
                <TouchableOpacity
                    onPress={() => {
                        scrollViewRef.current.scrollTo( { x: position - 360, animated: true } )
                    }}
                >
                    <Entypo name="chevron-with-circle-left" size={34} color="#426FC3" />
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
                        scrollViewRef.current.scrollTo( { x: position + 360, animated: true } )
                    }}
                >
                    <Entypo name="chevron-with-circle-right" size={34} color="#426FC3" />
                </TouchableOpacity>
            </View> */}

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


