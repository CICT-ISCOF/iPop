import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MPCFDCsSelects() {
    const colorScheme = useColorScheme();

    const [data, setData] = useState([{ files: [] }]);

    const [municipalities, setMunicipalities] = useState([]);
    const [municipality, setMunicipality] = useState(1);
    const [municipalityName, setMunicipalityName] = useState('');
    const [district, setDistrict] = useState('');
    const [mpcName, SetMpcName] = useState('');
    const [mpcData, SetMpcData] = useState({ files: [] });
    const [mpcVisibility, setMpcVisibility] = useState(false);
    const [visible, setVisibility] = useState(false);

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
            url = `${baseURL}/municipality-code?municipality_code=${municipality_code}`;
            axios.get(url).then((response) => {
                setMunicipalityName(response.data.name);
            });
        });
    }

    async function filter() {
        const data = {
            municipality: municipalityName,
            district: district,
        };

        if (municipalityName == '' || district == '') {
            return alert('Complete filters to perform this operation');
        }
        const url =
            base.apiURL +
            `mpcfdcs?municipality=${data.municipality}&district=${data.district}`;
        axios
            .get(url)
            .then((response) => {
                if (response.data.length != 0) {
                    setData(response.data);
                    setVisibility(true);
                } else {
                    alert('No data on this filter');
                    setVisibility(false);
                    setMpcVisibility(false);
                }
            })
            .catch((error) => {
                alert('No data on this filter');
                console.error(error);
                setVisibility(false);
                setMpcVisibility(false);
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
                    style={{ flex: 1, marginTop: -30 }}
                    selectedValue={district}
                    onValueChange={(itemValue: any, itemIndex) =>
                        setDistrict(itemValue)
                    }>
                    <Picker.Item label='District' value='Municipality' />
                    <Picker.Item label='I' value='I' />
                    <Picker.Item label='II' value='II' />
                    <Picker.Item label='III' value='III' />
                    <Picker.Item label='IV' value='IV' />
                </Picker>
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

            {data.map((mpc: any, index: any) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.mpcs,
                            { backgroundColor: Colors[colorScheme].background },
                            mpc.name != undefined ? {} : { display: 'none' },
                        ]}
                        onPress={() => {
                            SetMpcData(mpc);
                            SetMpcName(mpc.name);
                            setMpcVisibility(true);
                            console.log(mpc.files);
                        }}>
                        <Text style={{ flex: 1 }}>{mpc.name}</Text>
                        <Text style={{ flex: 1, color: '#02A1C7' }}>
                            {mpc.location}
                        </Text>
                    </TouchableOpacity>
                );
            })}

            <MPCFDCImages visiblity={mpcVisibility} data={mpcData} />
            <ServiceOfferedMPCFDC visiblity={mpcVisibility} data={mpcData} />
        </View>
    );
}
import ServiceOfferedMPCFDC from './services-offered';
import MPCFDCImages from './images';
import Colors from '../../../constants/Colors';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base from '../../../constants/Api';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import { Ionicons } from '@expo/vector-icons';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './mpc-fdc.style';
