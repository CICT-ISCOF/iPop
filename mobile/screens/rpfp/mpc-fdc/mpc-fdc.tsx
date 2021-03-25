import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopPadding from '../../../shared/top-padding/top-padding';
import MPCFDCsSelects from './mpc-fdc-select';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../shared/back-container/back-container';

import styles from './mpc-fdc.style';


export default function MPCFDC() {
    const colorScheme = useColorScheme();
    return (
        <View style={[ styles.container, { padding: 0 } ]}>
            <TopPadding />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[
                    styles.container,
                    {
                        backgroundColor: Colors[ colorScheme ].background,
                    },
                ]}>
                <BackContainer hidden={true} />
                <Text
                    style={[ styles.menu, { color: Colors[ colorScheme ].text } ]}>
                    Multi-purpose Counseling and Family Development Center
                </Text>
                <MPCFDCsSelects />
                <View style={{ height: 150 }} />
            </ScrollView>
        </View>
    );
}
