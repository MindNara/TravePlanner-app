import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    ImageBackground
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';

export default function Home() {

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
        <SafeAreaView className="container mx-auto h-full bg-white">
            <ScrollView>
                <View className="mx-[32px] pt-14 bg-white gap-y-[30px]">
                    {/* Header */}
                    <View className="h-auto w-full flex flex-row justify-between items-center">
                        {/* title */}
                        <View>
                            <Text className="text-[26px] text-gray-dark" style={{ fontFamily: 'promptRegular' }}>Hello</Text>
                            <Text className="text-[30px] mt-[-10px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>Username</Text>
                        </View>
                        {/* noti & profile */}
                        <View className="flex flex-row justify-between items-center gap-5">
                            <Image source={{ uri: 'https://img.icons8.com/sf-regular/96/2E2E2E/appointment-reminders.png' }}
                                style={{ width: 28, height: 28 }} />
                            <Text className="w-[56px] h-[56px] bg-gray-dark rounded-xl"></Text>
                        </View>
                    </View>

                    {/* My Trip */}
                    <View className="bg-white h-auto w-full mt-[12px] mb-[20px]">
                        <Text className="text-[20px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>My Trips</Text>
                        <View className="mt-[20px] flex flex-row justify-between">
                            {/* Trip box 1 */}
                            <ImageBackground className="h-[210px] w-[166px] justify-end items-center"
                                source={require('../assets/TripImage.png')} imageStyle={{ borderRadius: 20 }}>
                                <View className="relative bg-white opacity-40 w-[145px] h-[76px] mb-2 py-2 px-3 rounded-[20px] items-center" />
                                <View className="absolute w-[110px] h-[70px] px-1">
                                    <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptLight' }}>Province</Text>
                                    <Text className="text-[16px] my-[-2px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>Trip Name</Text>
                                    <View className="flex flex-row mt-[3px] items-center">
                                        <Image className="mr-[6px]" source={{ uri: 'https://img.icons8.com/metro/96/2E2E2E/tear-off-calendar.png' }}
                                            style={{ width: 10, height: 10 }} />
                                        <Text className="text-[8px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>8/14 - 8/20</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                            {/* Trip box 2 */}
                            <ImageBackground className="h-[210px] w-[166px] justify-end items-center"
                                source={require('../assets/TripImage.png')} imageStyle={{ borderRadius: 20 }}>
                                <View className="relative bg-white opacity-40 w-[145px] h-[76px] mb-2 py-2 px-3 rounded-[20px] items-center" />
                                <View className="absolute w-[110px] h-[70px] px-1">
                                    <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptLight' }}>Province</Text>
                                    <Text className="text-[16px] my-[-2px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>Trip Name</Text>
                                    <View className="flex flex-row mt-[3px] items-center">
                                        <Image className="mr-[6px]" source={{ uri: 'https://img.icons8.com/metro/96/2E2E2E/tear-off-calendar.png' }}
                                            style={{ width: 10, height: 10 }} />
                                        <Text className="text-[8px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>8/14 - 8/20</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </View>

                    {/* Recommended Trip */}
                    <View className="bg-white h-auto w-full mb-5">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-[20px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>Recommended Trip</Text>
                            <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptLight' }}>View all</Text>
                        </View>
                        <View className="mt-[20px] flex">
                            {/* Recommended Trip box 1 */}
                            <View className="bg-gray-light w-full h-[120px] p-2 rounded-[20px] mb-4 flex flex-row items-center">
                                <View className="bg-blue-light w-[100px] h-[100px] rounded-[20px] mr-3"></View>
                                <View className="bg-gray-light w-[212px] h-full p-2 justify-center">
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
                            {/* Recommended Trip box 2 */}
                            <View className="bg-gray-light w-full h-[120px] p-2 rounded-[20px] mb-4 flex flex-row items-center">
                                <View className="bg-blue-light w-[100px] h-[100px] rounded-[20px] mr-3"></View>
                                <View className="bg-gray-light w-[212px] h-full p-2 justify-center">
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
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});