




export const options = {
    pyramidChartOptions: {
        backgroundColor: {
            'fill': 'transparent',
            'opacity': 0
        },
        title: '',
        titleTextStyle: { color: 'blue', fontSize: 30, align: 'center', bold: true },
        colors: [ '#09B2E7', '#F30091', ],
        chartArea: { backgroundColor: 'transparent', height: '100%', top: '10%' },
        isStacked: true,
        hAxis: {
            textPosition: 'none',
            format: ';',
            title: '',
            textStyle: {
                color: formatChatColor()
            },
        },
        vAxis: {
            direction: 1,
            title: '',
            textStyle: {
                color: formatChatColor()
            },
        },
        legend: { textStyle: { color: formatChatColor() } }

    },

}

function formatChatColor(){
    return localStorage.getItem( 'data-theme' ) == 'dark' ? 'white' : 'black'
}
