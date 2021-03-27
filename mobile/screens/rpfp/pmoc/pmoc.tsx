import { View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
    coupleByAgeGroup,
    applicantsByEmploymentStatus,
    averageMonthlyIncome,
    knowLedgeOnFP,
    byCivilStatus,
    localData
} from './pmoc.service'

import * as process from './chart-process'




import React from 'react';
import styles from './pmoc.style';
import FullMapScreen from '../../../shared/mapScreen/mapscreen'
import BottomSheetScreen from 'react-native-animated-bottom-sheet';
import Municipalities from '../../../shared/locations/municipality';
import Years from '../../../shared/locations/year';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import PMOCMenu from './pmoc-menu';
import Chart from './chart';
import PMOCSummary from './pmoc.summary';



export default function PMOCData() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    let textInput: any

    const [ municipality, setmunicipality ]: any = React.useState( {} );
    const [ show, setShow ]: any = React.useState( false );
    const [ year, setYear ]: any = React.useState( 0 );
    const [ type, setType ]: any = React.useState( ' 0' );
    const [ chartData, setchartData ]: any = React.useState( [] );

    const MunicipalityRef: any = React.useRef();
    const MunicipalitySheet = () => {
        return (
            <Municipalities
                data={( data: any ) => {
                    setmunicipality( data )
                    MunicipalityRef.current.close()
                    setTimeout( () => {
                        setShow( true )
                        MenuRef.current.open()
                    }, 500 );
                }}
            />
        )
    }

    const MenuRef: any = React.useRef();
    const MenuSheet = () => {
        return (
            <PMOCMenu
                municipality={municipality.name}
                type={( value: any ) => {
                    MenuRef.current.close()
                    setType( value )
                    setTimeout( () => {
                        YearRef.current.open()
                    }, 500 );
                }}
                show={show}
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
                        processTypes()
                    }, 500 );
                }}
            />
        )
    }


    const ChartRef: any = React.useRef();
    const ChartSheet = () => {
        return (
            <Chart
                type={type}
                data={chartData}
                municipality={municipality.name}
            />
        )
    }


    const LocalDataRef: any = React.useRef();
    const LocalDataSheet = () => {
        return (
            <PMOCSummary
                data={{
                    year: year,
                    municipality: municipality.name,
                }}
            />
        )
    }

    async function processTypes() {
        if ( type == 'Local PMOC Data' ) {
            LocalDataRef.current.open()
            return
        }
        if ( type == 'Number of Couples By Months' ) {
            let data = await localData( municipality.name, year )
            setchartData( await process.NumberofCouples( data.month ) )
        }
        if ( type == 'PMC Couple Applicants by Age Group' ) {
            let data = await coupleByAgeGroup( municipality.name, year )
            setchartData( await process.AgeGroup( data ) )
        }
        if ( type == 'PMC Applicants by Employment Status and Sex' ) {
            let data = await applicantsByEmploymentStatus( municipality.name, year )
            setchartData( await process.EmploymentStatus( data ) )
        }
        if ( type == 'Knowledge on Family Planning among PMC Applicants' ) {
            let data = await knowLedgeOnFP( municipality.name, year )
            setchartData( await process.KnowLedgeOnFP( data ) )
        }
        if ( type == 'Percentage Distribution of PMC Applicants by Civil Status' ) {
            let data = await byCivilStatus( municipality.name, year )
            setchartData( await process.CivilStatus( data ) )
        }
        if ( type == 'PMC Applicants by Average Monthly Income and Sex' ) {
            let data = await averageMonthlyIncome( municipality.name, year )
            setchartData( await process.AverageMonthlyIncome( data ) )
        }
        ChartRef.current.open()

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
                            setShow( false )
                            MunicipalityRef.current.open()
                        }}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        MenuRef.current.open()
                    }}
                    style={[ styles.menuContainer, { backgroundColor: Colors[ colorScheme ].BottomSheetBG }, show == true ? {} : { position: 'absolute', left: -550 } ]}>
                    <SimpleLineIcons name="menu" size={16} color={Colors[ colorScheme ].text1} />
                </TouchableOpacity>
            </View>
            <BottomSheetScreen
                ref={MunicipalityRef}
                renderContent={MunicipalitySheet}
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
                ref={ChartRef}
                renderContent={ChartSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.5}
            />
            <BottomSheetScreen
                ref={LocalDataRef}
                renderContent={LocalDataSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.75}
            />
        </View>
    );
}
