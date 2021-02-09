import * as React from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import styles from './header.style';

import { View, Text, Image } from 'react-native';

export default function Header() {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.mainContianer}>
            <View style={styles.images}>
                <Image
                    style={styles.iloilo}
                    source={require('../../assets/logo/iloilo-seal.png')}
                />
                <Image
                    style={styles.ipop}
                    source={require('../../assets/logo/ipo-logo.png')}
                />
            </View>
            <View style={styles.texts}>
                <Text
                    style={[styles.text, { color: Colors[colorScheme].text }]}>
                    Republic of the Philippines
                </Text>
                <Text
                    style={[styles.text, { color: Colors[colorScheme].text }]}>
                    Province of Iloilo
                </Text>
                <Text style={styles.title}>Provincial Population Office</Text>
            </View>
        </View>
    );
}
