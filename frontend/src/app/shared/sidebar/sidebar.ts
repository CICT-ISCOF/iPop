

const navs = [
    {
        name: 'Home',
        route: 'home',
        icon: 'bi-house',
        type:'all'
    },
    {
        name: 'Records',
        route: 'profiling',
        icon: 'bi-folder2-open',
        type: 'all'
    },
    {
        name: 'Content Mgt',
        route: 'cms',
        icon: 'bi-columns',
        type:'admin'
    },
    {
        name: 'Admin Accounts',
        route: 'admin-accounts',
        icon: 'bi-lock-fill',
        type: 'admin'
    },
    {
        name: 'New Administrator',
        route: 'new-admin',
        icon: 'bi-unlock-fill',
        type: 'admin'
    },
    {
        name: 'History Logs',
        route: 'logs',
        icon: 'bi-clock-history',
        type: 'admin'
    },
    {
        name: 'CPDB',
        route: 'cpdb',
        icon: 'bi-people',
        type: 'all'
    },
    {
        name: 'Deaths',
        route: 'deaths',
        icon: 'bi-exclude',
        type: 'all'
    },
    {
        name: 'Births',
        route: 'births',
        icon: 'bi-signpost-2',
        type: 'all'
    },
    {
        name: 'In- Migrations',
        route: 'in-mig',
        icon: 'bi-box-arrow-left',
        type: 'all'
    },
    {
        name: 'Out-Migrations',
        route: 'out-mig',
        icon: 'bi-box-arrow-right',
        type: 'all'
    },
    {
        name: 'Marriages',
        route: 'marriages',
        icon: 'bi-suit-heart',
        type: 'all'
    },
    
]


export function Sidebar() {
    return navs
}