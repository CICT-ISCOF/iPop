import { View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import styles from './migrations.style';

import FullMapScreen from '../../../shared/mapScreen/mapscreen'
import Municipalities from '../../../shared/locations/municipality';
import Barangays from '../../../shared/locations/barangay';
import Years from '../../../shared/locations/year';
import BirthMenu from '../births/menu';
import BottomSheetScreen from 'react-native-animated-bottom-sheet';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import ConfirmBottomSheet from '../../../shared/confirm/confirm';
import MigrationsSummary from './migrations.summary';
import TotalDataMIgration from './migrations.total-data';
import MigrationSummaryChart from './migration-summary-chart';
import MonthCharts from './migrations.month-charts';

export default function Migrations() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    let textInput: any

    const [ municipality, setmunicipality ]: any = React.useState( {} );
    const [ barangay, setbarangay ]: any = React.useState( '' );
    const [ show, setShow ]: any = React.useState( false );
    const [ year, setYear ]: any = React.useState( 0 );
    const [ type, setType ]: any = React.useState( ' 0' );

    const MunicipalityRef: any = React.useRef();
    const MunicipalitySheet = () => (
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

    const BarangayRef: any = React.useRef();
    const BarangaySheet = () => (
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

    const YearRef: any = React.useRef();
    const YearSheet = () => (
        <Years
            year={( year: any ) => {
                setYear( year )
                YearRef.current.close()
                setTimeout( () => {
                    if ( type == 'Local Data' ) {
                        LocalDataRef.current.open()
                    }
                    if ( type == 'Migrations Summary' ) {
                        MigrationRef.current.open()
                    }
                    if ( type == 'Migrations by Month' ) {
                        DeathsByMonthsRef.current.open()
                    }
                }, 500 );
            }}
        />
    )

    const MenuRef: any = React.useRef();
    const MenuSheet = () => (
        <BirthMenu
            text="Deaths"
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

    const ProvincialDataRef: any = React.useRef();
    const ProvincialSheet = () => (
        <MigrationsSummary />
    )

    const LocalDataRef: any = React.useRef();
    const LocalDataSheet = () => (
        <TotalDataMIgration
            data={{
                year: year,
                municipality: municipality.name,
                barangay: barangay.name
            }}
        />
    )

    const ConfrimSheetRef: any = React.useRef();
    const ConfirmSheet = () => (
        <ConfirmBottomSheet
            color="#00C8F7"
            choices={[ 'Migrations Summary', 'Migrations by Month' ]}
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

    const MigrationRef: any = React.useRef();
    const MigrationSheet = () => (
        <MigrationSummaryChart
            data={{
                year: year,
                municipality: municipality.name,
                barangay: barangay.name
            }}
        />
    )

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
            <BottomSheetScreen
                ref={LocalDataRef}
                renderContent={LocalDataSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.75}
            />
            <BottomSheetScreen
                ref={ConfrimSheetRef}
                renderContent={ConfirmSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 3.5}
            />
            <BottomSheetScreen
                ref={MigrationRef}
                renderContent={MigrationSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 2}
            />
            <BottomSheetScreen
                ref={DeathsByMonthsRef}
                renderContent={DeathsByMonthsSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.5}
            />
        </View>

    );
}

