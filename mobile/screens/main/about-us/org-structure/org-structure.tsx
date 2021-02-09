export default function OrgStructure() {
    const colorScheme = useColorScheme();
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        async function fetchData() {
            axios.get(base.apiURL + base.orgStructure).then((response) => {
                setPhoto(response.data.photo.uri);
            });
        }

        fetchData();
    }, []);

    return (
        <View style={[styles.container, { padding: 0 }]}>
            <TopPadding />
            <ScrollView
                style={[
                    styles.container,
                    {
                        backgroundColor: Colors[colorScheme].background,
                    },
                ]}>
                <BackContainer hidden={true} />
                <Text
                    style={[styles.menu, { color: Colors[colorScheme].text }]}>
                    Organizational Structure
                </Text>
                <Image style={styles.image} source={{ uri: photo }} />
            </ScrollView>
        </View>
    );
}
import axios from 'axios';
import base from '../../../../constants/Api';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../../../../constants/Colors';
import SearchNav from '../../home/components/search/search';
import useColorScheme from '../../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../../shared/back-container/back-container';
import TopPadding from '../../../../shared/top-padding/top-padding';

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
    image: {
        width: '100%',
        alignSelf: 'center',
        height: '200%',
        resizeMode: 'stretch',
    },
});
