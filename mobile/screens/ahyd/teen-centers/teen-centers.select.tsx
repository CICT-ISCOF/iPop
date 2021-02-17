export default function TeenCentersSelects() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [district, setDistrict] = useState('');
    const [isFetching, setFetching] = useState(false);

    async function getTeenCenter() {
        if (district == '' || district == 'District') {
            return alert('Complete filters to perform this operation');
        }
        setFetching(true);
        const url = base.apiURL + `sbmptcs`;
        axios
            .get(url)
            .then((response) => {
                if (response.data.length != 0) {
                    navigation.navigate('TeenCenterList', {
                        data: response.data[district],
                        number: district,
                    });
                    setFetching(false);
                } else {
                    alert('No data on this filter');
                    setFetching(false);
                }
            })
            .catch((error) => {
                alert('No data on this filter');
                console.error(error);
                setFetching(false);
            });
    }

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Picker
                    style={{ flex: 1, marginTop: -30 }}
                    selectedValue={district}
                    onValueChange={(itemValue: any, itemIndex) =>
                        setDistrict(itemValue)
                    }>
                    <Picker.Item
                        color={Colors[colorScheme].text}
                        label='District'
                        value='District'
                    />
                    <Picker.Item
                        color={Colors[colorScheme].text}
                        label='I'
                        value='I'
                    />
                    <Picker.Item
                        color={Colors[colorScheme].text}
                        label='II'
                        value='II'
                    />
                    <Picker.Item
                        color={Colors[colorScheme].text}
                        label='III'
                        value='III'
                    />
                    <Picker.Item
                        color={Colors[colorScheme].text}
                        label='IV'
                        value='IV'
                    />
                </Picker>
            </View>

            <TouchableOpacity
                onPress={() => {
                    getTeenCenter();
                }}
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

            <Text
                style={[
                    {
                        textAlign: 'center',
                        marginTop: '20%',
                    },
                    isFetching == true
                        ? {}
                        : { position: 'absolute', left: -500 },
                ]}>
                Fetching Data on Distring {district}...
            </Text>
        </View>
    );
}
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './teen-centerss.style';
import axios from 'axios';
import base from '../../../constants/Api';
