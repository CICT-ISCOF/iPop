// import { TouchableOpacity } from 'react-native-gesture-handler';

// export default function BirthsSelects() {
//     const colorScheme = useColorScheme();
//     const [data, setData] = useState([]);
//     const [year, setYear] = useState('');

//     const [municipalities, setMunicipalities] = useState([]);
//     const [municipality, setMunicipality] = useState(1);
//     const [municipalityName, setMunicipalityName] = useState('');

//     const [barangays, setBarangays] = useState([]);
//     const [barangay, setBarangay] = useState('');
//     const [summary, setSummary] = useState({});
//     const [birthData, setBirthData] = useState({});

//     const [dataVisibility, setdataVisibility] = useState(false);

//     const baseURL = base.apiURL + 'location';

//     const [monthData, setmonthData] = useState({});
//     const [lineChartData, setlineChartData] = useState({});

//     useEffect(() => {
//         async function getMunicipalities() {
//             const url = baseURL + '/municipalities?province_code=0630';
//             axios.get(url).then((response) => {
//                 setMunicipalities(response.data);
//             });
//         }
//         async function getSummary() {
//             const url = base.apiURL + 'birth-statistics/summary';
//             axios.get(url).then((response) => {
//                 setSummary(response.data);
//             });
//         }

//         getSummary();
//         getMunicipalities();
//     }, []);

//     async function getBarangays(municipality_code: any) {
//         setMunicipality(municipality_code);
//         let url = baseURL + '/barangays?municipality_code=' + municipality_code;
//         axios.get(url).then((response) => {
//             setBarangays(response.data);
//             url = `${baseURL}/municipality-code?municipality_code=${municipality_code}`;
//             axios.get(url).then((response) => {
//                 setMunicipalityName(response.data.name);
//             });
//         });
//     }

//     async function filter() {
//         const data = {
//             municipality: municipalityName,
//             barangay: barangay,
//             year: year,
//         };

//         if (municipalityName == '' || barangay == '' || year == '') {
//             return alert('Complete filters to perform this operation');
//         }
//         const url =
//             base.apiURL +
//             'birth-statistics?' +
//             `?municipality=${data['municipality']}&barangay=${data['barangay']}&year=${data['year']}`;

//         let total: any = [];
//         let males: any = [];
//         let females: any = [];
//         let teenageBirths: any = [];
//         let illegitimateBirths: any = [];

//         axios.get(url).then((response) => {
//             if (response.data.data != null) {
//                 setBirthData(response.data.data);
//                 setdataVisibility(true);
//                 for (let key in response.data.month) {
//                     total.push(response.data.month[key]['total']);
//                     males.push(response.data.month[key]['males']);
//                     females.push(response.data.month[key]['males']);
//                 }
//                 setmonthData({
//                     total: total,
//                     males: males,
//                     female: females,
//                 });
//                 for (let key in response.data.incidence) {
//                     if (
//                         response.data.incidence[key]['title'] ==
//                         'INCIDENCE OF TEENAGE BIRTHS'
//                     ) {
//                         teenageBirths.push({
//                             value: response.data.incidence[key]['value'],
//                             year: response.data.incidence[key]['year'],
//                         });
//                     } else {
//                         illegitimateBirths.push({
//                             value: response.data.incidence[key]['value'],
//                             year: response.data.incidence[key]['year'],
//                         });
//                     }
//                 }
//                 setlineChartData({
//                     teenageBirths: teenageBirths,
//                     illegitimateBirths: illegitimateBirths,
//                 });
//             } else {
//                 alert('No data on this filter');
//                 setdataVisibility(false);
//             }
//         });
//     }

//     return (
//         <View>
//             <Summary data={summary} />
//             <Text
//                 style={[
//                     styles.chartTitle,
//                     {
//                         color: Colors[colorScheme].text,
//                         marginLeft: -0,
//                     },
//                 ]}>
//                 Filter By Location
//             </Text>
//             <View style={[styles.separator, { marginLeft: -20 }]}></View>

