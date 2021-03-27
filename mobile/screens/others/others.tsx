import Links from './links';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../shared/back-container/back-container';
import React from 'react';
import { Text } from 'react-native';
import styles from './links.style';
import TopPadding from '../../shared/top-padding/top-padding';
import { View } from '../../components/Themed';
import DynamicSmallHeader from '../../shared/header/dynamic-small-header';

export default function Others() {

    const [ show, setShow ] = React.useState( false )
    function scrollHandler( event: any ) {
        if ( event.nativeEvent.contentOffset.y < 1 ) {
            setShow( false )
        } else {
            setShow( true )
        }
    }

    const colorScheme = useColorScheme();
    return (
        <View style={[ styles.container, { padding: 0 } ]}>
            <TopPadding />
            <View style={show == true ? {} : { position: 'absolute', left: -500 }}>
                <DynamicSmallHeader text="Other Links for Press Releases" />
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
                        Other Links for Press Releases
                    </Text>
                </View>
                <Links />
            </ScrollView>
        </View>
    );
}


