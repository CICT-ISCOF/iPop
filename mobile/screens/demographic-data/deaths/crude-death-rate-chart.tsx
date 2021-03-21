export default function CrudeDeathRate(props: any) {
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

    if (
        props.lineChartData != undefined &&
        props.lineChartData.crudeDeathRate != undefined &&
        props.lineChartData.crudeDeathRate.length != 0
    ) {
        chartdata.labels = [];
        chartdata.datasets[0].data = [];

        for (let index in props.lineChartData.crudeDeathRate) {
            chartdata.labels.push(
                props.lineChartData.crudeDeathRate[index].year
            );
            chartdata.datasets[0].data.push(
                props.lineChartData.crudeDeathRate[index].value
            );
        }
    }

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
                Crude Death Rate
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

import styles from './deaths.style';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
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
