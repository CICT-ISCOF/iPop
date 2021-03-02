import React from 'react';
import { View, Text } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function IllegitimateBirths(props: any) {
    let data = props.data;
    const colorScheme = useColorScheme();
    const chartdata = {
        labels: ['2015', '2016', '2017', '2018'],
        datasets: [
            {
                data: [0, 0, 0, 0],
            },
        ],
    };

    const screenWidth = Dimensions.get('window').width;

    if (
        props.lineChartData != undefined &&
        props.lineChartData.illegitimateBirths != undefined &&
        props.lineChartData.illegitimateBirths.length != 0
    ) {
        chartdata.labels = [];
        chartdata.datasets[0].data = [];

        for (let index in props.lineChartData.illegitimateBirths) {
            chartdata.labels.push(
                props.lineChartData.illegitimateBirths[index].year
            );
            chartdata.datasets[0].data.push(
                props.lineChartData.illegitimateBirths[index].value
            );
        }
    }

    const chartConfig = {
        backgroundGradientFrom: Colors[colorScheme].background,
        backgroundGradientTo: Colors[colorScheme].background,
        decimalPlaces: 0,
        fillShadowGradient: '#FF829D',
        fillShadowGradientOpacity: 0.5,
        color: (opacity = 1) => '#FF829D',
        style: {
            borderRadius: 1,
        },
        strokeWidth: 1,
        barPercentage: 0.17,
        labelColor: (opacity = 1) => Colors[colorScheme].text,
        propsForDots: {
            strokeWidth: '1',
            stroke: '#FF829D',
        },
    };
    return (
        <View
            style={[
                {
                    marginTop: 20,
                    marginLeft: -50,
                },
                props.visibility == true ? {} : { display: 'none' },
            ]}>
            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[colorScheme].text,
                    },
                ]}>
                Illegitimate Births (Brgy. {props.barangay})
            </Text>
            <View style={styles.separator}></View>
            <LineChart
                data={chartdata}
                chartConfig={chartConfig}
                bezier
                width={screenWidth + 120}
                height={360}
                fromZero={true}
            />
        </View>
    );
}

import styles from './births.style';

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
