import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IssuesAndConcerns() {
    const colorScheme = useColorScheme();
    return (
        <View style={[ styles.container, { padding: 0 } ]}>
            <TopPadding />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[
                    styles.container,
                    {
                        backgroundColor: Colors[ colorScheme ].background,
                    },
                ]}>
                <BackContainer hidden={true} />
                <Text
                    style={[ styles.menu, { color: Colors[ colorScheme ].text } ]}>
                    Issues and Concerns
                </Text>
                <Text>Comming Soon...</Text>
            </ScrollView>
        </View>
    );
}

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../shared/back-container/back-container';
import TopPadding from '../../../shared/top-padding/top-padding';

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
    },
    menu: {
        fontWeight: '700',
        fontSize: 35,
        width: '70%',
    },
} );
