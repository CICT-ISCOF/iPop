import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
    BottomTabParamList,
    HomeParamList,
    AboutParamList,
    MenuParamList,
    ProgramAreasParamList,
    ProfileParamList,
    MandateParamList,
    MissionVisionParamList,
} from '../types';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

//screens
import HomeScreen from '../screens/main/home/home';
import MenuScreen from '../shared/menu';
import AboutScreen from '../screens/main/about-us/nav';
import ProgramAreasScreen from '../screens/main/program-areas/program-areas';
import ProfileScreen from '../screens/profile/profile';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName='Home'
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
            <BottomTab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name='home' size={24} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name='AboutUs'
                component={AboutUs}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name='people' size={24} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name='ProgamAreas'
                component={ProgramAreas}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name='radar'
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name='user' size={24} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name='Menu'
                component={Menu}
                options={{
                    tabBarIcon: ({ color }) => (
                        <SimpleLineIcons name='menu' size={24} color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof Ionicons>['name'];
    color: string;
}) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const HomeStack = createStackNavigator<HomeParamList>();

function Home() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name='TabOneScreen'
                component={TabOneScreen}
                options={{ headerTitle: '', headerShown: false }}
            />
        </HomeStack.Navigator>
    );
}

const AboutStack = createStackNavigator<AboutParamList>();

function AboutUs() {
    return (
        <AboutStack.Navigator>
            <AboutStack.Screen
                name='AboutScreen'
                component={AboutScreen}
                options={{ headerTitle: '', headerShown: false }}
            />
        </AboutStack.Navigator>
    );
}

const ProgramAreasStack = createStackNavigator<ProgramAreasParamList>();

function ProgramAreas() {
    return (
        <ProgramAreasStack.Navigator>
            <ProgramAreasStack.Screen
                name='ProgramAreasScreen'
                component={ProgramAreasScreen}
                options={{ headerTitle: '', headerShown: false }}
            />
        </ProgramAreasStack.Navigator>
    );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function Profile() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={{ headerTitle: '', headerShown: false }}
            />
        </ProfileStack.Navigator>
    );
}

const MenuStack = createStackNavigator<MenuParamList>();

function Menu() {
    return (
        <MenuStack.Navigator>
            <MenuStack.Screen
                name='MenuScreen'
                component={MenuScreen}
                options={{ headerTitle: '', headerShown: false }}
            />
        </MenuStack.Navigator>
    );
}
