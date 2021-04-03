
import * as chart from './chartOption'

const googleChartOptions = chart.options

export  function drawChart( chartId:any, chartData:any ) {
    let style = googleChartOptions.pyramidChartOptions
    const chart = () => {
        var data = google.visualization.arrayToDataTable( chartData )
        var chart = new google.visualization.BarChart( document.getElementById( chartId ) )
        var formatter = new google.visualization.NumberFormat( {
            pattern: ';'
        } )
        formatter.format( data, 2 )
        chart.draw( data, style )
    }
    google.load( "visualization", "1", { packages: [ "corechart" ] } )
    google.setOnLoadCallback( chart )
}