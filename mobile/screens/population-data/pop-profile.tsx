import React from 'react';
import { View, Text } from 'react-native';
import styles from './pop-data.style';
import useColorScheme from '../../hooks/useColorScheme';

import Colors from '../../constants/Colors';

export default function PopProfile(props: any) {
    const colorScheme = useColorScheme();
    let data = {
        municipality: 'N/A',
        barangay: 'N/A',
        year: 'N/A',
        coverage: 'N/A',
        barangays: 'N/A',
        land_area: 'N/A',
        household_population: 'N/A',
        males: 'N/A',
        females: 'N/A',
        sex_ratio: 'N/A',
        median_age: 'N/A',
        doubling: 'N/A',
        growth_rate: 'N/A',
        households: 'N/A',
        average_household_size: 'N/A',
        density: 'N/A',
        age_dependency_ratio: 'N/A',
        child_dependency_ratio: 'N/A',
        old_age_dependency_ratio: 'N/A',
    };
    if (props.data.length != 0) {
        data = props.data[0];
    }

    return (
        <View
            style={[
                {
                    marginTop: 50,
                },
                props.visibility != true ? { display: 'none' } : {},
                data.coverage == undefined ? { display: 'none' } : {},
            ]}>
            <Text
                style={[
                    styles.chartTitle,
                    {
                        color: Colors[colorScheme].text,
                    },
                ]}>
                Population Profile
            </Text>
            <View style={styles.separator}></View>
            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Coverage
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.coverage || 'N/A'}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        {data.coverage}
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.barangays || 'N/A'}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Total Land Area
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.land_area || 'N/A'}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Total HH Population
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.household_population || 'N/A'}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Male
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.males || 'N/A'}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Female
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.females || 'N/A'}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Sex Ratio
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.sex_ratio || 'N/A'}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Median Age
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.median_age || 'N/A'}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Doubling Time/Year
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.doubling || 'N/A'}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Population Growth Rate
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.growth_rate || 'N/A'}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        No. of Households
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.households || 'N/A'}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Average Household Size
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.average_household_size || 'N/A'}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Population Density
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.density}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Age Dependency Ratio
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.age_dependency_ratio || 'N/A'}
                    </Text>
                </View>
            </View>
            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Child Dependency Ratio
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.child_dependency_ratio || 'N/A'}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.tr,
                    ,
                    { borderColor: Colors[colorScheme].border },
                ]}>
                <View style={styles.th}>
                    <Text style={{ color: Colors[colorScheme].text }}>
                        Old-Age Dependency Ratio
                    </Text>
                </View>
                <View style={[styles.td]}>
                    <Text
                        style={{
                            color: '#1873FF',
                        }}>
                        {data.old_age_dependency_ratio || 'N/A'}
                    </Text>
                </View>
            </View>
        </View>
    );
}
