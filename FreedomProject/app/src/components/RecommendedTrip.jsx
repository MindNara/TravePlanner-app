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

export default function RecommendedTrip({ navigation, item }) {

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
        <View>
            <Pressable onPress={() => {
                navigation.navigate("TripDetail");
            }}>
                <View className="bg-gray-light w-[full] h-[120px] p-2 rounded-[20px] mb-4 flex flex-row items-center">
                    <Image source={{ uri: item.thumbnail_url }} className="bg-blue-light w-[100px] h-[100px] rounded-[20px] relative z-10"></Image>
                    <View className="bg-gray-dark w-[100px] h-[100px] rounded-[20px] opacity-10 absolute z-20 left-2"></View>
                    <View className="bg-gray-light w-[200px] h-full pl-3 justify-center">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>{item.route_name}</Text>
                            <Image source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                                style={{ width: 18, height: 18 }} className="ml-[-14] mt-[-60px]" />
                        </View>
                        <View className="mt-2 w-[full]">
                            <Text className="text-[10px] leading-3 text-gray-dark" style={{ fontFamily: 'promptLight' }}>{item.route_introduction}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    );

}