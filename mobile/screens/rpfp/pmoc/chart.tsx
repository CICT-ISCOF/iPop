

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BarChart, } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import React from 'react';
import styles from '../../../shared/locations/municipality.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import dummy from '../../../constants/dummy'
import chartConfig from '../../../constants/chartconfig'

export default function Chart( props: any ) {
    const colorScheme = useColorScheme();

    const { width, height } = Dimensions.get( 'screen' );

    const chartdataMale = {
        labels: props.data.labels,
        datasets: [ { data: props.data.male } ]
    }

    const chartdataFemale = {
        labels: props.data.labels,
        datasets: [ { data: props.data.female } ]
    }

    const chartdataTotal = {
        labels: props.data.labels,
        datasets: [ { data: props.data.total } ]
    }

    const [ nav, setNav ] = React.useState( 'Males' )

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].BottomSheetBG, } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text, paddingHorizontal: 50 } ]}>{props.type}</Text>
            <Text style={{ color: 'gray', textAlign: 'center', marginTop: -20, textTransform: 'capitalize' }}> {props.municipality}</Text>
            <View style={style.nav}>

                <TouchableOpacity
                    onPress={() => {
                        setNav( 'Males' )
                    }}
                    style={[ style.navButtons,
                    nav == 'Males' ? style.avtiveButton : {},
                    nav == 'Males' ? { backgroundColor: '#49BDD7' } : {}
                    ]}
                >
                    <Text style={nav == 'Males' ? style.activeText : style.InactiveText} >Males</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setNav( 'Females' )
                    }}
                    style={[ style.navButtons,
                    nav == 'Females' ? style.avtiveButton : {},
                    nav == 'Females' ? { backgroundColor: '#EF7896' } : {}
                    ]}
                >
                    <Text style={nav == 'Females' ? style.activeText : style.InactiveText}>Females</Text>
                </TouchableOpacity >

                <TouchableOpacity
                    onPress={() => {
                        setNav( 'Total' )
                    }}
                    style={[ style.navButtons,
                    nav == 'Total' ? style.avtiveButton : {},
                    nav == 'Total' ? { backgroundColor: 'orange' } : {}
                    ]}
                >
                    <Text style={nav == 'Total' ? style.activeText : style.InactiveText}>Total</Text>
                </TouchableOpacity>

            </View>

            <View style={nav == 'Males' ? style.chartContainer : { position: 'absolute', left: -500 }}>
                <Text style={[ style.chartTitle, { color: Colors[ colorScheme ].text } ]}>Males </Text>

                <BarChart
                    data={chartdataMale}
                    width={width - 20}
                    height={200}
                    chartConfig={chartConfig( '#49BDD7' )}
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

            <View style={nav == 'Females' ? style.chartContainer : { position: 'absolute', left: -500 }}>
                <Text style={[ style.chartTitle, { color: Colors[ colorScheme ].text } ]}>Females </Text>

                <BarChart
                    data={chartdataFemale}
                    width={width - 20}
                    height={200}
                    chartConfig={chartConfig( '#EF7896' )}
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



            <View style={nav == 'Total' ? style.chartContainer : { position: 'absolute', left: -500 }}>
                <Text style={[ style.chartTitle, { color: Colors[ colorScheme ].text } ]}>Total </Text>

                <BarChart
                    data={chartdataTotal}
                    width={width - 20}
                    height={200}
                    chartConfig={chartConfig( 'orange' )}
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
        marginTop: 20
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