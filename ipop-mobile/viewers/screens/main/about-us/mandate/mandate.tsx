import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function MandateScreen() {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            paddingTop: 30,
        },
        menu: {
            fontWeight: '700',
            fontSize: 35,
            marginBottom: 50,
        },
        list: {
            padding: 10,
            borderBottomWidth: 1,
            color: Colors[colorScheme].text,
            lineHeight: 30,
        },
    });

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
                <BackContainer hidden={true} />
                <Text
                    style={[styles.menu, { color: Colors[colorScheme].text }]}>
                    Mandate
                </Text>
                <Text style={{ marginBottom: 30, color: '#356F81' }}>
                    (Local Government Code of 1991, Sec. 488)
                </Text>

                <Text style={styles.list}>
                    Formulate measures for the consideration of the sanggunian
                    and provide technical assistance and support to the governor
                    or mayor, as the case may be, in carrying out measures to
                    ensure the delivery of basic services and provision of
                    adequate facilities relative to the integration of the
                    population development principles and in providing access to
                    said services and facilities.
                </Text>
                <Text style={styles.list}>
                    Develop plans and strategies and upon approval thereof by
                    the governor or mayor, as the case may be, implement the
                    same, particularly those which have to do with the
                    integration of population development principles and methods
                    in programs and projects which the governor or mayor is
                    empowered to implement and which sanggunian is empowered to
                    provide for under this Code.
                </Text>
                <Text style={styles.list}>
                    In addition to the foregoing duties and function, the
                    Population Office shall:{' '}
                </Text>

                <Text style={styles.list}>
                    Assist the governor or mayor, as the case may be, in the
                    implementation of the constitutional provisions relative to
                    population development and the promotion of responsible
                    parenthood
                </Text>
                <Text style={styles.list}>
                    To establish and maintain an updated population data bank
                    for program operations, development planning, and an
                    educational program to ensure the people’s participation in
                    and understanding of population development.
                </Text>
                <Text style={styles.list}>
                    Implement appropriate training programs responsive to the
                    cultural heritage of the inhabitants;
                </Text>
                <View style={{ height: 150 }} />
            </ScrollView>
        </View>
    );
}

import Colors from '../../../../constants/Colors';
import SearchNav from '../../home/components/search/search';
import useColorScheme from '../../../../hooks/useColorScheme';
import BackContainer from '../../../../shared/back-container/back-container';
import TopPadding from '../../../../shared/top-padding/top-padding';
