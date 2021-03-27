import { View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import React from 'react';
import FullMapScreen from '../../../shared/mapScreen/mapscreen'
import BottomSheetScreen from 'react-native-animated-bottom-sheet';
import Municipalities from '../../../shared/locations/municipality';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './mpc-fdc.style';
import District from '../../../shared/locations/district';
import MPCList from './mpc-list';

export default function MPCFDC() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    let textInput: any

    const [ municipality, setmunicipality ]: any = React.useState( {} );
    const [ district, setdistrict ]: any = React.useState( '' );
    const [ show, setShow ]: any = React.useState( '' );
    const [ data, setData ]: any = React.useState( {} );


    const MunicipalityRef: any = React.useRef();
    const MunicipalitySheet = () => {
        return (
            <Municipalities
                data={( data: any ) => {
                    setmunicipality( data )
                    MunicipalityRef.current.close()
                    setShow( true )
                    setTimeout( () => {
                        MPCListRef.current.open()
                    }, 500 );
                }}
            />
        )
    }

    const DistrictRef: any = React.useRef();
    const DistrictSheet = () => {
        return (
            <District
                district={( district: any ) => {
                    setdistrict( district )
                    DistrictRef.current.close()
                    setTimeout( () => {
                        MunicipalityRef.current.open()
                    }, 500 );
                }}
            />
        )
    }

    const MPCListRef: any = React.useRef();
    const MPCListSheet = () => {
        return (
            <MPCList
                municipality={municipality.name}
                district={district}
                mpc={( data: any ) => {
                    setData( data )
                    MPCListRef.current.close()
                    setTimeout( () => {
                        navigation.navigate( 'ShowMPC', {
                            data: data,
                            municipality: municipality.name,
                            district: district
                        } )
                    }, 500 );
                }}
            />
        )
    }


    return (
        <View style={[ styles.container, { padding: 0 } ]}>

            <FullMapScreen location={{ barangay: { name: '' }, municipality: municipality.name }} />
            <View style={[ styles.topContainer ]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={[ styles.backContainer, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}>
                    <Ionicons name="arrow-back" size={20} color={Colors[ colorScheme ].text1} />
                </TouchableOpacity>

                <View style={[ styles.textINputContainer, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}>
                    <View style={[ styles.iconCOntainer, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}>
                        <Ionicons name="ios-search-outline" size={20} color={Colors[ colorScheme ].text1} />
                    </View>
                    <TextInput
                        ref={ref => textInput = ref}
                        style={[ styles.textInput, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}
                        placeholder="Select Location"
                        onTouchEnd={() => {
                            textInput.blur()
                            DistrictRef.current.open()
                        }}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        MPCListRef.current.open()
                    }}
                    style={[ styles.menuContainer, { backgroundColor: Colors[ colorScheme ].BottomSheetBG }, show == true ? {} : { position: 'absolute', left: -550 } ]}>
                    <MaterialCommunityIcons
                        name='home-city'
                        size={16} color={Colors[ colorScheme ].text1} />
                </TouchableOpacity>
            </View>
            <BottomSheetScreen
                ref={MunicipalityRef}
                renderContent={MunicipalitySheet}
                visibleHeight={Dimensions.get( 'window' ).height - 50}
            />
            <BottomSheetScreen
                ref={DistrictRef}
                renderContent={DistrictSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 2}
            />
            <BottomSheetScreen
                ref={MPCListRef}
                renderContent={MPCListSheet}
                visibleHeight={Dimensions.get( 'window' ).height - 50}
            />

        </View>
    );
}
