import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Home, ExploreTrip, CreateTrip, Wishlist, Profile } from "../screens/index";
import { TabBar } from "../navigator/index";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <TabBar />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({

});