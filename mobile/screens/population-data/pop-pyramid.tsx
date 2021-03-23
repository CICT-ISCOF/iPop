import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
//@ts-ignore
import { StackedBarChart, YAxis, XAxis, BarChart, Grid } from 'react-native-svg-charts';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import styles from '../../shared/locations/municipality.style'
import base from '../../constants/Api';
import axios from 'axios';


export default function PyramidChart( props: any ) {

    const [ female, setfemale ]: any = React.useState( [] )
    const [ male, setmale ]: any = React.useState( [] )


    React.useEffect( () => {
        getData()
    }, [] )


    function getData() {
        const filter = {
            municipality: props.data.municipality,
            barangay: props.data.barangay,
            year: props.data.year,
        }

        const url =
            base.apiURL +
            'population-pyramid' +
            `?municipality=${ filter[ 'municipality' ] }&barangay=${ filter[ 'barangay' ] }&year=${ filter[ 'year' ] }`;
        axios.get( url ).then( ( response ) => {
            let malesArray = []
            let femalesArray = []
            if ( response.data.length != 0 ) {
                for ( let key in response.data[ 0 ].data.male ) {
                    malesArray.push( response.data[ 0 ].data.male[ key ] );
                }
                for ( let key in response.data[ 0 ].data.female ) {
                    femalesArray.push( response.data[ 0 ].data.female[ key ] );
                }
                setfemale( femalesArray )
                setmale( malesArray )

            } else {
                alert( `Population Pyramid on year ${ filter.year } is not set` );
            }
        } )
    }

    const colorScheme = useColorScheme();

    return (
        <View style={[ styles.container, { backgroundColor: Colors[ colorScheme ].background } ]}>
            <View style={styles.header} />
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Population Pyramid</Text>
            <View style={styles.separator} />


            <View
                style={
                    [
                        {
                            flexDirection: 'row',
                            padding: 15,
                        },
                        male.length == 0 || female.length == 0 ? { display: 'none', position: 'absolute', left: -500 } : {}
                    ]
                }
            >

                <BarChart
                    style={{ transform: [ { scaleX: -1 } ], flex: 1 }}
                    data={male}
                    svg={{ fill: '#1E4973' }}
                    contentInset={{ top: -20, bottom: 0 }}

                    horizontal={true}
                    spacingInner={.5}
                    spacingOuter={.5}
                >
                    <Grid />
                </BarChart>

                <BarChart
                    style={{ height: 400, flex: 1 }}
                    data={female}
                    svg={{ fill: '#C00002' }}
                    contentInset={{ top: -20, bottom: 0 }}
                    horizontal={true}
                    spacingInner={.5}
                    spacingOuter={.5}
                >
                    <Grid />
                </BarChart>
            </View>

            <Text
                style={{
                    textAlign: 'center',
                    padding: 20,
                    color: Colors[ colorScheme ].text
                }} >
                This content has neither x-axis nor y-axis labels. Please refer to the website for labels.
                </Text>
        </View>
    );
}

