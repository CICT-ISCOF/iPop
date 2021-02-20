import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DeathsSelects() {
    const colorScheme = useColorScheme();
    const [data, setData] = useState([]);
    const [year, setYear] = useState('');

    const [municipalities, setMunicipalities] = useState([]);
    const [municipality, setMunicipality] = useState(1);
    const [municipalityName, setMunicipalityName] = useState('');

    const [barangays, setBarangays] = useState([]);
    const [barangay, setBarangay] = useState('');
    const [visible, setVisibility] = useState(false);
    const [summary, setSummary] = useState({});
    const [birthData, setBirthData] = useState({});

    const baseURL = base.apiURL + 'location';

    const [monthData, setmonthData] = useState({});
    const [lineChartData, setlineChartData] = useState({});

    useEffect(() => {
        async function getMunicipalities() {
            const url = baseURL + '/municipalities?province_code=0630';
            axios.get(url).then((response) => {
                setMunicipalities(response.data);
            });
        }
        async function getSummary() {
            const url = base.apiURL + 'death-statistics/summary';
            axios.get(url).then((response) => {
                setSummary(response.data);
            });
        }

        getSummary();
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
        let total: any = [];
        let males: any = [];
        let females: any = [];
        let crudeDeathRate: any = [];

        const url =
            base.apiURL +
            'death-statistics?' +
            `?municipality=${data['municipality']}&barangay=${data['barangay']}&year=${data['year']}`;
        axios.get(url).then((response) => {
            if (response.data.data != null) {
                setBirthData(response.data.data);
                setVisibility(true);
                for (let key in response.data.month) {
                    total.push(response.data.month[key]['total']);
                    males.push(response.data.month[key]['males']);
                    females.push(response.data.month[key]['males']);
                }
                setmonthData({
                    total: total,
                    males: males,
                    female: females,
                });
                for (let key in response.data.incidence) {
                    crudeDeathRate.push({
                        value: response.data.incidence[key]['value'],
                        year: response.data.incidence[key]['year'],
                    });
                }
                setlineChartData({
                    crudeDeathRate: crudeDeathRate,
                });
            } else {
                alert('No data on this filter');
                setVisibility(false);
            }
        });
    }
    return (
        <View>
            <DeathSummary data={summary} />
            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[colorScheme].text,
                        marginLeft: -0,
                    },
                ]}>
                Filter By Location
            </Text>
            <View style={[styles.separator, { marginLeft: -20 }]}></View>
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
            <TotalDataDeaths visibility={visible} data={birthData} />

            <MonthCharts
                barangay={barangay}
                municipalityName={municipalityName}
                visibility={visible}
                monthData={monthData}
            />
            <CrudeDeathRate
                visibility={visible}
                lineChartData={lineChartData}
                barangay={barangay}
                municipalityName={municipalityName}
            />
            <View
                style={{
                    height: 150,
                }}
            />
        </View>
    );
}

import axios from 'axios';
import base from '../../../constants/Api';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import { Ionicons } from '@expo/vector-icons';

import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './deaths.style';
import DeathSummary from './deaths..summary';
import TotalDataDeaths from './deaths..total-data';
import MonthCharts from '../deaths/deaths..month-charts';
import CrudeDeathRate from './crude-death-rate-chart';
