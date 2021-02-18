export default function Selects() {
    const colorScheme = useColorScheme();

    const [data, setData] = useState([]);
    const [year, setYear] = useState('');

    const [municipalities, setMunicipalities] = useState([]);
    const [municipality, setMunicipality] = useState(1);
    const [municipalityName, setMunicipalityName] = useState('');

    const [barangays, setBarangays] = useState([]);
    const [barangay, setBarangay] = useState('');
    const [visible, setVisibility] = useState(false);

    const [males, setMales] = useState([
        {
            Females: 1,
        },
    ]);
    const [females, setFemales] = useState([
        {
            Females: 1,
        },
    ]);

    const baseURL = base.apiURL + 'location';

    useEffect(() => {
        async function getMunicipalities() {
            const url = baseURL + '/municipalities?province_code=0630';
            axios.get(url).then((response) => {
                setMunicipalities(response.data);
            });
        }
        getMunicipalities();
    }, []);

    async function getBarangays(municipality_code: any) {
        setMunicipality(municipality_code);
        let url = baseURL + '/barangays?municipality_code=' + municipality_code;
        axios.get(url).then((response) => {
            setBarangays(response.data);
            url = `${baseURL}/municipality-code?municipality_code=${municipality_code}`;
            axios.get(url).then((response) => {
                setMunicipalityName(response.data.name);
            });
        });
    }

    async function filter() {
        const data = {
            municipality: municipalityName,
            barangay: barangay,
            year: year,
        };

        if (municipalityName == '' || barangay == '' || year == '') {
            return alert('Complete filters to perform this operation');
        }
        const url =
            base.apiURL +
            'statistic-profiles' +
            `?municipality=${data['municipality']}&barangay=${data['barangay']}&year=${data['year']}`;
        axios.get(url).then((response) => {
            if (response.data.length != 0) {
                setData(response.data);
                setVisibility(true);
                getPyramidData();
            } else {
                alert('No data on this filter');
                setVisibility(false);
            }
        });
    }

    async function getPyramidData() {
        let malesArray: any = [];
        let femalesArray: any = [];
        const url =
            base.apiURL +
            'population-pyramid' +
            `?year=${year}&barangay=${barangay}`;
        axios
            .get(url)
            .then((response) => {
                let maleData = response.data[0]['data']['female'];
                let femaleData = response.data[0]['data']['male'];
                for (let key in maleData) {
                    malesArray.push({ Females: maleData[key] });
                }
                for (let key in femaleData) {
                    femalesArray.push({ Females: femaleData[key] });
                }
                setMales(malesArray);
                console.log(malesArray);
                setFemales(femalesArray);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Picker
                    style={{ flex: 1.8, marginTop: -30 }}
                    selectedValue={municipality}
                    onValueChange={(itemValue: any, itemIndex) =>
                        getBarangays(itemValue)
                    }>
                    <Picker.Item label='Municipality' value='Municipality' />

                    {municipalities.map((municipality: any, index: any) => {
                        return (
                            <Picker.Item
                                key={index}
                                label={municipality.name}
                                value={municipality.code}
                                color={Colors[colorScheme].text}
                            />
                        );
                    })}
                </Picker>

                <Picker
                    style={{ flex: 1.5, marginTop: -30 }}
                    selectedValue={barangay}
                    onValueChange={(itemValue: any, itemIndex) =>
                        setBarangay(itemValue)
                    }>
                    <Picker.Item label='Barangay' value='Barangay' />
                    {barangays.map((barangay: any, index: any) => {
                        return (
                            <Picker.Item
                                key={index}
                                label={barangay.name}
                                value={barangay.name}
                                color={Colors[colorScheme].text}
                            />
                        );
                    })}
                </Picker>

                <TextInput
                    keyboardType='numeric'
                    onChangeText={(text) => {
                        setYear(text);
                    }}
                    style={[
                        styles.TextInput,
                        {
                            borderColor: Colors[colorScheme].border,
                            color: Colors[colorScheme].text,
                        },
                    ]}
                    placeholder='Year'
                />
            </View>

            <TouchableOpacity
                onPress={() => {
                    filter();
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
            <PyramidChart males={males} females={females} />
            <PopProfile visibility={visible} data={data} />
        </View>
    );
}

import Colors from '../../constants/Colors';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base from '../../constants/Api';
import styles from './pop-data.style';
import PopProfile from './pop-profile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import { Picker } from '@react-native-community/picker';
import PyramidChart from './pop-pyramid';
