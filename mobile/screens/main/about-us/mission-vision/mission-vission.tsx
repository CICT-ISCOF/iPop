import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MissionVIsion() {
    const colorScheme = useColorScheme();
    const styles = StyleSheet.create( {
        container: {
            flex: 1,
            padding: 20,
            paddingTop: 30,
        },
        menu: {
            fontWeight: 'bold',
            fontSize: 25,
            width: '100%',
            marginBottom: 50,
            marginTop: -40,
            textAlign: 'center',
            paddingHorizontal: 50
        },
        title: {
            margin: 10,
            fontWeight: '700',
            fontSize: 25,
            color: '#426FC3',
            marginTop: 50,
        },
        description: {
            padding: 10,
            color: Colors[ colorScheme ].text,
            lineHeight: 30,
        },
    } );


    const [ show, setShow ] = React.useState( false )
    function scrollHandler( event: any ) {
        if ( event.nativeEvent.contentOffset.y < 1 ) {
            setShow( false )
        } else {
            setShow( true )
        }
    }


    return (
        <View style={[ styles.container, { padding: 0 } ]}>
            <TopPadding />
            <View style={show == true ? {} : { position: 'absolute', left: -500 }}>
                <DynamicSmallHeader text="Mission & Vision" />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={( event ) => {
                    scrollHandler( event )
                }}
                style={[ styles.container, { backgroundColor: Colors[ colorScheme ].homeBG, }, ]}>

                <View style={show != true ? {} : { position: 'absolute', left: -500 }}>
                    <BackContainer hidden={true} />
                    <Text
                        style={[ styles.menu, { color: Colors[ colorScheme ].text } ]}>
                        Mission & Vision
                    </Text>
                </View>

                <View>
                    <Text style={styles.title}>VISION</Text>
                    <Text style={styles.description}>
                        "By 2020, the Provincial Population Office (PPO), as the
                        implementing arm of the Philippine Population Management
                        Program in the Province of Iloilo, will be dynamic,
                        reliable, people-centered, and culturally-sensitive
                        population information resource agency in Region VI ".
                    </Text>
                </View>

                <View>
                    <Text style={styles.title}> MISSION </Text>
                    <Text style={styles.description}>
                        "To provide technical assistance and information needs
                        to the Local Government Units (LGUs), partner agencies
                        and stakeholders in carrying out measures relative to
                        the integration of population and development, through
                        the generation and utilization of reliable and updated
                        data, and implementation of population management
                        programs and projects to uplift the quality of life of
                        the Ilonggo population ".
                    </Text>
                </View>
                <View style={{ height: 150 }} />
            </ScrollView>
        </View>
    );
}

import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../../shared/back-container/back-container';
import TopPadding from '../../../../shared/top-padding/top-padding'; import DynamicSmallHeader from '../../../../shared/header/dynamic-small-header';

