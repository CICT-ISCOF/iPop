export default function MonthCharts(props: any) {
    let data = props.data;
    const colorScheme = useColorScheme();

    const screenWidth = Dimensions.get('window').width;

    const chartMigrations = {
        labels: [
            'Total Population',
            'Total In Migration',
            'Total Out Migration',
        ],
        datasets: [
            {
                data: [20, 45, 28],
            },
        ],
    };

    const chartdataMale = {
        labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            '',
            '',
        ],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43, 0, 0],
            },
        ],
    };

    const chartdataFemale = {
        labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            '',
            '',
        ],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43, 0, 0],
            },
        ],
    };

    const chartdataTotal = {
        labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            '',
            '',
        ],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43, 0, 0],
            },
        ],
    };

    const chartConfig = (textColor: any) => {
        return {
            backgroundColor: 'transparent',
            backgroundGradientFrom: Colors[colorScheme].background,
            backgroundGradientTo: Colors[colorScheme].background,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => textColor,
            style: {
                borderRadius: 16,
            },
        };
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
                Migrations By Months(Male)
            </Text>
            <View style={styles.separator}></View>
            <BarChart
                //   style={graphStyle}
                data={chartdataFemale}
                width={screenWidth + 20}
                height={320}
                chartConfig={chartConfig('red')}
            />
            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[colorScheme].text,
                    },
                ]}>
                Migrations By Months(Female)
            </Text>
            <View style={styles.separator}></View>
            <BarChart
                //   style={graphStyle}
                data={chartdataMale}
                width={screenWidth + 20}
                height={320}
                chartConfig={chartConfig('blue')}
            />
            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[colorScheme].text,
                    },
                ]}>
                Migrations By Months(Total)
            </Text>
            <View style={styles.separator}></View>
            <BarChart
                //   style={graphStyle}
                data={chartdataTotal}
                width={screenWidth + 20}
                height={320}
                chartConfig={chartConfig('orange')}
            />
            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[colorScheme].text,
                    },
                ]}>
                Migrations Chart
            </Text>
            <View style={styles.separator}></View>
            <BarChart
                //   style={graphStyle}
                data={chartMigrations}
                width={screenWidth + 20}
                height={320}
                chartConfig={chartConfig('gray')}
            />
        </View>
    );
}
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
import styles from './migrations.style';

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
