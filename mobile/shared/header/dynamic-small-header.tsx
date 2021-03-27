import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function DynamicSmallHeader( props: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    return (
        <View style={{
            flexDirection: 'row',
            paddingTop: 20,
            backgroundColor: Colors[ colorScheme ].homeBG,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(150,150,150,.2)'
            , paddingBottom: 10,
            paddingHorizontal: 20,
            alignItems: 'center'
        }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Ionicons name="arrow-back" size={20} color={Colors[ colorScheme ].text} />
            </TouchableOpacity>
            <Text
                style={{
                    color: Colors[ colorScheme ].text,
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginLeft: 20
                }}
            >{props.text}</Text>
        </View>
    );
}
