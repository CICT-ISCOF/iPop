import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopPadding from '../../../shared/top-padding/top-padding';

export default function Migrations() {
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
                    Migrations
                </Text>
                <MigrationsSummary />
                <MigrationsSelects />
                <TotalDataMigrations />
            </ScrollView>
        </View>
    );
}
import TotalDataMigrations from './migrations.total-data';
import MigrationsSelects from './migrations.selects';
import MigrationsSummary from './migrations.summary';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import SearchNav from '../../main/home/components/search/search';
import BackContainer from '../../../shared/back-container/back-container';

import styles from './migrations.style';
