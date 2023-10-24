import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Intro, PlaceDetail, TripPlan, SignUp, SignIn, TripDetail, MyDreamTrip, PlaceDetailForTrip } from "../screens/index";
import { TabBar } from "../navigator/index";

import { useSelector } from "react-redux";
import { userSelector } from "../redux/usersSlice";
import { firebase_auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function Navigator() {
    const user = useSelector(userSelector);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebase_auth, (user) => {
            console.log(user);
            setStatus(user);
        })
    }, [user]);

    return (
        <NavigationContainer>
            {status ? (
                <Stack.Navigator screenOptions={{
                    headerShown: false,
                }}>
                    <Stack.Screen name="Content" component={TabBar} />
                    <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
                    <Stack.Screen name="TripPlan" component={TripPlan} />
                    <Stack.Screen name="MyDreamTrip" component={MyDreamTrip} />
                    <Stack.Screen name="TripDetail" component={TripDetail} />
                    <Stack.Screen name="PlaceDetailForTrip" component={PlaceDetailForTrip} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator screenOptions={{
                    headerShown: false,
                }}>
                    <Stack.Screen name="Intro" component={Intro} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="SignIn" component={SignIn} />
                    {/* <Stack.Screen name="Content" component={TabBar} />
                    <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
                    <Stack.Screen name="TripPlan" component={TripPlan} />
                    <Stack.Screen name="MyDreamTrip" component={MyDreamTrip} />
                    <Stack.Screen name="TripDetail" component={TripDetail} />
                    <Stack.Screen name="PlaceDetailForTrip" component={PlaceDetailForTrip} /> */}
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}