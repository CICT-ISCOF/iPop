export default function CrudeDeathRate(props: any) {
    let data = props.data;
    const colorScheme = useColorScheme();
    const chartdata = {
        labels: ['2015', '2016', '2017', '2018'],
        datasets: [
            {
                data: [20, 45, 28, 89],
            },
        ],
    };

    const screenWidth = Dimensions.get('window').width;

    const chartConfig = {
        backgroundColor: 'transparent',
        backgroundGradientFrom: Colors[colorScheme].background,
        backgroundGradientTo: Colors[colorScheme].background,
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => 'red',
        style: {
            borderRadius: 16,
        },
    };
    return (
        <View
            style={{
                marginTop: 20,
                marginLeft: -50,
            }}>
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
                width={screenWidth + 20}
                height={220}
                chartConfig={chartConfig}
                bezier
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
