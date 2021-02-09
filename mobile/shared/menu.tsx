import * as React from 'react';
import styles from './menu.style';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { View, Text, Image, ScrollView } from 'react-native';
import Menus from './menus';
import SearchNav from '../screens/main/home/components/search/search';
import TopPadding from './top-padding/top-padding';

export default function MenuScreen() {
    const colorScheme = useColorScheme();

    return (
        <View style={[styles.container, { padding: 0 }]}>
            <TopPadding />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[
                    styles.container,
                    {
                        backgroundColor: Colors[colorScheme].bg1,
                    },
                ]}>
                <SearchNav />
                <Text
                    style={[styles.menu, { color: Colors[colorScheme].text }]}>
                    Menu
                </Text>
                <View style={styles.listContianer}>
                    <Image
                        style={styles.image}
                        source={require('../assets/avatars/boy-blue.png')}
                    />
                    <View style={styles.texts}>
                        <Text
                            style={[
                                styles.name,
                                ,
                                { color: Colors[colorScheme].text },
                            ]}>
                            Juan Dela Cruz
                        </Text>
                        <Text
                            style={[
                                styles.position,
                                ,
                                { color: Colors[colorScheme].text1 },
                            ]}>
                            Viewer
                        </Text>
                    </View>
                </View>
                <Menus />
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}
