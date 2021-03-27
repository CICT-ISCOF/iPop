import React from 'react';
import { View, Text } from 'react-native';
import TeenCentersSelects from './teen-centers.select';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../shared/back-container/back-container';
import styles from './teen-centerss.style';
import TopPadding from '../../../shared/top-padding/top-padding';


export default function TeenCenters() {
    const colorScheme = useColorScheme();
    return (
        <View style={[ styles.container, { padding: 0 } ]}>
            <TopPadding />
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: Colors[ colorScheme ].homeBG,
                    },
                ]}>
                <BackContainer hidden={true} />
                <Text
                    style={[ styles.menu, { color: Colors[ colorScheme ].text } ]}>
                    Teen Centers
                </Text>
                <Text style={{ color: 'gray' }}>Swipe to Select District</Text>
                <TeenCentersSelects />
                <View style={{ height: 150 }} />
            </View>
        </View>
    );
}
