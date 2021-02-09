import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MigrationsSelects() {
    const colorScheme = useColorScheme();
    return (
        // selectedValue={'Select Municipality'}
        // onValueChange={(itemValue, itemIndex) =>
        //     this.setState({language: itemValue})
        // }
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Picker style={{ flex: 1, marginTop: -30 }}>
                    <Picker.Item label='Municipa' value='Municipality' />
                    <Picker.Item label='Lagubang' value='Lagubang' />
                    <Picker.Item label='Ilaud' value='Ilaud' />
                </Picker>

                <Picker style={{ flex: 1, marginTop: -30 }}>
                    <Picker.Item label='Barangay' value='Barangay' />
                    <Picker.Item label='Lagubang' value='Lagubang' />
                    <Picker.Item label='Ilaud' value='Ilaud' />
                </Picker>

                <Picker style={{ flex: 1, marginTop: -30 }}>
                    <Picker.Item label='Year' value='Year' />
                    <Picker.Item label='Lagubang' value='Lagubang' />
                    <Picker.Item label='Ilaud' value='Ilaud' />
                </Picker>
            </View>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    borderRadius: 30,
                    backgroundColor: '#35A8FB',
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                    name='filter'
                    size={24}
                    color='rgba(250,250,250,.7)'
                />
                <Text style={{ color: 'white', marginLeft: 10 }}>Filter</Text>
            </TouchableOpacity>
        </View>
    );
}
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './migrations.style';
