


export async function AgeGroup( data: any ) {
    data = data[ 0 ]
    let chart:any = {
        labels: [ '15-19', '20-24', '25-29 ', '30-34', '35-39', '40-44', '45+' ],
        male: [],
        female: [],
        total: []
    }
   
    chart.female = [
        parseInt(data['15_to_19_female']) || 0,
        parseInt(data['20_to_24_female']) || 0,
        parseInt(data['25_to_29_female']) || 0,
        parseInt(data['30_to_34_female']) || 0,
        parseInt(data['35_to_39_female']) || 0,
        parseInt(data['40_to_44_female']) || 0,
        parseInt(data['45_and_above_female']) || 0
    ]
    chart.male = [
        parseInt(data['15_to_19_male']) || 0,
        parseInt(data['20_to_24_male']) || 0,
        parseInt(data['25_to_29_male']) || 0,
        parseInt(data['30_to_34_male']) || 0,
        parseInt(data['35_to_39_male']) || 0,
        parseInt(data['40_to_44_male']) || 0,
        parseInt(data['45_and_above_male']) || 0
    ]
    chart.total = [
        parseInt( data[ '15_to_19_female' ] ) + parseInt( data[ '15_to_19_male' ] ) || 0,
        parseInt( data[ '20_to_24_female' ] ) + parseInt( data[ '20_to_24_male' ] ) || 0,
        parseInt( data[ '25_to_29_female' ] ) + parseInt( data[ '25_to_29_male' ] ) || 0,
        parseInt( data[ '30_to_34_female' ] ) + parseInt( data[ '30_to_34_male' ] ) || 0,
        parseInt( data[ '35_to_39_female' ] ) + parseInt( data[ '35_to_39_male' ] ) || 0,
        parseInt( data[ '40_to_44_female' ] ) + parseInt( data[ '40_to_44_male' ] ) || 0,
        parseInt( data[ '45_and_above_female' ] ) + parseInt( data[ '45_and_above_male' ] ) || 0
    ]
    return chart
    
}

export async function EmploymentStatus( data: any ) {
    data = data[ 0 ]
    let chart: any = {
        labels: [ 'Students', 'Employed', 'Unemployed' ],
        male: [],
        female: [],
        total: []
    }
    chart.female = [ data.student_female || 0, data.employed_female || 0, data.not_employed_female || 0 ]
    chart.male = [ data.student_male || 0, data.employed_male || 0, data.not_employed_male || 0 ]
    chart.total = [
        parseInt( data.student_female ) + parseInt( data.student_male ) || 0,
        parseInt( data.not_employed_female ) + parseInt( data.not_employed_male ) || 0,
        parseInt( data.employed_male ) + parseInt( data.employed_female ) || 0
    ]
    return chart
}

export async function KnowLedgeOnFP( data: any ) {
    data = data[ 0 ]
    let chart: any = {
        labels: [ 'Male', 'Female', 'Total' ],
        male: [],
        female: [],
        total: []
    }
 
    chart.total = [
        data.males || 0,
        data.females || 0,
        parseInt( data.males ) + parseInt( data.females ) || 0
    ]
    
    return chart
}
    
export async function CivilStatus( data: any ) {
    let chart: any = {
      	labels:['Single','Live-in','Widow','Separated'],
        male: [],
        female: [],
        total: []
    }
    data = data[ 0 ]
    chart.female = [
        parseInt( data.single_female ) || 0,
        parseInt( data.live_in_female ) || 0,
        parseInt( data.widow_female ) || 0,
        parseInt( data[ 'separated_female' ] ) || 0,
    ]
    chart.male = [
        parseInt( data.single_male ) || 0,
        parseInt( data.live_in_male ) || 0,
        parseInt( data.widow_male ) || 0,
        parseInt( data[ 'separated_male' ] ) || 0,
    ]
    chart.total = [
        ( parseInt( data.single_male ) + parseInt( data.single_female ) ) / 2 || 0,
        ( parseInt( data.live_in_female ) + parseInt( data.live_in_female ) ) / 2 || 0,
        ( parseInt( data.widow_male ) + parseInt( data.widow_female ) ) / 2 || 0,
        ( parseInt( data.separated_male ) + parseInt( data.separated_female ) ) / 2 || 0,
    ]
    return chart
    
}

export async function AverageMonthlyIncome( data: any ) {
    let chart: any = {
        labels: [
            '0',
            '-5k ',
            '5k-9k',
            '1k-14k',
            '15k-19k',
            '20k-24k',
            '25k+'
        ],
        male: [],
        female: [],
        total: []
    }
    data = data[ 0 ]
    chart.male = [
            parseInt(data.no_income_male) || 0,
            parseInt(data.under_5k_male) || 0,
            parseInt(data['5k_to_10k_female']) || 0,
            parseInt(data['10k_to_15k_female']) || 0,
            parseInt(data['15k_to_20k_female']) || 0,
            parseInt(data['20k_to_25k_female']) || 0,
            parseInt(data['above_25k_female']) || 0
    ]
    chart.female = [
        parseInt(data.no_income_male) || 0,
        parseInt(data.under_5k_male) || 0,
        parseInt(data['5k_to_10k_male']) || 0,
        parseInt(data['10k_to_15k_male']) || 0,
        parseInt(data['15k_to_20k_male']) || 0,
        parseInt(data['20k_to_25k_male']) || 0,
        parseInt(data['above_25k_male']) || 0
    ]
    chart.total = [
        parseInt(data.no_income_male) + parseInt(data.no_income_female) || 0,
        parseInt(data.under_5k_male) + parseInt(data.under_5k_female) || 0,
        parseInt(data['5k_to_10k_male']) + parseInt(data['5k_to_10k_female']) || 0,
        parseInt(data['10k_to_15k_male']) + parseInt(data['10k_to_15k_female']) || 0,
        parseInt(data['15k_to_20k_male']) + parseInt(data['15k_to_20k_female']) || 0,
        parseInt(data['20k_to_25k_male']) + parseInt(data['20k_to_25k_female']) || 0,
        parseInt(data['above_25k_male']) + parseInt(data['above_25k_female']) || 0,
    ]
    return chart
}

export async function NumberofCouples( data: any ) {
    
    let chart: any = {
        labels: [],
        male: [],
        female: [],
        total: []
    }
    for ( let key in data ) {
        if ( !chart.labels.includes( data[key].month ) ) {
            chart.labels.push( data[ key ].month.slice( 0, 3 ) )
        }
        chart.male.push( data[ key ][ 'total' ] );
    }
  
    return chart
}