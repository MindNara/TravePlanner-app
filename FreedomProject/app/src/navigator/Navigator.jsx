import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Intro, PlaceDetail, TripPlan, SignUp, SignIn, TripDetail, MyDreamTrip } from "../screens/index";
import { TabBar } from "../navigator/index";

import { useSelector } from "react-redux";
import { userSelector } from "../redux/usersSlice";

const Stack = createNativeStackNavigator();

function MainNavigator() {

    const user = useSelector(userSelector);
    const loading = user.loading;
    console.log(loading);

    return (
        (loading == 'login success') ? (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="Content" component={TabBar} />
                <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
                <Stack.Screen name="TripPlan" component={TripPlan} />
                <Stack.Screen name="MyDreamTrip" component={MyDreamTrip} />
                <Stack.Screen name="TripDetail" component={TripDetail} />
            </Stack.Navigator>
        ) : (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="Content" component={TabBar} />
                <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
                <Stack.Screen name="TripPlan" component={TripPlan} />
                <Stack.Screen name="MyDreamTrip" component={MyDreamTrip} />
                <Stack.Screen name="TripDetail" component={TripDetail} />
            </Stack.Navigator>
        )
    );
}

export default function Navigator() {
    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    );
}