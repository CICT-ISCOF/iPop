

const dataName = [
    'Coverage',
    'Total No. of Barangays',
    'Total Land Area',
    'Total Household Population',
    'Males',
    'Females',
    'Sex Ratio',
    'Median Age',
    'Doubling Time/Year',
    'Population Growth Rate',
    'No. of Households',
    'Average Household Size',
    'Population Density',
    'Age Dependency Ratio',
    'Child Dependency Ratio',
    'Old-Age Dependency Ratio',
]

const data = [
    'coverage',
    'barangays',
    'land_area',
    'household_population',
    'males',
    'females',
    'sex_ratio',
    'median_age',
    'doubling',
    'growth_rate',
    'households',
    'average_household_size',
    'density',
    'age_dependency_ratio',
    'child_dependency_ratio',
    'old_age_dependency_ratio',
]


export async function getData() {
    let tempName = []
    let tempData = []
    for ( let i in data ) {
        tempName.push( dataName[i])
        tempData.push( data[i])
    }
    return {
        data: tempData,
        name: tempName
    }

}