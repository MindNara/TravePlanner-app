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
        <View className="flex flex-row">
            {/* Line */}
            <View className="bg-white w-[42px] h-auto items-center">
                <View className="items-center justify-center mb-2">
                    <View className="w-[16px] h-[16px] bg-gray-dark rounded-xl items-center justify-center border-collapse border-[1px]"></View>
                    <View className="w-[1.5px] h-[120px] bg-gray-dark my-1"></View>
                    <View className="w-[16px] h-[16px] rounded-xl items-center justify-center border-collapse border-[1px]"></View>
                </View>
            </View>

            {/* Plan event */}
            <View className="w-[290px] h-auto">
                <View className="h-40 mb-2">
                    <Pressable onPress={() => { navigation.navigate("PlaceDetailForTrip", { item: item }) }}>
                        <View className="bg-gray-dark h-auto rounded-[30px] p-6 mb-3">
                            <View className="flex flex-row items-center justify-between">
                                <View className="flex flex-row items-center">
                                    <View className="w-[20px] h-[20px] bg-gray-light rounded-[3px] justify-center items-center mr-3">
                                        <Image className="" source={{ uri: 'https://img.icons8.com/pastel-glyph/64/2E2E2E/shipping-location--v1.png' }}
                                            style={{ width: 12, height: 12 }} />
                                    </View>
                                    <Text className="text-[12px] text-gray-light" style={{ fontFamily: 'promptMedium' }}>{item.place_category}</Text>
                                </View>
                                <Image className="" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/F8F8F8/menu-2.png' }}
                                    style={{ width: 20, height: 20 }} />
                            </View>
                            <View className="flex flex-row justify-between items-center mt-3">
                                <Text className="text-[16px] text-gray-light" style={{ fontFamily: 'promptSemiBold' }}>{item.place_title}</Text>
                                <Text className="text-[12px] text-gray-light" style={{ fontFamily: 'promptRegular' }}>{item.place_time}</Text>
                            </View>
                            <Text className="text-[10px] text-gray-light mt-2 h-8" style={{ fontFamily: 'promptLight' }}>{item.place_description}</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    );

}