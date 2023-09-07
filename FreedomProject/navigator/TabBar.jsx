import React from "react";
import { SafeAreaView, Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { Home, ExploreTrip, CreateTrip, Wishlist, Profile } from "../screens/index";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function TabBars() {
    return (
        <Tab.Navigator initialRouteName="TabBar" tabBarPosition="bottom" screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#2E2E2E",
            tabBarInactiveTintColor: "#2E2E2E",
            tabBarStyle: {
                height: 60,
                backgroundColor: 'white',
                shadowColor: 'white',
                paddingHorizontal: 12,
            },
            tabBarIconStyle: {
                marginTop: 10,
            },
        }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? (
                            <Image source={{ uri: 'https://img.icons8.com/fluency-systems-filled/96/2E2E2E/home.png' }}
                                style={{ width: 25, height: 25 }} />
                        ) : (
                            <Image source={{ uri: 'https://img.icons8.com/fluency-systems-regular/48/2E2E2E/home--v1.png' }}
                                style={[{ width: 24, height: 24 }, styles.tabBarIcon]} />
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        return focused ? (
                            <FontAwesomeIcon icon="fa-solid fa-circle" size={5} />
                        ) : (
                            false
                        );
                    },
                }} />
            <Tab.Screen name="ExploreTrip" component={ExploreTrip}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? (
                            <Image source={{ uri: 'https://img.icons8.com/fluency-systems-filled/96/2E2E2E/marker.png' }}
                                style={{ width: 25, height: 25 }} />
                        ) : (
                            <Image source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/2E2E2E/marker--v1.png' }}
                                style={[{ width: 24, height: 24 }, styles.tabBarIcon]} />
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        return focused ? (
                            <FontAwesomeIcon icon="fa-solid fa-circle" size={5} />
                        ) : (
                            false
                        );
                    },
                }} />
            <Tab.Screen name="CreateTrip" component={CreateTrip}
                options={{
                    tabBarIcon: (() => {
                        return <ImageBackground source={{ uri: 'https://img.icons8.com/sf-black-filled/128/2E2E2E/filled-circle.png' }}
                            style={[{ width: 62, height: 60 }, styles.tabBarIconCreate]} >
                            <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/90/FFFFFF/plus-math.png' }}
                                style={{ width: 18, height: 18 }} />
                        </ImageBackground>
                    }),
                    tabBarLabel: "",
                }} />
            <Tab.Screen name="Wishlist" component={Wishlist}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? (
                            <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/90/2E2E2E/like--v1.png' }}
                                style={{ width: 25, height: 25 }} />
                        ) : (
                            <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/90/2E2E2E/hearts.png' }}
                                style={[{ width: 23, height: 23 }, styles.tabBarIcon]} />
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        return focused ? (
                            <FontAwesomeIcon icon="fa-solid fa-circle" size={5} />
                        ) : (
                            false
                        );
                    },
                }} />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? (
                            <Image source={{ uri: 'https://img.icons8.com/fluency-systems-filled/96/2E2E2E/user-male-circle.png' }}
                                style={{ width: 25, height: 25 }} />
                        ) : (
                            <Image source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/2E2E2E/user-male-circle--v1.png' }}
                                style={[{ width: 24, height: 24 }, styles.tabBarIcon]} />
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        return focused ? (
                            <FontAwesomeIcon icon="fa-solid fa-circle" size={5} />
                        ) : (
                            false
                        );
                    },
                }} />
        </Tab.Navigator >
    );
}

const styles = StyleSheet.create({
    tabBarIconCreate: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarIcon: {
        marginBottom: 6,
    },
});