import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopPadding from '../../../../shared/top-padding/top-padding';

export default function CoreValues() {
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
        list: {
            padding: 10,
            lineHeight: 30,
            color: Colors[ colorScheme ].text1,
            fontWeight: '500',
        },
        bold: {
            fontWeight: '900',
            fontSize: 16,
            color: '#426FC3',
        },
    } )

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
                <DynamicSmallHeader text="Core Values" />
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
                        Core Values
                    </Text>
                </View>

                <Text
                    style={{
                        textAlign: 'center',
                        marginBottom: 40,
                        lineHeight: 30,
                        color: Colors[ colorScheme ].text,
                    }}>
                    We the constituents of the
                    <Text>Provincial Population Office (PPO)</Text> , commit
                    ourselves to the following core values and endeavours to
                    LIVE <Text>IT</Text> :
                </Text>

                <Text style={styles.list}>
                    <Text style={styles.bold}>Love of Service </Text>– Love of
                    fellowmen expressed through service beyond self is the
                    over-arching principle that guides all other actions and
                    endeavours.
                </Text>

                <Text style={styles.list}>
                    <Text style={styles.bold}>Innovation</Text> – We believe
                    that the creation of new ideas ad initiative in the context
                    of our cultural heritage, is the noblest response to the
                    challenge of change in our communities.
                </Text>

                <Text style={styles.list}>
                    <Text style={styles.bold}>Vigor</Text> and Enthusiasm will
                    be our most profound expression of our commitment to our
                    vision, mission, and goals.
                </Text>
                <Text style={styles.list}>
                    <Text style={styles.bold}>Excellence</Text> – Our efforts
                    and actions will be guided by the highest standards of
                    quality and excellence.
                </Text>
                <Text style={styles.list}>
                    <Text style={styles.bold}>Integrity</Text> – We uphold the
                    principle of truth and honesty, realizing that in our
                    dealings, we are accountable to each other and to our
                    clients, partners, and stakeholders.
                </Text>

                <Text style={styles.list}>
                    <Text style={styles.bold}>Team Work</Text> – Given our
                    diverse talent and skills, we will work together to achieve
                    PPO goals.
                </Text>
                <View style={{ height: 150 }} />
            </ScrollView>
        </View>
    );
}

import Colors from '../../../../constants/Colors';

import useColorScheme from '../../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../../shared/back-container/back-container'; import DynamicSmallHeader from '../../../../shared/header/dynamic-small-header';

