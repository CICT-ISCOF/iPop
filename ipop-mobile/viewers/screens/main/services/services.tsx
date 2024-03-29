export default function Services() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const navigate = (params: any) => {
        navigation.navigate('ShowServices', { data: params });
    };

    return (
        <View style={[styles.container, { padding: 0 }]}>
            <TopPadding />
            <ScrollView
                style={[
                    styles.container,
                    {
                        backgroundColor: Colors[colorScheme].bg1,
                    },
                ]}>
                <BackContainer hidden={true} />
                <Text
                    style={[styles.menu, { color: Colors[colorScheme].text }]}>
                    Services Offered
                </Text>

                <TouchableOpacity
                    onPress={() => {
                        navigate(1);
                    }}
                    style={[
                        styles.button,
                        { backgroundColor: Colors[colorScheme].background },
                    ]}>
                    <FontAwesome5 name='people-carry' size={24} color='red' />
                    <Text
                        style={[
                            styles.buttonText,
                            { color: Colors[colorScheme].text },
                        ]}>
                        Responsible Parenthood and Family Planning
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigate(2);
                    }}
                    style={[
                        styles.button,
                        { backgroundColor: Colors[colorScheme].background },
                    ]}>
                    <FontAwesome name='stethoscope' size={35} color='#02A1C7' />
                    <Text
                        style={[
                            styles.buttonText,
                            { color: Colors[colorScheme].text },
                        ]}>
                        Adolescent Health and Youth Development
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigate(4);
                    }}
                    style={[
                        styles.button,
                        { backgroundColor: Colors[colorScheme].background },
                    ]}>
                    <MaterialIcons
                        name='data-usage'
                        size={24}
                        color='#3EA662'
                    />
                    <Text
                        style={[
                            styles.buttonText,
                            { color: Colors[colorScheme].text },
                        ]}>
                        Population Data Managment
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigate(3);
                    }}
                    style={[
                        styles.button,
                        { backgroundColor: Colors[colorScheme].background },
                    ]}>
                    <Ionicons name='ios-people' size={24} color='orange' />
                    <Text
                        style={[
                            styles.buttonText,
                            { color: Colors[colorScheme].text },
                        ]}>
                        Population Development and Integration
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import Colors from '../../../constants/Colors';
import SearchNav from '../home/components/search/search';
import useColorScheme from '../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../shared/back-container/back-container';
import styles from './service.style';
import TopPadding from '../../../shared/top-padding/top-padding';
