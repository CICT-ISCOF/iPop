export default function PMOCSelects() {
    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Picker style={{ flex: 1, marginTop: -30 }}>
                    <Picker.Item label='Municipality' value='Municipality' />
                    <Picker.Item label='Barotac NUevo' value='Barotac NUevo' />
                    <Picker.Item label='Ilaud' value='Ilaud' />
                </Picker>

                <Picker style={{ flex: 1, marginTop: -30 }}>
                    <Picker.Item label='Year' value='Year' />
                    <Picker.Item label='2015' value='2015' />
                    <Picker.Item label='2016' value='2016' />
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
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
