import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopPadding from '../../../../shared/top-padding/top-padding';

export default function ContactUs() {
    const colorScheme = useColorScheme();
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
                    Contact Us
                </Text>

                <View style={{ alignItems: 'flex-start' }}>
                    <View style={styles.contacts}>
                        <View
                            style={[
                                styles.iconHolder,
                                { backgroundColor: '#EDC333' },
                            ]}>
                            <Feather name='phone' size={24} color='white' />
                        </View>
                        <Text
                            style={{
                                color: Colors[colorScheme].text,
                            }}>
                            (033) 509 5081 | 328 7913
                        </Text>
                    </View>

                    <View style={styles.contacts}>
                        <View
                            style={[
                                styles.iconHolder,
                                { backgroundColor: '#425B89' },
                            ]}>
                            <FontAwesome
                                name='facebook-f'
                                size={24}
                                color='white'
                            />
                        </View>
                        <Text
                            style={{
                                color: Colors[colorScheme].text,
                            }}>
                            PPO Iloilo
                        </Text>
                    </View>

                    <View style={styles.contacts}>
                        <View
                            style={[
                                styles.iconHolder,
                                { backgroundColor: '#AF381C' },
                            ]}>
                            <AntDesign name='mail' size={24} color='white' />
                        </View>
                        <Text
                            style={{
                                color: Colors[colorScheme].text,
                            }}>
                            ppo@iloilo.gov.phsvv
                        </Text>
                    </View>

                    <View style={styles.contacts}>
                        <View
                            style={[
                                styles.iconHolder,
                                { backgroundColor: '#44A6CB' },
                            ]}>
                            <AntDesign name='twitter' size={24} color='white' />
                        </View>
                        <Text
                            style={{
                                color: Colors[colorScheme].text,
                            }}>
                            ppo@iloilo
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Colors from '../../../../constants/Colors';
import SearchNav from '../../home/components/search/search';
import useColorScheme from '../../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../../shared/back-container/back-container';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
    },
    menu: {
        fontWeight: '700',
        fontSize: 35,
        width: '70%',
        marginBottom: 50,
    },
    contacts: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    iconHolder: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        borderRadius: 50,
    },
});
