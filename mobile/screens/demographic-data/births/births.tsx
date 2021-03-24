
import React from 'react';
import { View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import styles from './births.style';
import FullMapScreen from '../../../shared/mapScreen/mapscreen'
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import BottomSheetScreen from 'react-native-animated-bottom-sheet';

import Municipalities from '../../../shared/locations/municipality';
import Barangays from '../../../shared/locations/barangay';
import Years from '../../../shared/locations/year';
import BirthMenu from './menu';
import Summary from './summary';

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

export default function Births() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    let textInput: any

    const [ municipality, setmunicipality ]: any = React.useState( {} );
    const [ barangay, setbarangay ]: any = React.useState( '' );
    const [ show, setShow ]: any = React.useState( false );
    const [ year, setYear ]: any = React.useState( 0 );
    const [ type, setType ]: any = React.useState( ' 0' );

    const MunicipalityRef: any = React.useRef();
    const MunicipalitySheet = () => {
        return (
            <Municipalities
                data={( data: any ) => {
                    setmunicipality( data )
                    MunicipalityRef.current.close()
                    setTimeout( () => {
                        BarangayRef.current.open()
                    }, 500 );
                }}
            />
        )
    }

    const BarangayRef: any = React.useRef();
    const BarangaySheet = () => {
        return (
            <Barangays
                data={municipality}
                barangayData={( data: any ) => {
                    setbarangay( data )
                    setShow( true )
                    BarangayRef.current.close()
                    setTimeout( () => {
                        MenuRef.current.open()
                    }, 500 );
                }}
            />
        )
    }

    const YearRef: any = React.useRef();
    const YearSheet = () => {
        return (
            <Years
                year={( year: any ) => {
                    setYear( year )
                    YearRef.current.close()
                    setTimeout( () => {

                        // if ( type == 'Population profile' ) {
                        //     PopProfileRef.current.open()
                        // }
                        // if ( type == 'Population Pyramid' ) {
                        //     PyramidRef.current.open()
                        // }
                    }, 500 );
                }}
            />
        )
    }

    const MenuRef: any = React.useRef();
    const MenuSheet = () => {
        return (
            <BirthMenu
                text="Births"
                type={( value: any ) => {
                    MenuRef.current.close()
                    setTimeout( () => {
                        setType( value )
                        if ( type == 'Provincial Data' ) {
                            ProvincialDataRef.current.open()
                            return
                        }
                        YearRef.current.open()
                    }, 500 );
                }}
                show={show}
            />
        )
    }

    const ProvincialDataRef: any = React.useRef();
    const ProvincialSheet = () => {
        return (
            <Summary />
        )
    }

    const LocalDataRef: any = React.useRef();
    const LocalDataSheet = () => {
        return (
            <Summary />
        )
    }


    return (
        <View style={[ styles.container, { padding: 0 } ]}>

            <FullMapScreen location={{ barangay: barangay, municipality: municipality.name }} />


            <View style={[ styles.topContainer ]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={[ styles.backContainer, { backgroundColor: Colors[ colorScheme ].background } ]}>
                    <Ionicons name="arrow-back" size={20} color={Colors[ colorScheme ].text1} />
                </TouchableOpacity>

                <View style={[ styles.textINputContainer, { backgroundColor: Colors[ colorScheme ].background } ]}>
                    <View style={[ styles.iconCOntainer, { backgroundColor: Colors[ colorScheme ].background } ]}>
                        <Ionicons name="ios-search-outline" size={20} color={Colors[ colorScheme ].text1} />
                    </View>
                    <TextInput
                        ref={ref => textInput = ref}
                        style={[ styles.textInput, { backgroundColor: Colors[ colorScheme ].background } ]}
                        placeholder="Select Location"
                        onTouchEnd={() => {
                            textInput.blur()
                            setShow( false )
                            setbarangay( {} )
                            MunicipalityRef.current.open()
                        }}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        MenuRef.current.open()
                    }}
                    style={[ styles.menuContainer, { backgroundColor: Colors[ colorScheme ].background } ]}>
                    <SimpleLineIcons name="menu" size={16} color={Colors[ colorScheme ].text1} />
                </TouchableOpacity>
            </View>
            <BottomSheetScreen
                ref={MunicipalityRef}
                renderContent={MunicipalitySheet}
                visibleHeight={Dimensions.get( 'window' ).height - 50}
            />
            <BottomSheetScreen
                ref={BarangayRef}
                renderContent={BarangaySheet}
                visibleHeight={Dimensions.get( 'window' ).height - 50}
            />
            <BottomSheetScreen
                ref={MenuRef}
                renderContent={MenuSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 3}
            />
            <BottomSheetScreen
                ref={YearRef}
                renderContent={YearSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.75}
            />
            <BottomSheetScreen
                ref={ProvincialDataRef}
                renderContent={ProvincialSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.75}
            />
        </View>
    );
}
