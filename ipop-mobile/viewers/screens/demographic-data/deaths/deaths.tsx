export default function Deaths() {
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
                    Deaths
                </Text>

                <DeathsSelects />
            </ScrollView>
        </View>
    );
}
import TotalDataDeaths from './deaths..total-data';
import DeathsSelects from './deaths.selects';
import DeathSummary from './deaths..summary';
import styles from './deaths.style';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import SearchNav from '../../main/home/components/search/search';
import BackContainer from '../../../shared/back-container/back-container';
import TopPadding from '../../../shared/top-padding/top-padding';
