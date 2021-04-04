

export const options = {
    pyramidChartOptions: {
        backgroundColor: {
            'fill': 'transparent',
            'opacity': 0
        },
        titleTextStyle: { color: 'gray', fontSize: 30, align: 'center', bold: true },
        colors: [ '#FD582C', '#9D5DB6', ],
        chartArea: { backgroundColor: 'transparent', height: '100%', top: '%' },
        isStacked: true,
        hAxis: {
            textPosition: 'none',
            format: ';',
            title: '',
            textStyle: {
                color: 'gray'
            },
        },
        vAxis: {
            direction: 1,
            title: '',
            textStyle: {
                color: 'gray'
            },
        },
        legend: { textStyle: { color: 'gray' } }

    },

}

