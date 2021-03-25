import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import BottomSheetScreen from 'react-native-animated-bottom-sheet';
import ConfirmBottomSheet from './confirm/confirm';

export default function Menus() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const internalStyles = StyleSheet.create( {
        itemWrapper: {
            backgroundColor: Colors[ colorScheme ].homeBG,
            borderRadius: 7,
            paddingVertical: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',

        },
        icon: {
            marginRight: 20,
            borderRightWidth: 1,
            paddingRight: 10,
            borderRightColor: 'rgba(150,150,150,.2)',
            width: 40
        },
        iconText: {
            flex: 4,
            fontSize: 20,
            color: Colors[ colorScheme ].text,
        },
    } );

    const navigate = ( location: any ) => {
        navigation.navigate( location );
    };


    const [ loading, setLoading ] = React.useState( false )

    const ConfrimSheetRef: any = React.useRef();
    const ConfirmSheet = () => (
        <ConfirmBottomSheet
            color="red"
            choices={[ 'Logout', ]}
            calback={( choice: any ) => {
                setLoading( true )
                setTimeout( () => {
                    AsyncStorage.clear();
                    navigation.navigate( 'Login' );
                }, 1000 );

            }}
            blur={( value: any ) => {
                if ( value == true ) {
                    ConfrimSheetRef.current.close()
                }
            }}
        />
    )


    return (
        <View>
            <View style={[
                { position: 'absolute', justifyContent: 'center', width: '100%', height: '100%', zIndex: 9999, },
                loading == true ? {} : { left: -500 }
            ]}>
                <ActivityIndicator />
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigate( 'PopulationData' );
                }}
                style={{
                    marginTop: 20,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <View style={internalStyles.icon}>
                        <Ionicons
                            name='ios-people'
                            size={20}
                            color='#9376FB'
                        />
                    </View>
                    <Text style={internalStyles.iconText}>Population Data</Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => {
                    navigate( 'Births' );
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <View style={internalStyles.icon}>
                        <FontAwesome5
                            name="birthday-cake"
                            size={25}
                            color='#59B259'
                        />
                    </View>
                    <Text style={internalStyles.iconText}>Births</Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />

                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate( 'Deaths' );
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <View style={internalStyles.icon}>
                        <FontAwesome
                            name='warning'
                            size={20}
                            color='#C71E24'
                        />
                    </View>
                    <Text style={internalStyles.iconText}>Deaths</Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />

                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate( 'Migrations' );
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <View style={internalStyles.icon}>
                        <FontAwesome5
                            name='plane'
                            size={20}
                            color='#00B3E0'
                        />
                    </View>
                    <Text style={internalStyles.iconText}>Migrations</Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />

                </View>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => {
                    navigate( 'PMOCData' );
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <View style={internalStyles.icon}>
                        <Fontisto
                            name='persons'

                            size={20}
                            color='#F75800'
                        />
                    </View>
                    <Text style={internalStyles.iconText}>PMOC Data</Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />

                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate( 'MPC-FDC' );
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <View style={internalStyles.icon}>
                        <MaterialCommunityIcons
                            name='home-city'
                            size={20}
                            color='orange'
                        />
                    </View>
                    <Text style={internalStyles.iconText}>MPC-FDC</Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />

                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate( 'TeenCenters' );
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <View style={internalStyles.icon}>
                        <FontAwesome5
                            name='university'
                            size={20}
                            color='#EF7896'
                        />
                    </View>
                    <Text style={internalStyles.iconText}>Teen Centers</Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />

                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate( 'IssuesAndConcerns' );
                }}
                style={{
                    marginTop: 10,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <View style={internalStyles.icon}>
                        <Entypo
                            name='info-with-circle'
                            size={20}
                            color='#426FC3'
                        />
                    </View>
                    <Text style={internalStyles.iconText}>
                        Issues and concers
                    </Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />

                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate( 'Others' );
                }}
                style={{
                    marginTop: 20,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <View style={internalStyles.icon}>
                        <Feather name="external-link"
                            size={20}
                            color='gray'
                        />
                    </View>
                    <Text style={internalStyles.iconText}>Others</Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />

                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    ConfrimSheetRef.current.open()
                }}
                style={{
                    marginTop: 20,
                }}>
                <View style={[ internalStyles.itemWrapper, { borderBottomWidth: 0 } ]}>
                    <View style={internalStyles.icon}>
                        <SimpleLineIcons
                            name='logout'
                            size={20}
                            color='#15B1D7'
                        />
                    </View>
                    <Text style={internalStyles.iconText}>Log-out</Text>

                </View>
            </TouchableOpacity>
            <BottomSheetScreen
                ref={ConfrimSheetRef}
                renderContent={ConfirmSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 3.5}
            />
        </View>

    );
}
