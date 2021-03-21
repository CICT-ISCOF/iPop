import React from 'react';
import { View, Text } from 'react-native';
import { BarChart, } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import styles from './births.style';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import dummy from '../../../constants/dummy'
import chartConfig from '../../../constants/chartconfig'

export default function MonthCharts( props: any ) {
    const screenWidth = Dimensions.get( 'window' ).width;
    const colorScheme = useColorScheme();


    let chartdataMale = {
        labels: dummy.labels,
        datasets: [
            {
                data: dummy.data,
            },
        ],
    };

    let chartdataFemale = {
        labels: dummy.labels,
        datasets: [
            {
                data: dummy.data,
            },
        ],
    };

    let chartdataTotal = {
        labels: dummy.labels,
        datasets: [
            {
                data: dummy.data,
            },
        ],
    };

    if ( props.monthData != undefined && props.monthData.males != undefined ) {
        chartdataMale.datasets[ 0 ].data = props.monthData.males;
        chartdataFemale.datasets[ 0 ].data = props.monthData.female;
        chartdataTotal.datasets[ 0 ].data = props.monthData.total;
    }



    return (
        <View
            style={[
                {
                    marginTop: 20,
                    marginLeft: -70,
                },
                props.visibility == true || props.monthData.length != undefined
                    ? {}
                    : { display: 'none' },
            ]}>
            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[ colorScheme ].text,
                    },
                ]}>
                Births in Brgy. {props.barangay} (Male)
            </Text>

            <View style={styles.separator}></View>

            <BarChart
                data={chartdataFemale}
                width={screenWidth + 50}
                withHorizontalLabels={false}
                height={360}
                chartConfig={chartConfig( '#FF829D' )}
                fromZero={true}
                showValuesOnTopOfBars={true}
                withInnerLines={false}
            />
            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[ colorScheme ].text,
                    },
                ]}>
                Births in Brgy. {props.barangay}(Female)
            </Text>

            <View style={styles.separator}></View>

            <BarChart
                data={chartdataMale}
                width={screenWidth + 50}
                withHorizontalLabels={false}
                height={360}
                chartConfig={chartConfig( '#5EB5EF' )}
                fromZero={true}
                showValuesOnTopOfBars={true}
                withInnerLines={false}
            />

            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[ colorScheme ].text,
                    },
                ]}>
                Births in Brgy. {props.barangay}(Total)
            </Text>

            <View style={styles.separator}></View>
            <BarChart
                data={chartdataTotal}
                width={screenWidth + 50}
                withHorizontalLabels={false}
                height={360}
                chartConfig={chartConfig( 'orange' )}
                showValuesOnTopOfBars={true}
                fromZero={true}
                withInnerLines={false}
            />
        </View>
    );
}

