import React from 'react';
import { View, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import FullMapScreen from '../../shared/mapScreen/mapscreen'
import styles from './pop-data.style';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomSheetScreen from 'react-native-animated-bottom-sheet';
import Municipalities from '../../shared/locations/municipality'
import Barangays from '../../shared/locations/barangay';
import POPDataMenu from './menu';
import TopPopulated from './top-populated';
import PopProfile from './pop-profile';
import Years from '../../shared/locations/year';
import PyramidChart from './pop-pyramid';

export default function PopulationData() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [ municipality, setmunicipality ]: any = React.useState( {} );
    const [ barangay, setbarangay ]: any = React.useState( '' );
    const [ show, setShow ]: any = React.useState( false );
    const [ year, setYear ]: any = React.useState( 0 );
    const [ type, setType ]: any = React.useState( ' 0' );


    let textInput: any

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
                        if ( type == 'Top Populated Muncipalities' ) {
                            TopPopulatedRef.current.open()
                        }
                        if ( type == 'Population profile' ) {
                            PopProfileRef.current.open()
                        }
                        if ( type == 'Population Pyramid' ) {
                            PyramidRef.current.open()
                        }
                    }, 500 );
                }}
            />
        )
    }

    const MenuRef: any = React.useRef();
    const MenuSheet = () => {
        return (
            <POPDataMenu
                type={( value: any ) => {
                    MenuRef.current.close()
                    setTimeout( () => {
                        setType( value )
                        YearRef.current.open()
                    }, 500 );
                }}
                show={show}
            />
        )
    }

    const TopPopulatedRef: any = React.useRef();
    const TopPopulatedSheet = () => {
        return (
            <TopPopulated />
        )
    }

    const PopProfileRef: any = React.useRef();
    const PopProfileSheet = () => {
        return (
            <PopProfile
                data={{
                    year: year,
                    municipality: municipality.name,
                    barangay: barangay.name
                }}
            />
        )
    }

    const PyramidRef: any = React.useRef();
    const PyramidSheet = () => {
        return (
            <PyramidChart
                data={{
                    year: year,
                    municipality: municipality.name,
                    barangay: barangay.name
                }}
            />
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
                ref={TopPopulatedRef}
                renderContent={TopPopulatedSheet}
                visibleHeight={Dimensions.get( 'window' ).height - 50}
            />
            <BottomSheetScreen
                ref={PopProfileRef}
                renderContent={PopProfileSheet}
                visibleHeight={Dimensions.get( 'window' ).height - 50}
            />
            <BottomSheetScreen
                ref={PyramidRef}
                renderContent={PyramidSheet}
                visibleHeight={Dimensions.get( 'window' ).height - 50}
            />
        </View>
    );
}


