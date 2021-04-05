
import axios from 'axios';
import base from '../../../../../constants/Api';

export const today = async ( ) => {
    const url = base.apiURL + `articles/today`
    const response = await axios.get( url )
    return response.data
}

export const week = async () => {
    const url = base.apiURL + `articles/week`
    const response = await axios.get( url )
    return response.data
}

export const month = async () => {
    const url = base.apiURL + `articles/month`
    const response = await axios.get( url )
    return response.data
}

