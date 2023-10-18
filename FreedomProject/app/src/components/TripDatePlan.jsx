import React from 'react';
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

export default function TripDatePlan({ navigation }) {



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
                <View className="w-[24px] h-[24px] rounded-xl items-center justify-center border-collapse border-[1px]">
                    <View className="bg-gray-dark w-[16px] h-[16px] rounded-xl"></View>
                </View>
                <View className="w-[1.5px] h-[120px] bg-gray-dark my-1"></View>
                <View className="w-[16px] h-[16px] rounded-xl items-center justify-center border-collapse border-[1px]"></View>
                <View className="w-[1.5px] h-[135px] bg-gray-dark my-1"></View>
                <View className="w-[16px] h-[16px] rounded-xl items-center justify-center border-collapse border-[1px]"></View>
                <View className="w-[1.5px] h-[135px] bg-gray-dark my-1"></View>
                {/* <View className="w-[16px] h-[16px] rounded-xl items-center justify-center border-collapse border-[1px]"></View> */}
            </View>

            {/* Plan event */}
            <View className="bg-white w-[295px] h-auto ml-3">
                {/* Place */}
                {/* <Pressable onPress={() => { navigation.navigate("PlaceDetail") }}> */}
                <TripEventBox navigation={navigation} />
                {/* </Pressable> */}
            </View>
        </View>
    );

}