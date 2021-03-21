export default {
    apiURL:'http://192.168.1.103:8000/api/',
    register:'auth/register/viewer',
    login:'auth/login',

    // home
    carousel:'sliders',
    featureArticles:'articles',

    //aboutUs
    orgStructure:'charts',
    services:'services',
    awards:'awards',

    //programAreas
    programAreas:'program-areas',



    // menus -----------------------
    monthChart:'',

    // populationData 
    populationProfile:'',
    topPopulated:'top-populations',
 
    // demographicData 
    BirthStat:'',
    deathStat:'',
    migrationStat:'',


    // rpfp 
    PMOC:'',
    MPCFDC:'',

    // ahyd 
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