import base from './Api';
import axios from 'axios';

export default class LocationService {
    baseURL = base.apiURL + 'location';

    getMunicipalities() {
        const url = this.baseURL + '/municipalities?province_code=0630';
        axios.get(base.apiURL + base.topPopulated).then((response) => {
            return response.data;
        });
    }

    getBarangays(municipality_code: any) {
        const url =
            this.baseURL + '/barangays?municipality_code=' + municipality_code;
        axios.get(base.apiURL + base.topPopulated).then((response) => {
            return response.data;
        });
    }
}
