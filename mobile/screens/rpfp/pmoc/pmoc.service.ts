
import axios from 'axios';
import base from '../../../constants/Api';

export const localData: any = async( municipality: String, year: Number )=> {
    const url = base.apiURL +  `pmoccs?municipality=${municipality}&year=${year}`
    const response = await axios.get( url )
    return response.data
}
    
export async function coupleByAgeGroup( municipality: String, year: Number ) {
    const url = base.apiURL + `pmc-age-group?municipality=${ municipality }&year=${ year }`
    const response = await axios.get( url )
    return response.data
}

export async function applicantsByEmploymentStatus( municipality: String, year: Number ) {
    const url = base.apiURL + `pmc-ess?municipality=${ municipality }&year=${ year }`
    const response = await axios.get( url )
    return response.data
}

export async function averageMonthlyIncome( municipality: String, year: Number ) {
    const url = base.apiURL + `pmc-amis?municipality=${ municipality }&year=${ year }`
    const response = await axios.get( url )
    return response.data
}

export async function knowLedgeOnFP( municipality: String, year: Number ) {
    const url = base.apiURL + `pmc-kfp?municipality=${ municipality }&year=${ year }`
    const response = await axios.get( url )
    return response.data
}

export async function byCivilStatus( municipality: String, year: Number ) {
    const url = base.apiURL + `pmc-ccs?municipality=${ municipality }&year=${ year }`
    const response = await axios.get( url )
    return response.data
}


