import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList, } from '../types';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

//screens
import Home from '../screens/main/home/home';
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
            tabBarOptions={{ activeTintColor: Colors[ colorScheme ].tint }}>
            <BottomTab.Screen
                name='Home'
                component={HomeNavigator}
                options={{
                    tabBarIcon: ( { color } ) => (
                        <AntDesign name='home' size={24} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name='AboutUs'
                component={AboutUsNavigator}
                options={{
                    tabBarIcon: ( { color } ) => (
                        <MaterialIcons name='people' size={24} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name='ProgamAreas'
                component={ProgramAreasNavigator}
                options={{
                    tabBarIcon: ( { color } ) => (
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
                component={ProfileNavigator}
                options={{
                    tabBarIcon: ( { color } ) => (
                        <AntDesign name='user' size={24} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name='Menu'
                component={MenuNavigator}
                options={{
                    tabBarIcon: ( { color } ) => (
                        <SimpleLineIcons name='menu' size={24} color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}



const HomeStack = createStackNavigator<any>();
function HomeNavigator() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name='Home'
                component={Home}
                options={{ headerTitle: '', headerShown: false }}
            />
        </HomeStack.Navigator>
    );
}

const AboutStack = createStackNavigator<any>();
function AboutUsNavigator() {
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

const ProgramAreasStack = createStackNavigator<any>();
function ProgramAreasNavigator() {
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

const ProfileStack = createStackNavigator<any>();
function ProfileNavigator() {
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

const MenuStack = createStackNavigator<any>();
function MenuNavigator() {
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
