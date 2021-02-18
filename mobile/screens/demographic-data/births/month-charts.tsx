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

export default function MonthCharts(props: any) {
    let data = props.data;
    const colorScheme = useColorScheme();

    const screenWidth = Dimensions.get('window').width;
    let chartdataMale = {
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
        ],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
            },
        ],
    };

    let chartdataFemale = {
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
        ],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
            },
        ],
    };

    let chartdataTotal = {
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
        ],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 4],
            },
        ],
    };

    if (props.monthData != undefined && props.monthData.males != undefined) {
        chartdataMale.datasets[0].data = props.monthData.males;
        chartdataFemale.datasets[0].data = props.monthData.female;
        chartdataTotal.datasets[0].data = props.monthData.total;
    }

    const chartConfig = (textColor: any) => {
        return {
            backgroundGradientFrom: Colors[colorScheme].background,
            backgroundGradientTo: Colors[colorScheme].background,
            decimalPlaces: 0,
            fillShadowGradient: textColor,
            fillShadowGradientOpacity: 1,
            color: (opacity = 1) => textColor,
            style: {
                borderRadius: 1,
            },

            strokeWidth: 0.5,
            barPercentage: 0.17,
            labelColor: (opacity = 1) => Colors[colorScheme].text,
            propsForDots: {
                r: '3',
                strokeWidth: '15',
                stroke: 'red',
            },
        };
    };
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
                        color: Colors[colorScheme].text,
                    },
                ]}>
                Births in Brgy. {props.barangay} (Male)
            </Text>
            <View style={styles.separator}></View>
            <BarChart
                //   style={graphStyle}
                data={chartdataFemale}
                width={screenWidth + 50}
                withHorizontalLabels={false}
                height={360}
                chartConfig={chartConfig('#FF829D')}
                fromZero={true}
                showValuesOnTopOfBars={true}
                withInnerLines={false}
            />
            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[colorScheme].text,
                    },
                ]}>
                Births in Brgy. {props.barangay}(Female)
            </Text>
            <View style={styles.separator}></View>
            <BarChart
                //   style={graphStyle}
                data={chartdataMale}
                width={screenWidth + 50}
                withHorizontalLabels={false}
                height={360}
                chartConfig={chartConfig('#5EB5EF')}
                fromZero={true}
                showValuesOnTopOfBars={true}
                withInnerLines={false}
            />
            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[colorScheme].text,
                    },
                ]}>
                Births in Brgy. {props.barangay}(Total)
            </Text>
            <View style={styles.separator}></View>
            <BarChart
                //   style={graphStyle}
                data={chartdataTotal}
                width={screenWidth + 50}
                withHorizontalLabels={false}
                height={360}
                chartConfig={chartConfig('orange')}
                showValuesOnTopOfBars={true}
                fromZero={true}
                withInnerLines={false}
            />
        </View>
    );
}

import styles from './births.style';

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
