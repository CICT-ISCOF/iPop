import Summary from './summary';
import BirthsSelects from './selects';
import MonthCharts from './month-charts';
import TotalData from './total-data';
import TeenageBirths from './teenage-births-charts';
import IllegitimateBirths from './illegitimate-births-charts';

export default function Births() {
    const colorScheme = useColorScheme();
    return (
        <View style={[styles.container, { padding: 0 }]}>
            <TopPadding />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[
                    styles.container,
                    {
                        backgroundColor: Colors[colorScheme].background,
                    },
                ]}>
                <BackContainer hidden={true} />
                <Text
                    style={[styles.menu, { color: Colors[colorScheme].text }]}>
                    Births
                </Text>

                <BirthsSelects />
                <View style={{ height: 150 }} />
            </ScrollView>
        </View>
    );
}
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import SearchNav from '../../main/home/components/search/search';
import BackContainer from '../../../shared/back-container/back-container';
import styles from './births.style';
import TopPadding from '../../../shared/top-padding/top-padding';
