import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function BackContainer( props: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const styles = StyleSheet.create( {
        buttonContainer: {
            borderRadius: 50,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.32,
            shadowRadius: 3.46,
            elevation: 2,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors[ colorScheme ].background,
            marginBottom: 10,
        },
    } );

    const back = () => {
        navigation.goBack();
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    back();
                }}
                style={styles.buttonContainer}>
                <MaterialIcons
                    name='close'
                    size={20}
                    color={Colors[ colorScheme ].text1}
                />
            </TouchableOpacity>
        </View>
    );
}
