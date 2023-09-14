import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Intro, PlaceDetail, TripPlan, SignUp, SignIn, TripDetail } from "../screens/index";
import { TabBar } from "../navigator/index";
import MyDreamTrip from "../screens/MyDreamTrip";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainNavigator() {
    return (
        <Stack.Navigator initialRouteName="Intro" screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SingIn" component={SignIn} />
            <Stack.Screen name="Content" component={TabBar} />
            <Stack.Screen name="PlaceDetail" component={PlaceDetailNavigator} />
            <Stack.Screen name="TripPlan" component={CreateTripNavigator} />
            <Stack.Screen name="MyDreamTrip" component={MyDreamTrip}/>
            <Stack.Screen name="TripDetail" component={TripDetail}/>
        </Stack.Navigator>
    );
}

function PlaceDetailNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="RecommandTripDetail" component={PlaceDetail} />
        </Stack.Navigator>
    );
}

function TripDetailNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="TripDetailNavigator" component={TripDetail} />
        </Stack.Navigator>
    );
}

function CreateTripNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="MainTripPlan" component={TripPlan} />
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