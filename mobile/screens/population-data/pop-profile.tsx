import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../../shared/locations/municipality.style'
import useColorScheme from '../../hooks/useColorScheme';
import base from '../../constants/Api';
import Colors from '../../constants/Colors';
import axios from 'axios';

export default function PopProfile( props: any ) {

    const [ data, setData ] = React.useState( {
        municipality: 'N/A',
        barangay: 'N/A',
        year: 'N/A',
        coverage: 'N/A',
        barangays: 'N/A',
        land_area: 'N/A',
        household_population: 'N/A',
        males: 'N/A',
        females: 'N/A',
        sex_ratio: 'N/A',
        median_age: 'N/A',
        doubling: 'N/A',
        growth_rate: 'N/A',
        households: 'N/A',
        average_household_size: 'N/A',
        density: 'N/A',
        age_dependency_ratio: 'N/A',
        child_dependency_ratio: 'N/A',
        old_age_dependency_ratio: 'N/A',
    } )

    React.useEffect( () => {
        getData()
    }, [] )


    function getData() {
        const filter = {
            municipality: props.data.municipality,
            barangay: props.data.barangay,
            year: props.data.year,
        }

        const url =
            base.apiURL +
            'statistic-profiles' +
            `?municipality=${ filter[ 'municipality' ] }&barangay=${ filter[ 'barangay' ] }&year=${ filter[ 'year' ] }`;
        axios.get( url ).then( ( response ) => {
            if ( response.data.length != 0 ) {
                setData( response.data[ 0 ] );
            } else {
                alert( `Population Profile on year ${ filter.year } is not set` );
            }
        } )
    }


    const colorScheme = useColorScheme();

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].BottomSheetBG } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Population Profile</Text>
            <View style={styles.separator} />

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Coverage
                 </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.coverage || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    {data.coverage}
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.barangays || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Total Land Area
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.land_area || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Total HH Population
                 </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.household_population || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Male
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.males || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Female
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.females || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Sex Ratio
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.sex_ratio || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Median Age
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.median_age || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Doubling Time/Year
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.doubling || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Population Growth Rate
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.growth_rate || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    No. of Households
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.households || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Average Household Size
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.average_household_size || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Population Density
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.density}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Age Dependency Ratio
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.age_dependency_ratio || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Child Dependency Ratio
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.child_dependency_ratio || 'N/A'}
                </Text>
            </View>

            <View style={style.dataContainer}>
                <Text style={{ color: Colors[ colorScheme ].text1, flex: 1 }}>
                    Old-Age Dep Ratio
                </Text>
                <Text style={{ color: Colors[ colorScheme ].text, flex: 1 }}>
                    {data.old_age_dependency_ratio || 'N/A'}
                </Text>
            </View>

        </View>
    );
}

const style = StyleSheet.create( {
    dataContainer: {
        margin: 9,
        padding: 8,
        paddingHorizontal: 20,
        borderLeftWidth: 3,
        borderLeftColor: '#21A3F1',
        backgroundColor: 'rgba(150,150,150,.05)',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        marginVertical: 5,
        width: '95%',
        flexDirection: 'row'
    },
} )