import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { Home, ExploreTrip, CreateTrip, Wishlist, Profile } from "../screens/index";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabBars() {
    return (
        <Tab.Navigator initialRouteName="TabBar" tabBarPosition="bottom" screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#2E2E2E",
            tabBarInactiveTintColor: "#2E2E2E",
            tabBarStyle: {
                height: 65,
                backgroundColor: 'white',
                shadowColor: 'white',
            },
            tabBarIconStyle: {
                marginTop: 10,
            },
        }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused, color }) => {
                        return focused ? (
                            <FontAwesomeIcon icon="fa-solid fa-house" size={24} color={color} />
                        ) : (
                            <FontAwesomeIcon icon="fa-solid fa-house" size={24} color={color} style={styles.tabBarIcon} />
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        return focused ? (
                            <FontAwesomeIcon icon="fa-solid fa-circle" size={6} />
                        ) : (
                            false
                        );
                    },
                }} />
            <Tab.Screen name="ExploreTrip" component={ExploreTrip}
                options={{
                    tabBarIcon: ({ focused, color }) => {
                        return focused ? (
                            <FontAwesomeIcon icon="fa-solid fa-location-dot" size={23} color={color} />
                        ) : (
                            <FontAwesomeIcon icon="fa-solid fa-location-dot" size={23} color={color} style={styles.tabBarIcon} />
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        return focused ? (
                            <FontAwesomeIcon icon="fa-solid fa-circle" size={6} />
                        ) : (
                            false
                        );
                    },
                }} />
            <Tab.Screen name="CreateTrip" component={CreateTrip}
                options={{
                    tabBarIcon: (({ color }) => {
                        return <FontAwesomeIcon icon="fa-solid fa-circle-plus" size={50} color={color} style={styles.tabBarIconCreate} />;
                    }),
                    tabBarLabel: "",
                }} />
            <Tab.Screen name="Wishlist" component={Wishlist}
                options={{
                    tabBarIcon: ({ focused, color }) => {
                        return focused ? (
                            <FontAwesomeIcon icon="fa-solid fa-heart" size={23} color={color} />
                        ) : (
                            <FontAwesomeIcon icon="fa-regular fa-heart" size={23} color={color} style={styles.tabBarIcon} />
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        return focused ? (
                            <FontAwesomeIcon icon="fa-solid fa-circle" size={6} />
                        ) : (
                            false
                        );
                    },
                }} />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ focused, color }) => {
                        return focused ? (
                            <FontAwesomeIcon icon="fa-solid fa-user" size={22} color={color} />
                        ) : (
                            <FontAwesomeIcon icon="fa-regular fa-user" size={22} color={color} style={styles.tabBarIcon} />
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        return focused ? (
                            <FontAwesomeIcon icon="fa-solid fa-circle" size={6} />
                        ) : (
                            false
                        );
                    },
                }} />
        </Tab.Navigator >
    );
}

export default function Navigator() {
    return (
        <NavigationContainer>
            <TabBars />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBarIconCreate: {
        marginTop: 5,
    },
    tabBarIcon: {
        marginBottom: 6,
    }
});