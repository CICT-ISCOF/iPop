import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopPadding from '../../../../shared/top-padding/top-padding';

export default function Goals() {
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
            color: Colors[ colorScheme ].text,
            fontWeight: '500',
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
                <DynamicSmallHeader text="Goals" />
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
                        Goals
                    </Text>
                </View>

                <Text style={styles.list}>
                    To generate and maintain an efficient and reliable data bank
                    responsive to the data and information needs of the
                    population development programs of the Province of Iloilo;
                </Text>
                <Text style={styles.list}>
                    To provide updated data and information to support program
                    operations and development planning of LGUs, partner
                    agencies and other stakeholders;
                </Text>
                <Text style={styles.list}>
                    To undertake educational projects that promotes people’s
                    participation empowerment towards total human development in
                    the context of our cultural heritage;
                </Text>
                <Text style={styles.list}>
                    To apply new technologies and processes that will effect
                    more efficient and effective data generation, processing and
                    management.
                </Text>
            </ScrollView>
        </View>
    );
}

import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../../shared/back-container/back-container'; import DynamicSmallHeader from '../../../../shared/header/dynamic-small-header';

