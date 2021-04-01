import { View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import React from 'react';
import styles from './births.style';
import FullMapScreen from '../../../shared/mapScreen/mapscreen'
import BottomSheetScreen from 'react-native-animated-bottom-sheet';
import Municipalities from '../../../shared/locations/municipality';
import Barangays from '../../../shared/locations/barangay';
import Years from '../../../shared/locations/year';
import BirthMenu from './menu';
import Summary from './summary';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import ConfirmBottomSheet from '../../../shared/confirm/confirm';
import TotalData from './total-data'
import MonthCharts from './month-charts'
import TeenageBirths from './teenage-births-charts';
import IllegitimateBirths from './illegitimate-births-charts';

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
                        if ( type == 'Local Data' ) {
                            LocalDataRef.current.open()
                        }
                        if ( type == 'Incidence of Teenage Births' ) {
                            TeenageRef.current.open()
                        }
                        if ( type == 'Incidence of Illegitimate Births' ) {
                            IllegitimateRef.current.open()
                        }
                        if ( type == 'Births by Month' ) {
                            DeathsByMonthsRef.current.open()
                        }
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
                        if ( value == 'Provincial Data' ) {
                            ProvincialDataRef.current.open()
                            return
                        }
                        if ( value == 'Charts' ) {
                            ConfrimSheetRef.current.open()
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
            <TotalData
                data={{
                    year: year,
                    municipality: municipality.name,
                    barangay: barangay.name
                }}
            />
        )
    }

    const ConfrimSheetRef: any = React.useRef();
    const ConfirmSheet = () => (
        <ConfirmBottomSheet
            color="orange"
            choices={[ 'Incidence of Teenage Births', 'Incidence of Illegitimate Births', 'Births by Month' ]}
            calback={( choice: any ) => {
                setType( choice )
                setTimeout( () => {
                    YearRef.current.open()
                }, 500 );
            }}
            blur={( value: any ) => {
                if ( value == true ) {
                    ConfrimSheetRef.current.close()
                }
            }}
        />
    )

    const TeenageRef: any = React.useRef();
    const TeenageSheet = () => {
        return (
            <TeenageBirths
                data={{
                    year: year,
                    municipality: municipality.name,
                    barangay: barangay.name
                }}
            />
        )
    }

    const IllegitimateRef: any = React.useRef();
    const IllegitimateSheet = () => {
        return (
            <IllegitimateBirths
                data={{
                    year: year,
                    municipality: municipality.name,
                    barangay: barangay.name
                }}
            />
        )
    }

    const DeathsByMonthsRef: any = React.useRef();
    const DeathsByMonthsSheet = () => (
        <MonthCharts
            data={{
                year: year,
                municipality: municipality.name,
                barangay: barangay.name
            }}
        />
    )


    return (
        <View style={[ styles.container, { padding: 0 } ]}>

            <FullMapScreen location={{ barangay: barangay, municipality: municipality.name }} />

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
                    style={[ styles.menuContainer, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}>
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
                visibleHeight={Dimensions.get( 'window' ).height / 2.2}

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
            <BottomSheetScreen
                ref={ConfrimSheetRef}
                renderContent={ConfirmSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 3.5}
            />
            <BottomSheetScreen
                ref={LocalDataRef}
                renderContent={LocalDataSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.75}
            />
            <BottomSheetScreen
                ref={DeathsByMonthsRef}
                renderContent={DeathsByMonthsSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.5}
            />
            <BottomSheetScreen
                ref={TeenageRef}
                renderContent={TeenageSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 2}
            />
            <BottomSheetScreen
                ref={IllegitimateRef}
                renderContent={IllegitimateSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 2}
            />
        </View>
    );
}
