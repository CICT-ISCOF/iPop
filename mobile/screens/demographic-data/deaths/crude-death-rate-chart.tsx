import styles from '../../../shared/locations/municipality.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';
import base from '../../../constants/Api';
import chartConfig from '../../../constants/linechartConfig'

export default function CrudeDeathRate( props: any ) {

    const { width, height } = Dimensions.get( 'window' );

    const colorScheme = useColorScheme();

    React.useEffect( () => {
        filter()
    }, [] )

    const [ chartdata, setchartdata ]: any = React.useState( {
        labels: [ '2015', '2016', '2017', '2018' ],
        datasets: [
            {
                data: [ 0, 0, 0, 0 ],
            },
        ],
    } )

    async function filter() {
        let tempChart: any = {
            labels: [],
            datasets: [
                {
                    data: [],
                },
            ],
        }

        const filter = {
            municipality: props.data.municipality,
            barangay: props.data.barangay,
            year: props.data.year,
        }

        const url =
            base.apiURL +
            'death-statistics?' +
            `?municipality=${ filter[ 'municipality' ] }&barangay=${ filter[ 'barangay' ] }&year=${ filter[ 'year' ] }`
        axios.get( url ).then( ( response ) => {

            if ( response.data.data != null ) {
                for ( let key in response.data.incidence ) {
                    tempChart.labels.push( response.data.incidence[ key ][ 'year' ] )
                    tempChart.datasets[ 0 ].data.push( response.data.incidence[ key ][ 'value' ] )
                }
                setchartdata( tempChart )
            } else {
                alert( `No data on year ${ filter.year }` )
            }
        } );
    }


    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].background, } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Crude Death Rate</Text>
            <Text style={{ color: 'gray', textAlign: 'center', marginTop: -20, textTransform: 'capitalize' }}>{props.data.barangay}, {props.data.municipality}</Text>

            <View style={{ padding: 10 }}>
                <View style={[ { backgroundColor: Colors[ colorScheme ].background }, style.chartContainer ]}>
                    <View style={style.chartWrapper}>
                        <LineChart
                            data={chartdata}
                            chartConfig={chartConfig( '#E2351C' )}
                            bezier
                            width={width + 100}
                            height={200}
                            fromZero={true}
                            withDots={true}
                            withShadow={true}
                            withInnerLines={false}
                            withOuterLines={false}
                            withVerticalLines={false}
                            withHorizontalLines={false}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create( {
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 50,
        marginLeft: 20
    },
    chartTitle: {
        fontSize: 20,
        alignSelf: 'flex-start',
        marginBottom: 40,
        marginLeft: 20,
        fontWeight: '500'
    },
    chartWrapper: {
        transform: [
            { translateX: 7 }
        ]
    }
} )


