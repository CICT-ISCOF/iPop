import axios from 'axios';
import base from '../../../constants/Api';

export async function getMPCFDC( municipality: String, district: Number ) {
    const url = base.apiURL + `mpcfdcs?municipality=${ municipality }&district=${ district }`;
    const response = await axios.get( url )
    return response.data
}