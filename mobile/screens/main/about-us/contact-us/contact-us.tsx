import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import React from 'react';
import TopPadding from '../../../../shared/top-padding/top-padding';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../../shared/back-container/back-container';
import DynamicSmallHeader from '../../../../shared/header/dynamic-small-header';


export default function ContactUs() {
    const colorScheme = useColorScheme();

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
                <DynamicSmallHeader text="Contact Us" />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={( event ) => {
                    scrollHandler( event )
                }}
                style={[ styles.container, { backgroundColor: Colors[ colorScheme ].homeBG, }, ]}>

                <View style={show != true ? {} : { position: 'absolute', left: -500 }}>
                    <BackContainer />
                    <Text
                        style={[ styles.menu, { color: Colors[ colorScheme ].text } ]}>
                        Contact Us
                    </Text>
                </View>

                <View style={{ alignItems: 'flex-start' }}>
                    <View style={styles.contacts}>
                        <View
                            style={[
                                styles.iconHolder,
                                { backgroundColor: '#EDC333' },
                            ]}>
                            <Feather name='phone' size={24} color='white' />
                        </View>
                        <Text
                            style={{
                                color: Colors[ colorScheme ].text,
                            }}>
                            (033) 509 5081 | 328 7913
                        </Text>
                    </View>

                    <View style={styles.contacts}>
                        <View
                            style={[
                                styles.iconHolder,
                                { backgroundColor: '#425B89' },
                            ]}>
                            <FontAwesome
                                name='facebook-f'
                                size={24}
                                color='white'
                            />
                        </View>
                        <Text
                            style={{
                                color: Colors[ colorScheme ].text,
                            }}>
                            PPO Iloilo
                        </Text>
                    </View>

                    <View style={styles.contacts}>
                        <View
                            style={[
                                styles.iconHolder,
                                { backgroundColor: '#AF381C' },
                            ]}>
                            <AntDesign name='mail' size={24} color='white' />
                        </View>
                        <Text
                            style={{
                                color: Colors[ colorScheme ].text,
                            }}>
                            ppo@iloilo.gov.phsvv
                        </Text>
                    </View>

                    <View style={styles.contacts}>
                        <View
                            style={[
                                styles.iconHolder,
                                { backgroundColor: '#44A6CB' },
                            ]}>
                            <AntDesign name='twitter' size={24} color='white' />
                        </View>
                        <Text
                            style={{
                                color: Colors[ colorScheme ].text,
                            }}>
                            ppo@iloilo
                        </Text>
                    </View>
                </View>
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
    contacts: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    iconHolder: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        borderRadius: 50,
    },
} );
