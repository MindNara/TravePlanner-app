import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    ImageBackground,
    Pressable,
    FlatList
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';
import { TripEventBox, PlaceTrip } from '../components/index';
import { db } from '../firebase/firebaseConfig';
import { query, where, doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { placesReceived } from '../redux/placesSlice';
import { useSelector } from "react-redux";
import { placeSelector } from '../redux/placesSlice';

export default function TripDatePlan({ navigation, item }) {

    // console.log("Schedule ID: " + item.key);
    const dispatch = useDispatch();
    const [numOfPlaces, setNumOfPlaces] = useState();
    // console.log("Number of places: " + numOfPlaces);

    const getPlaces = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(db, "places"), where("schedule_id", "==", item.key)));
            setNumOfPlaces(querySnapshot.size);
            const placesDoc = [];
            querySnapshot.forEach((doc) => {
                placesDoc.push({ ...doc.data(), key: doc.id });
            });
            dispatch(placesReceived(placesDoc));
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    }

    const place = useSelector(placeSelector);
    const placesItem = place.places;
    // console.log(placesItem);

    useEffect(() => {
        getPlaces();
    }, [item.key]);

    const generateTimeLine = () => {
        const timeLine = [];
        for (let i = 1; i <= numOfPlaces; i++) {
            timeLine.push(
                <View className="items-center justify-center mb-2">
                    <View className="w-[16px] h-[16px] bg-gray-dark rounded-xl items-center justify-center border-collapse border-[1px]"></View>
                    <View className="w-[1.5px] h-[120px] bg-gray-dark my-1"></View>
                    <View className="w-[16px] h-[16px] rounded-xl items-center justify-center border-collapse border-[1px]"></View>
                </View>
            )
        }

        return timeLine;
    }

    const [loaded] = useFonts({
        promptLight: require("../assets/fonts/Prompt-Light.ttf"),
        promptRegular: require("../assets/fonts/Prompt-Regular.ttf"),
        promptMedium: require("../assets/fonts/Prompt-Medium.ttf"),
        promptSemiBold: require("../assets/fonts/Prompt-SemiBold.ttf"),
        promptBold: require("../assets/fonts/Prompt-Bold.ttf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <View className="bg-white w-full h-full mt-[36px] flex flex-row">
            {/* Line */}
            <View className="bg-white w-[42px] h-auto items-center">
                {generateTimeLine()}
            </View>

            {/* Plan event */}
            <View className="bg-white w-[295px] h-auto ml-3">
                {/* Place */}
                {placesItem.map((item, index) => {
                    return (
                        <TripEventBox item={item} navigation={navigation} />
                    )
                })}
            </View>
        </View>
    );

}