import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './nav.style';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import Header from '../../../shared/header/header';
import { View, Text, TouchableOpacity } from 'react-native';
import SearchNav from '../../../screens/main/home/components/search/search';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import TopPadding from '../../../shared/top-padding/top-padding';
import { useNavigation } from '@react-navigation/native';

export default function AboutScreen() {
    const navigation = useNavigation();

    const colorScheme = useColorScheme();

    const navs: any = [
        {
            title: 'Mandate',
            route: 'Mandate',
            id: 1,
            icon: 'hand-right',
            color: '#F1CCB0',
        },
        {
            title: 'Mission/Vision',
            route: 'MissionVIsion',
            id: 2,
            icon: 'clock-check',
            color: '#02ADA3',
        },
        {
            title: 'Core Values',
            route: 'CoreValues',
            id: 3,
            icon: 'shield-lock',
            color: '#1086FE',
        },
        {
            title: 'Goals',
            route: 'Goals',
            id: 4,
            icon: 'handball',
            color: '#A30045',
        },
        {
            title: 'Org-Structure',
            route: 'OrgStructure',
            id: 5,
            icon: 'account-network',
            color: '#02A1C7',
        },
        {
            title: 'Directory',
            route: 'Directory',
            id: 6,
            icon: 'account-group-outline',
            color: 'red',
        },
        {
            title: 'Services',
            route: 'Services',
            id: 7,
            icon: 'room-service',
            color: 'blue',
        },
        {
            title: 'Awards',
            route: 'Awards',
            id: 8,
            icon: 'trophy-award',
            color: 'orange',
        },
        {
            title: 'Contact Us',
            route: 'ContactUs',
            id: 9,
            icon: 'cellphone-iphone',
            color: Colors[ colorScheme ].text,
        },
    ];

    const renderNav = ( data: any ) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigate( data.item.route );
                }}
                style={[
                    styles.navs,
                    { backgroundColor: Colors[ colorScheme ].background },
                ]}>
                <MaterialCommunityIcons
                    style={styles.navIons}
                    name={data.item.icon}
                    size={50}
                    color={data.item.color}
                />
                <View style={styles.navButton}>
                    <Text style={styles.navButtonText}>{data.item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const navigate = ( location: any ) => {
        navigation.navigate( location );
    };

    return (
        <View style={[ styles.container, { padding: 0 } ]}>
            <TopPadding />
            <ScrollView
                style={[
                    styles.container,
                    { backgroundColor: Colors[ colorScheme ].bg1, },
                ]}>
                <SearchNav />
                <Text
                    style={[ styles.menu, { color: Colors[ colorScheme ].text } ]}>
                    About Us
                </Text>

                <Header />

                {/* ----------navs----------- */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                    renderItem={renderNav}
                    data={navs}
                    numColumns={3}
                    keyExtractor={navs.item.id}
                />

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}
