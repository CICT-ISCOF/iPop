export default {
    apiURL:'http://192.168.1.103:8000/api/',
    register:'auth/register/viewer',
    login:'auth/login',
    carousel:'sliders',
    featureArticles:'articles',
    orgStructure:'charts',
    services:'services',
    awards:'awards',
    programAreas:'program-areas',
    monthChart:'',
    populationProfile:'',
    topPopulated:'top-populations',
    BirthStat:'',
    deathStat:'',
    migrationStat:'',
    PMOC:'',
    MPCFDC:'',
    TeenCenters:'',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    loginHeaders:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Mode':'Password'
    }
}