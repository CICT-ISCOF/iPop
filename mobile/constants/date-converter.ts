export default function timeConverter( dateString: any ) {
    const d = new Date( dateString ).getTime();
    var a = new Date( d  );
    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    var year = a.getFullYear();
    var month = months[ a.getMonth() ];
    var date = a.getDate();
    var time = month + ' '  + date + ', ' + year
    return time;
}