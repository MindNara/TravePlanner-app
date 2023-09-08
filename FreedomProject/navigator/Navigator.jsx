import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Home, ExploreTrip, CreateTrip, Wishlist, Profile, Intro } from "../screens/index";
import { TabBar } from "../navigator/index";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function IntroNavigator() {
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
        </Stack.Navigator>
    );
}

export default function Navigator() {
    return (
        <NavigationContainer>
            <IntroNavigator />
        </NavigationContainer>
    );
}