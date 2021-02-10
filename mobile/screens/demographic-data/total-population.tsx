export default function TotalPopulation() {
    const [data, setData] = useState(0);

    useEffect(() => {
        async function getData() {
            const url = base.apiURL + 'statistic-profile/total';
            axios.get(url).then((response) => {
                setData(response.data.total);
            });
        }
        getData();
    }, []);

    return <Text>{data}</Text>;
}
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import base from '../../constants/Api';