//             <View style={{ flexDirection: 'row' }}>
//                 <Picker
//                     style={{ flex: 1.8, marginTop: -30 }}
//                     selectedValue={municipality}
//                     onValueChange={(itemValue: any, itemIndex) =>
//                         getBarangays(itemValue)
//                     }>
//                     <Picker.Item
//                         label='Municipality'
//                         color={Colors[colorScheme].text}
//                         value='Municipality'
//                     />

//                     {municipalities.map((municipality: any, index: any) => {
//                         return (
//                             <Picker.Item
//                                 key={index}
//                                 label={municipality.name}
//                                 value={municipality.code}
//                                 color={Colors[colorScheme].text}
//                             />
//                         );
//                     })}
//                 </Picker>

//                 <Picker
//                     style={{ flex: 1.5, marginTop: -30 }}
//                     selectedValue={barangay}
//                     onValueChange={(itemValue: any, itemIndex) =>
//                         setBarangay(itemValue)
//                     }>
//                     <Picker.Item
//                         label='Barangay'
//                         color={Colors[colorScheme].text}
//                         value='Barangay'
//                     />
//                     {barangays.map((barangay: any, index: any) => {
//                         return (
//                             <Picker.Item
//                                 key={index}
//                                 label={barangay.name}
//                                 value={barangay.name}
//                                 color={Colors[colorScheme].text}
//                             />
//                         );
//                     })}
//                 </Picker>

//                 <TextInput
//                     keyboardType='numeric'
//                     onChangeText={(text) => {
//                         setYear(text);
//                     }}
//                     style={[
//                         styles.TextInput,
//                         {
//                             borderColor: Colors[colorScheme].border,
//                             color: Colors[colorScheme].text,
//                         },
//                     ]}
//                     placeholder='Year'
//                 />
//             </View>

//             <TouchableOpacity
//                 onPress={() => {
//                     filter();
//                 }}
//                 style={{
//                     flexDirection: 'row',
//                     width: '100%',
//                     borderRadius: 30,
//                     backgroundColor: '#35A8FB',
//                     padding: 10,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}>
//                 <MaterialCommunityIcons
//                     name='filter'
//                     size={24}
//                     color='rgba(250,250,250,.7)'
//                 />
//                 <Text style={{ color: 'white', marginLeft: 10 }}>Filter</Text>
//             </TouchableOpacity>

//             <MapScreen change={barangay + " " + municipalityName} />



//             <View style={{ height: 50 }} />
//             <Text
//                 style={[
//                     styles.chartTitle,
//                     {
//                         color: Colors[colorScheme].text,
//                         marginLeft: -0,
//                     },
//                     dataVisibility == true ? {} : { display: 'none' },
//                 ]}>
//                 {'Year ' + year + ' of ' + barangay + ',  ' + municipalityName}
//             </Text>
//             <View
//                 style={[
//                     styles.separator,
//                     { marginLeft: -20 },
//                     dataVisibility == true ? {} : { display: 'none' },
//                 ]}></View>
//             <TotalData data={birthData} visibility={dataVisibility} />
//             <MonthCharts
//                 barangay={barangay}
//                 municipalityName={municipalityName}
//                 visibility={dataVisibility}
//                 monthData={monthData}
//             />
//             <TeenageBirths
//                 visibility={dataVisibility}
//                 lineChartData={lineChartData}
//                 barangay={barangay}
//                 municipalityName={municipalityName}
//             />
//             <IllegitimateBirths
//                 visibility={dataVisibility}
//                 lineChartData={lineChartData}
//                 barangay={barangay}
//                 municipalityName={municipalityName}
//             />
//         </View>
//     );
// }
// import { View, Text, ScrollView, TextInput } from 'react-native';

// import axios from 'axios';
// import base from '../../../constants/Api';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { Picker } from '@react-native-community/picker';
// import { Ionicons } from '@expo/vector-icons';
// import React, { useState, useEffect } from 'react';
// import Colors from '../../../constants/Colors';
// import useColorScheme from '../../../hooks/useColorScheme';
// import styles from './births.style';
// import Summary from './summary';

// import IllegitimateBirths from './illegitimate-births-charts';
// import MonthCharts from './month-charts';
// import TeenageBirths from './teenage-births-charts';
// import TotalData from './total-data'; import MapScreen from '../../../shared/maps/maps';

