
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BarChart, } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import React from 'react';
import axios from 'axios';
import styles from '../../../shared/locations/municipality.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import base from '../../../constants/Api';
import chartConfig from '../../../constants/chartconfig'

export default function MigrationSummaryChart( props: any ) {
    const colorScheme = useColorScheme();
    const { width, height } = Dimensions.get( 'screen' );

    const [ chartdataTotal, setchartdataTotal ] = React.useState( {
        labels: [ 'Population', 'In Migration', 'Out Migration', 'Net Migration' ],
        datasets: [ { data: [ 0, 0, 0, 0 ] } ]
    } )

    React.useEffect( () => {
        filter()
    }, [] )

    async function filter() {
        const filter = {
            municipality: props.data.municipality,
            barangay: props.data.barangay,
            year: props.data.year,
        }

        let tempChart: any = {
            labels: [ 'Population', 'InMig', 'OutMig', 'NetMig' ],
            datasets: [ { data: [] } ]
        }

        const Firsturl = base.apiURL + 'statistic-profile/total';
        axios.get( Firsturl ).then( ( response ) => {
            tempChart.datasets[ 0 ].data.push( response.data.total )
            const url =
                base.apiURL +
                'migration-statistics?' +
                `?municipality=${ filter[ 'municipality' ] }&barangay=${ filter[ 'barangay' ] }&year=${ filter[ 'year' ] }`
            axios.get( url ).then( ( response ) => {
                if ( response.data.data != null ) {
                    tempChart.datasets[ 0 ].data.push( response.data.data[ 'total_in_migrations' ] );
                    tempChart.datasets[ 0 ].data.push( response.data.data[ 'total_out_migrations' ] );
                    tempChart.datasets[ 0 ].data.push( response.data.data[ 'net_migrations' ] );
                    setchartdataTotal( tempChart )
                } else {
                    alert( `No data on year ${ filter.year }` )
                }
            } )
        } )
    }

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].background, } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Migrations by months</Text>
            <Text style={{ color: 'gray', textAlign: 'center', marginTop: -20, textTransform: 'capitalize' }}>{props.data.barangay}, {props.data.municipality}</Text>

            <Text style={[ style.chartTitle, { color: Colors[ colorScheme ].text, marginTop: 20 } ]}>
                Total Migrations on Year ({props.data.year})
            </Text>

            <BarChart
                data={chartdataTotal}
                width={width - 20}
                height={200}
                chartConfig={chartConfig( '#1000B5' )}
                fromZero={true}
                showBarTops={false}
                withHorizontalLabels={true}
                withInnerLines={false}
                withDots={true}
                withShadow={true}
                withOuterLines={true}
                withVerticalLines={true}
                withHorizontalLines={false}
            />
        </View>
    );
}

const style = StyleSheet.create( {
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingBottom: 0,
        paddingHorizontal: 10,
        marginTop: 50,
        marginLeft: -20
    },
    chartTitle: {
        fontSize: 20,
        alignSelf: 'flex-start',
        marginBottom: 40,
        marginLeft: 20,
        fontWeight: '500'
    },
    nav: {
        flexDirection: 'row',
        margin: 20,
        backgroundColor: 'rgba(113,111,139,.1)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        marginTop: 40
    },
    navButtons: {
        marginRight: 20,
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
    },
    avtiveButton: {
        backgroundColor: '#426FC3',
        shadowColor: "rgba(113,111,139,1)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.57,
        shadowRadius: 4.65,
        elevation: 6,
    },
    InactiveText: {
        color: 'gray'
    },
    activeText: {
        color: 'white',
        fontWeight: 'bold'
    }
} )