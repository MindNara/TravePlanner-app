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

export default function TripOnDay({ navigation }) {

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
                navigation.navigate("PlaceDetail");
            }}>
                <View className="bg-gray-light w-[270px] h-[150px] rounded-[20px] ml-[20px] justify-center px-3">
                    <View className="flex flex-row">
                        {/* Image */}
                        <Image source={require('../assets/ExploreTripImage.png')}
                            style={{ width: 112, height: 128, borderRadius: 20 }} />
                        {/* Text */}
                        <View className="justify-center">
                            <View className="ml-[14px] w-[120px]">
                                <Text className="text-[10px]" style={{ fontFamily: 'promptMedium' }}>PLACE</Text>
                                <Text className="text-[16px] mt-[-2px]" style={{ fontFamily: 'promptSemiBold' }}>Place Name</Text>
                                <Text className="text-[8px] mt-[2px] leading-[12px]" style={{ fontFamily: 'promptLight' }}>Lorem ipsum dolor sit amet, of consecoert adipisciot eit sedry do. Ipsum dolor sit amet, geoe consecoert.</Text>
                            </View>
                        </View>
                        {/* Fav */}
                        <Image source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                            style={{ width: 16, height: 16 }} className="right-5 top-1" />
                    </View>
                </View>
            </Pressable>
        </View>
    );

}