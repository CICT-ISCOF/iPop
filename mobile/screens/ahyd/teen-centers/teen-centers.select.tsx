export default function TeenCentersSelects() {
    const colorScheme = useColorScheme();
    return (
        // selectedValue={'Select Municipality'}
        // onValueChange={(itemValue, itemIndex) =>
        //     this.setState({language: itemValue})
        // }
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Picker style={{ flex: 1, marginTop: -30 }}>
                    <Picker.Item label='District' value='Municipality' />
                    <Picker.Item label='I' value='I' />
                    <Picker.Item label='II' value='II' />
                    <Picker.Item label='III' value='III' />
                    <Picker.Item label='IV' value='IV' />
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

            <Picker style={{ flex: 1, marginTop: -30 }}>
                <Picker.Item
                    label=' Guimbal National High School '
                    value='Guimbal'
                />
                <Picker.Item
                    label='Young Savers Teen Center '
                    value='Igbaras'
                />
            </Picker>
        </View>
    );
}

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './teen-centerss.style';
