import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Home, ExploreTrip, CreateTrip, Wishlist, Profile, Intro, PlaceDetail } from "../screens/index";
import { TabBar } from "../navigator/index";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainNavigator() {
    return (
        <Stack.Navigator initialRouteName="Intro">
            <Stack.Screen name="Intro" component={Intro}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen name="Content" component={TabBar}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen name="PlaceDetail" component={PlaceDetailNavigator}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    );
}

function PlaceDetailNavigator() {
    return (
        <Stack.Navigator initialRouteName="PlaceDetail">
            <Stack.Screen name="RecommandTripDetail" component={PlaceDetail}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    );
}

export default function Navigator() {
    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    );
}