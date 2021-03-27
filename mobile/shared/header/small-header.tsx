import React from 'react';
import { View, Text, Image } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export default function SmallHeader() {
    const colorScheme = useColorScheme();

    return (
        <View style={{
            flexDirection: 'row',
            paddingTop: 20,
            backgroundColor: Colors[ colorScheme ].homeBG,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(150,150,150,.2)'
            , paddingBottom: 10,
            paddingLeft: 30,
            alignItems: 'center'
        }}>
            <Image
                style={{
                    height: 30,
                    width: 30,
                    marginRight: 10
                }}
                source={require( '../../assets/logo/iloilo-seal.png' )}
            />
            <Image
                style={{
                    height: 30,
                    width: 30,
                    marginRight: 10

                }}
                source={require( '../../assets/logo/ipo-logo.png' )}
            />
            <Text
                style={{
                    color: Colors[ colorScheme ].text,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}
            >Provincial Population Office</Text>
        </View>
    );
}
