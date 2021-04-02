

export const headers = [
    {
        name: 'About',
        children: [
            { name: 'PPO Mandate', route: 'ABOUT/PPO-MADATE' },
            { name: 'Mission, Vision & Goals', route: 'ABOUT/VISION,MISSION,GOALS' },
            { name: 'Core Values', route: 'ABOUT/CORE-VALUES' },
            { name: 'Organizational Structure', route: 'ABOUT/ORGANIZATIONAL-STRUCTURE' },
            { name: 'Personnel Directory', route: 'ABOUT/PERSONNEL-DIRECTORY' },
            { name: 'Awards', route: 'ABOUT/AWARDS' },

        ]
    },
    {
        name: 'Programs',
        children: [
            { name: 'Responsible Parenthood and Family Planning Program', route: 'PROGRAM-AREAS/Responsible-Parenthood-and-Family-Planning-Program' },
            { name: 'Adolscent Health & Youth Development Program', route: 'PROGRAM-AREAS/Adolscent-Health-&-Youth-Development-Program' },
            { name: 'Comprehensive Population Data Banking and Management Project', route: 'PROGRAM-AREAS/Comprehensive-Population-Data-Banking-and-Management-Projec' },
            { name: 'Population and Development Integration', route: 'PROGRAM-AREAS/Population-and-Development-Integration' },
        ]
    },
    {
        name: 'Services',
        children: [
            { name: 'Responsible Parenthood and Family Planning Program', route: 'ERVICES-OFFERED/Responsible-Parenthood-and-Family-Planning-Program' },
            { name: 'Adolscent Health & Youth Development Program', route: 'SERVICES-OFFERED/Adolscent-Health-&-Youth-Development-Program' },
            { name: 'Population and Development Integration', route: 'SERVICES-OFFERED/Population-and-Development-Integration' },
            { name: 'Population Data Managment', route: 'SERVICES-OFFERED/Population Data Managment' },
        ]
    },
    {
        name: 'Demographics',
        children: [
            { name: 'Births', route: 'demographic-data/births' },
            { name: 'Deaths', route: 'demographic-data/deaths' },
            { name: 'Migrations', route: 'demographic-data/migration' },
        ]
    },
    {
        name: 'RPFP',
        children: [
            { name: 'Pre-Marriage Orrientation and Counseling', route: 'PMOC' },
            { name: 'Multi-purpose Counseling and Family Development Center', route: 'MPC-FDC' },
        ]
    },
    {
        name: 'AHYD',
        children: [
            { name: 'Teen Centers', route: 'Teen-Centers' },
            { name: 'Issues & Concerns', route: '' },//ma direct sa facebook
        ]
    },
    {
        name: 'Others',
        children: [
            { name: 'Population Profile By Municipality', route: 'population-profile-by-municipality' },
            { name: 'Age Distribution by Municipality', route: 'age-distribution-by-municipality' },
        ]
    },
    
    
]