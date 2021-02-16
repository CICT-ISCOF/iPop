import TopPadding from '../../../shared/top-padding/top-padding';

export default function PMOCData() {
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
                    Pre-Marraige Orrientation and Counseling
                </Text>
                <PMOCSelects />
            </ScrollView>
        </View>
    );
}
import PMOCSummary from './pmoc.summary';
import PMOCSelects from './pmoc.select';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import SearchNav from '../../main/home/components/search/search';
import BackContainer from '../../../shared/back-container/back-container';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './pmoc.style';
