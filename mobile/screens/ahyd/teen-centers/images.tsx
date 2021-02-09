const styles = StyleSheet.create({
    scrollview: {
        height: 200,
        width: '100%',
    },
    image: {
        height: '100%',
        width: 300,
        resizeMode: 'stretch',
        borderWidth: 3,
        borderColor: 'rgba(150,150,150,0.9)',
    },
});

export default function TeenCenterImages() {
    return (
        <View>
            <ScrollView
                horizontal={true}
                style={[
                    styles.scrollview,
                    { backgroundColor: 'rgba(150,150,150,0.9)' },
                ]}>
                <Image
                    style={styles.image}
                    source={require('../../../assets/IPOP/Iloilo-Provincial-Capitol-Panay-News-2.jpg')}
                />
                <Image
                    style={styles.image}
                    source={require('../../../assets/IPOP/2019-Kaunlarang-Pantao-Award-for-Best-Provincial-Population-Office-696x467.jpg')}
                />

                <Image
                    style={styles.image}
                    source={require('../../../assets/IPOP/Org-Chart-Employee-Roles-In-Organization.png')}
                />
            </ScrollView>
        </View>
    );
}

import React from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
