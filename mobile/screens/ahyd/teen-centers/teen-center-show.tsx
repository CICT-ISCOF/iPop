import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './teen-centerss.style';
import ServiceOfferedTeenCenters from './services-offered';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import BackContainer from '../../../shared/back-container/back-container';
import TopPadding from '../../../shared/top-padding/top-padding'; import MapScreen from '../../../shared/maps/maps';
import DynamicSmallHeader from '../../../shared/header/dynamic-small-header';

export default function ShowTeenCenter( { route }: any ) {
    const { data } = route.params;
    const colorScheme = useColorScheme();

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
                <DynamicSmallHeader text={data.name} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={( event ) => {
                    scrollHandler( event )
                }}
                style={[ styles.container, { backgroundColor: Colors[ colorScheme ].homeBG, }, ]}>

                <View style={show != true ? {} : { position: 'absolute', left: -500 }}>
                    <BackContainer />
                    <Text
                        style={[ styles.menu, { color: Colors[ colorScheme ].text } ]}>
                        {data.name}
                    </Text>
                    <Text
                        style={{
                            color: 'gray',
                            marginLeft: 10,
                            margin: -5,
                            textAlign: 'center',
                        }}>
                        {data.municipality}
                    </Text>
                </View>


                <MapScreen change={data.municipality + " Iloilo"} />

                <ServiceOfferedTeenCenters data={data} />

                <View style={{ height: 50 }} />
            </ScrollView>
        </View>
    );
}
