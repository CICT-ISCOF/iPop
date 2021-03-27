import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NoInternet( props: any ) {
    const navigation = useNavigation();

    return (
        <View style={{
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'white'
        }}>
            <Text style={{ textAlign: 'center', fontSize: 20, padding: 50, color: 'gray', fontWeight: 'bold', marginTop: -100 }}>
                No Internet Connection
            </Text>
            <Image source={require( './assets/no-internet.png' )}
                style={{
                    alignSelf: 'center',
                    height: 200,
                    width: 200,
                    resizeMode: 'stretch'
                }}
            />
            <Text style={{ textAlign: 'center', fontSize: 20, padding: 50, color: 'gray', fontWeight: 'bold' }}>
                Please check your connection again or connect to Wi-Fi
            </Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
                style={{
                    marginHorizontal: 50,
                    backgroundColor: '#5B80F3',
                    padding: 20,
                    borderRadius: 30,
                    shadowColor: "#5B80F3",
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.55,
                    shadowRadius: 3.84,

                    elevation: 5,

                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>Retry</Text>
            </TouchableOpacity>
        </View>
    );
}
