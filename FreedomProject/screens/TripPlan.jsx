import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    ImageBackground,
    ScrollView
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';
import { TripEventBox } from '../components/index';

export default function TripPlan({ navigation }) {

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
        <SafeAreaView className="relative container mx-auto h-full bg-white" >
            {/* Btn Create Trip */}
            <Pressable className="absolute z-10 bottom-10 right-10" onPress={() => {
                navigation.navigate("Home");
            }}>
                <View className="w-[46px] h-[46px] bg-gray-dark rounded-3xl fixed z-20 right-0 bottom-0 justify-center items-center shadow-lg shadow-gray-dark">
                    <Image className="" source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/F8F8F8/passenger-with-baggage.png' }}
                        style={{ width: 25, height: 25 }} />
                </View>
            </Pressable>

            <ScrollView>
                {/* Header & Image */}
                <View className="w-full h-auto pb-[40px] bg-blue-light rounded-b-[50px]">
                    <View className="mx-[32px] pt-16 flex flex-row justify-between">
                        {/* Home */}
                        <Pressable onPress={() => {
                            navigation.navigate("Home");
                        }}>
                            <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                            <Image className="absolute top-[7px] left-[8px]" source={{ uri: 'https://img.icons8.com/fluency-systems-regular/48/2E2E2E/home--v1.png' }}
                                style={{ width: 20, height: 20 }} />
                        </Pressable>
                        <View className="flex flex-row gap-x-[15px]">
                            {/* Image */}
                            <View>
                                <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                                <Image className="absolute top-[9px] left-2" source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/2E2E2E/image--v1.png' }}
                                    style={{ width: 20, height: 20 }} />
                            </View>
                            {/* Fav */}
                            <View>
                                <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                                <Image className="absolute top-[9px] left-2" source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                                    style={{ width: 20, height: 20 }} />
                            </View>
                            {/* Menu */}
                            <View>
                                <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                                <Image className="absolute top-[8px] left-2" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/2E2E2E/menu-2.png' }}
                                    style={{ width: 20, height: 20 }} />
                            </View>
                        </View>
                    </View>
                    {/* Title */}
                    <View className="mx-[32px] mt-[20px]">
                        <View className="flex flex-row items-center">
                            <Image className="mr-3" source={{ uri: 'https://img.icons8.com/metro/26/2E2E2E/tear-off-calendar.png' }}
                                style={{ width: 18, height: 18 }} />
                            <Text className="text-[14px] text-gray-dark opacity-80" style={{ fontFamily: 'promptSemiBold' }}>8/14 - 8/20</Text>
                        </View>
                        <Text className="text-[32px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>PROVINCE</Text>
                        <Text className="text-[14px] text-gray-dark leading-4 mt-2" style={{ fontFamily: 'promptLight' }}>Lorem ipsum dolor sit amet, conseco adipiscing eit sed do.</Text>
                    </View>
                </View>

                {/* Content */}
                <View className="mx-[32px] pt-[20px]">
                    {/* Calendar */}
                    <View className="bg-white h-[76px] flex flex-row">
                        <View className="bg-gray-dark h-[76px] w-[42px] rounded-[20px] shadow-lg shadow-black justify-center items-center mr-[10px]">
                            <Text className="text-[12px] text-gray-light" style={{ fontFamily: 'promptMedium' }}>14</Text>
                            <Text className="text-[12px] text-gray-light mb-[6px]" style={{ fontFamily: 'promptRegular' }}>Mon</Text>
                            <Text className="w-[5px] h-[5px] bg-white rounded-xl"></Text>
                        </View>
                        <View className="bg-gray-light h-[76px] w-[42px] rounded-[20px] justify-center items-center mr-[10px]">
                            <Text className="text-[12px] text-gray-dark opacity-60" style={{ fontFamily: 'promptMedium' }}>15</Text>
                            <Text className="text-[12px] text-gray-dark mb-[6px] opacity-60" style={{ fontFamily: 'promptRegular' }}>Tue</Text>
                            <Text className="w-[6px] h-[6px] rounded-xl opacity-60 border-[1px] border-gray-dark"></Text>
                        </View>
                        <View className="bg-gray-light h-[76px] w-[42px] rounded-[20px] justify-center items-center mr-[10px]">
                            <Text className="text-[12px] text-gray-dark opacity-60" style={{ fontFamily: 'promptMedium' }}>16</Text>
                            <Text className="text-[12px] text-gray-dark mb-[6px] opacity-60" style={{ fontFamily: 'promptRegular' }}>Wed</Text>
                            <Text className="w-[6px] h-[6px] rounded-xl opacity-60 border-[1px] border-gray-dark"></Text>
                        </View>
                    </View>

                    {/* Trip Plan */}
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
                            <View className="w-[16px] h-[16px] rounded-xl items-center justify-center border-collapse border-[1px]"></View>
                        </View>

                        {/* Plan */}
                        <View className="bg-white w-[295px] h-auto ml-3">
                            {/* Place */}
                            <TripEventBox />

                            {/* Restaurant */}
                            <View className="bg-gray-light h-auto rounded-[30px] p-6 mb-3">
                                <View className="flex flex-row items-center justify-between">
                                    <View className="flex flex-row items-center">
                                        <View className="w-[20px] h-[20px] bg-gray-dark rounded-[3px] justify-center items-center mr-3">
                                            <Image className="" source={{ uri: 'https://img.icons8.com/fluency-systems-filled/96/F8F8F8/restaurant.png' }}
                                                style={{ width: 14, height: 14 }} />
                                        </View>
                                        <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>RESTAURANT</Text>
                                    </View>
                                    <Image className="" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/2E2E2E/menu-2.png' }}
                                        style={{ width: 20, height: 20 }} />
                                </View>
                                <View className="flex flex-row justify-between items-center mt-3">
                                    <Text className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>Restaurant Name</Text>
                                    <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptRegular' }}>10:00 AM</Text>
                                </View>
                                <Text className="text-[10px] text-gray-dark mt-2" style={{ fontFamily: 'promptLight' }}>Lorem ipsum dolor sit amet, consecoert adipisciot eit sed do.</Text>
                            </View>

                            {/* Hotel */}
                            <View className="bg-gray-light h-auto rounded-[30px] p-6 mb-3">
                                <View className="flex flex-row items-center justify-between">
                                    <View className="flex flex-row items-center">
                                        <View className="w-[20px] h-[20px] bg-gray-dark rounded-[3px] justify-center items-center mr-3">
                                            <Image className="" source={{ uri: 'https://img.icons8.com/sf-regular-filled/48/F8F8F8/3-star-hotel.png' }}
                                                style={{ width: 14, height: 14 }} />
                                        </View>
                                        <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>HOTEL</Text>
                                    </View>
                                    <Image className="" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/2E2E2E/menu-2.png' }}
                                        style={{ width: 20, height: 20 }} />
                                </View>
                                <View className="flex flex-row justify-between items-center mt-3">
                                    <Text className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>Hotel Name</Text>
                                    <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptRegular' }}>12:00 PM</Text>
                                </View>
                                <Text className="text-[10px] text-gray-dark mt-2" style={{ fontFamily: 'promptLight' }}>Lorem ipsum dolor sit amet, consecoert adipisciot eit sed do.</Text>
                            </View>

                            {/* Hotel */}
                            <View className="bg-gray-light h-auto rounded-[30px] p-6 mb-3">
                                <View className="flex flex-row items-center justify-between">
                                    <View className="flex flex-row items-center">
                                        <View className="w-[20px] h-[20px] bg-gray-dark rounded-[3px] justify-center items-center mr-3">
                                            <Image className="" source={{ uri: 'https://img.icons8.com/sf-regular-filled/48/F8F8F8/3-star-hotel.png' }}
                                                style={{ width: 14, height: 14 }} />
                                        </View>
                                        <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>HOTEL</Text>
                                    </View>
                                    <Image className="" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/2E2E2E/menu-2.png' }}
                                        style={{ width: 20, height: 20 }} />
                                </View>
                                <View className="flex flex-row justify-between items-center mt-3">
                                    <Text className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>Hotel Name</Text>
                                    <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptRegular' }}>12:00 PM</Text>
                                </View>
                                <Text className="text-[10px] text-gray-dark mt-2" style={{ fontFamily: 'promptLight' }}>Lorem ipsum dolor sit amet, consecoert adipisciot eit sed do.</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}