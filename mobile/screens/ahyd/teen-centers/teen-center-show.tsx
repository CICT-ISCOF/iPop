import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function ShowTeenCenter({ route }: any) {
    const { data } = route.params;
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
                <BackContainer hidden={true} />
                <Text
                    style={{
                        color: Colors[colorScheme].text,
                        fontWeight: '700',
                        fontSize: 25,
                        margin: 10,
                        marginTop: 50,
                        textAlign: 'center',
                    }}>
                    {data.name}
                </Text>
                <Text
                    style={{
                        color: '#02A1C7',
                        marginLeft: 10,
                        margin: -5,
                        textAlign: 'center',
                    }}>
                    {data.municipality}
                </Text>

                <MapScreen change={data.municipality + " Iloilo"} />

                <ServiceOfferedTeenCenters data={data} />

                <View style={{ height: 50 }} />
            </ScrollView>
        </View>
    );
}
import styles from './teen-centerss.style';

import ServiceOfferedTeenCenters from './services-offered';
import TeenCenterImages from './images';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import BackContainer from '../../../shared/back-container/back-container';
import TopPadding from '../../../shared/top-padding/top-padding'; import MapScreen from '../../../shared/maps/maps';

