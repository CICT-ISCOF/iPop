import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import styles from './pop-data.style';
//@ts-ignore
import { StackedBarChart, YAxis, XAxis } from 'react-native-svg-charts';
import React from 'react';
import { View, Text } from 'react-native';


export default function PyramidChart( props: any ) {
    const males = props.males;
    const females = props.females;
    const colorScheme = useColorScheme();

    return (
        <View style={[ males.length < 2 ? { display: 'none' } : {} ]}>
            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[ colorScheme ].text,
                    },
                ]}>
                Population Pyramid
            </Text>
            <View style={styles.separator}></View>
            <View
                style={{
                    flexDirection: 'row',
                }}>
                <YAxis
                    data={YAsixdata}
                    contentInset={{ top: 0, bottom: 0 }}
                    svg={{
                        fill: 'black',
                        fontSize: 10,
                    }}
                    numberOfTicks={6}
                    formatLabel={( value: any, index: any ) => {
                        return pyramidLabesl[ index ];
                    }}
                    style={{
                        marginRight: 20,
                        marginTop: 35,
                        height: 350,
                    }}
                />
                <StackedBarChart
                    style={{
                        height: 400,
                        flex: 1,
                        transform: [ { scaleX: -1 } ],
                    }}
                    keys={keys}
                    colors={[ '#5EB5EF' ]}
                    data={males}
                    horizontal={true}
                    showGrid={true}
                    contentInset={{ top: 30, bottom: 30 }}
                />
                <StackedBarChart
                    style={{ height: 400, flex: 1 }}
                    keys={keys}
                    colors={[ '#FF829D' ]}
                    data={females}
                    horizontal={true}
                    showGrid={true}
                    contentInset={{ top: 30, bottom: 30 }}
                />
            </View>
            <XAxis
                style={{ marginTop: 20 }}
                data={[ 1, 2 ]}
                formatLabel={( value: any, index: any ) => {
                    return pyramidXAxis[ index ];
                }}
                contentInset={{ left: 70, right: 70 }}
                svg={{ fontSize: 10, fill: 'black' }}
            />
        </View>
    );
}

const pyramidXAxis = [ 'Males', 'Females' ];
const YAsixdata = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

const keys = [ 'Females' ];

const pyramidLabesl = [
    '80+', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54', '45-49', '40-44', '35-39', '30-34',
    '25-29', '20-24', '15-19', '10-14', '5-9', '-1',
];

