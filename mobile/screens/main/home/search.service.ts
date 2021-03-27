

let results = [
    'Mandate',
    'Mission & VIsion',
    'Core Values',
    'Goals',
    'Organizational Structure',
    'Personnel Directory',
    'Services',
    'Awards',
    'Contact Us',
    'Births',
    'Deaths',
    'Migrations',
    'Pre-Marraige Orrientation and Counseling (PMOC)',
    'Multi-Purpose Counseling and Family Development Center (MPC-FDC)',
    'Teen Centers',
    'Population Data',
]

let routes = [
    'Mandate',
    'MissionVIsion',
    'CoreValues',
    'Goals',
    'OrgStructure',
    'Directory',
    'Services Offered',
    'Awards',
    'ContactUs',
    'Births',
    'Deaths',
    'Migrations',
    'PMOCData',
    'MPC-FDC',
    'TeenTeenCenters',
    'PopulationData',
]

export async function search( keyword: any ) {
    
    let resultsArray = []
    let routesArray = []

    for ( let i in results ) {
        if (
            keyword.includes( results[ i ] ) ||
            results[ i ].includes( keyword )
        ) {
            routesArray.push( routes[ i ] )
            resultsArray.push( results[ i ] )
        }
    }

    return {
        routesArray: routesArray,
        resultsArray: resultsArray
    }
  
}