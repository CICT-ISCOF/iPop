export default function Others() {
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
                    Others
                </Text>
                <Links />
            </ScrollView>
        </View>
    );
}

import Links from './links';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import SearchNav from '../main/home/components/search/search';
import BackContainer from '../../shared/back-container/back-container';
import React from 'react';
import { Text } from 'react-native';
import styles from './links.style';
import TopPadding from '../../shared/top-padding/top-padding';
import { View } from '../../components/Themed';
