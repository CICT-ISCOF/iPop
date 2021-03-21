import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons';
import styles from './pop-data.style';
import { FontAwesome } from '@expo/vector-icons';
import Selects from './select';
import TopPopulated from './top-populated';

export default function PopulationData() {
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
                    Populaton Data
                </Text>
                <Text
                    style={[
                        styles.chartTitle,
                        {
                            color: Colors[colorScheme].text,
                        },
                    ]}>
                    Province of Iloilo
                </Text>
                <View style={styles.separator}></View>
                <Selects />
                <TopPopulated />
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

import Colors from '../../constants/Colors';

import useColorScheme from '../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import SearchNav from '../main/home/components/search/search';
import BackContainer from '../../shared/back-container/back-container';
import TopPadding from '../../shared/top-padding/top-padding';
