import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    ImageBackground,
    Pressable
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';

export default function RecommendedTrip({ navigation }) {

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
        <SafeAreaView>
            <Pressable onPress={() => {
                navigation.navigate("TripDetail");
            }}>
                <View className="bg-gray-light w-[full] h-[120px] p-2 rounded-[20px] mb-4 flex flex-row items-center">
                    <View className="bg-blue-light w-[100px] h-[100px] rounded-[20px] mr-3"></View>
                    <View className="bg-gray-light w-[200px] h-full p-2 justify-center">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>Trip Name</Text>
                            <Image source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                                style={{ width: 18, height: 18 }} />
                        </View>
                        <View className="mt-2 w-[full]">
                            <Text className="text-[10px] leading-3 text-gray-dark" style={{ fontFamily: 'promptLight' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </SafeAreaView>
    );

}