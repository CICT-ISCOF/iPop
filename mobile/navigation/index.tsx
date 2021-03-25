import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import LinkingConfiguration from './LinkingConfiguration';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';



import Login from '../screens/login/login';
import Register from '../screens/register/register';
import Avatar from '../screens/register/avatar';
import Password from '../screens/register/password';
import Username from '../screens/register/username';
import Splash from '../screens/Splash/splash';

import Others from '../screens/others/others';
import PopulationData from '../screens/population-data/pop-data';

import IssuesAndConcerns from '../screens/ahyd/issues-and-concerns/issues-and-concerns';
import TeenCenters from '../screens/ahyd/teen-centers/teen-centers';

import MPCFDC from '../screens/rpfp/mpc-fdc/mpc-fdc';
import PMOCData from '../screens/rpfp/pmoc/pmoc';

import Migrations from '../screens/demographic-data/migrations/migrations';
import Deaths from '../screens/demographic-data/deaths/deaths';
import Births from '../screens/demographic-data/births/births';

import ContactUs from '../screens/main/about-us/contact-us/contact-us';
import Awards from '../screens/main/about-us/awards/awards';
import Services from '../screens/main/services/services';
import Directory from '../screens/main/directory/directory';
import OrgStructure from '../screens/main/about-us/org-structure/org-structure';
import Goals from '../screens/main/about-us/goals/goasl';
import CoreValues from '../screens/main/about-us/core-values/core-values';
import MissionVIsion from '../screens/main/about-us/mission-vision/mission-vission';
import MandateScreen from '../screens/main/about-us/mandate/mandate';

import ShowServices from '../screens/main/services/services-offered-show';
import ShowProgramAreas from '../screens/main/program-areas/program-areas-show';
import ShowTeenCenter from '../screens/ahyd/teen-centers/teen-center-show';
import TeenCenterList from '../screens/ahyd/teen-centers/teen-center-lists';

import Step1 from '../screens/Steps/step1';
import Step2 from '../screens/Steps/step2';
import Step3 from '../screens/Steps/step3';
import Step4 from '../screens/Steps/step4';
import Step5 from '../screens/Steps/step5';
import ShowArticle from '../screens/main/home/components/featured-articles/show-featuredArticles';
import ShowMPC from '../screens/rpfp/mpc-fdc/show-mpc';

export default function Navigation( { colorScheme, }: { colorScheme: ColorSchemeName; } ) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createStackNavigator<RootStackParamList>();
function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Username' component={Username} />
            <Stack.Screen name='Password' component={Password} />
            <Stack.Screen name='Avatar' component={Avatar} />
            <Stack.Screen name='Root' component={BottomTabNavigator} />

            <Stack.Screen name='ShowArticle' component={ShowArticle} />

            {/* steps  */}
            <Stack.Screen name='Step1' component={Step1} />
            <Stack.Screen name='Step2' component={Step2} />
            <Stack.Screen name='Step3' component={Step3} />
            <Stack.Screen name='Step4' component={Step4} />
            <Stack.Screen name='Step5' component={Step5} />

            {/* aboutus  */}
            <Stack.Screen name='Mandate' component={MandateScreen} />
            <Stack.Screen name='MissionVIsion' component={MissionVIsion} />
            <Stack.Screen name='CoreValues' component={CoreValues} />
            <Stack.Screen name='Goals' component={Goals} />
            <Stack.Screen name='OrgStructure' component={OrgStructure} />
            <Stack.Screen name='Directory' component={Directory} />
            <Stack.Screen name='Services' component={Services} />
            <Stack.Screen name='Awards' component={Awards} />
            <Stack.Screen name='ContactUs' component={ContactUs} />

            {/* demographicData  */}
            <Stack.Screen name='Births' component={Births} />
            <Stack.Screen name='Deaths' component={Deaths} />
            <Stack.Screen name='Migrations' component={Migrations} />

            {/* rpfpData  */}
            <Stack.Screen name='PMOCData' component={PMOCData} />
            <Stack.Screen name='MPC-FDC' component={MPCFDC} />
            <Stack.Screen name='ShowMPC' component={ShowMPC} />

            {/* ahydata  */}
            <Stack.Screen name='TeenCenters' component={TeenCenters} />
            <Stack.Screen name='IssuesAndConcerns' component={IssuesAndConcerns} />
            <Stack.Screen name='Others' component={Others} />
            <Stack.Screen name='PopulationData' component={PopulationData} />
            <Stack.Screen name='ShowServices' component={ShowServices} />
            <Stack.Screen name='ShowProgramAreas' component={ShowProgramAreas} />
            <Stack.Screen name='ShowTeenCenter' component={ShowTeenCenter} />
            <Stack.Screen name='TeenCenterList' component={TeenCenterList} />
        </Stack.Navigator>
    );
}
