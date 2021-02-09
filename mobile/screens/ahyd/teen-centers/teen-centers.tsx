import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TeenCenters() {
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
                    Teen Centers
                </Text>
                <TeenCentersSelects />
                <TeenCenterImages />
                <ServiceOfferedTeenCenters />
                <View style={{ height: 150 }} />
            </ScrollView>
        </View>
    );
}
import ServiceOfferedTeenCenters from './services-offered';
import TeenCenterImages from './images';
import TeenCentersSelects from './teen-centers.select';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import SearchNav from '../../main/home/components/search/search';
import BackContainer from '../../../shared/back-container/back-container';

import styles from './teen-centerss.style';
import TopPadding from '../../../shared/top-padding/top-padding';
