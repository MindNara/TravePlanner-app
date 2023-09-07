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

// import fonts prompt
import {
    useFonts,
    Prompt_300Light,
    Prompt_400Regular,
    Prompt_500Medium,
    Prompt_600SemiBold,
    Prompt_700Bold,
} from '@expo-google-fonts/prompt';

export default function Home() {

    let [] = useFonts({
        Prompt_300Light,
        Prompt_400Regular,
        Prompt_500Medium,
        Prompt_600SemiBold,
        Prompt_700Bold,
    });

    return (
        <SafeAreaView className="container mx-auto bg-white">
            <ScrollView>
                <View className="h-full mx-[32px] mt-8 bg-white">
                    {/* Header */}
                    <View className="h-auto w-full flex flex-row justify-between items-center">
                        {/* title */}
                        <View>
                            <Text className="text-[20px] text-gray-dark" style={{ fontFamily: 'Prompt_400Regular' }}>Hello</Text>
                            <Text className="text-[24px] mt-[-8px] text-gray-dark" style={{ fontFamily: 'Prompt_600SemiBold' }}>Username</Text>
                        </View>
                        {/* noti & profile */}
                        <View className="flex flex-row justify-between items-center gap-5">
                            <Image source={{ uri: 'https://img.icons8.com/sf-regular/96/2E2E2E/appointment-reminders.png' }}
                                style={{ width: 22, height: 22 }} />
                            <Text className="w-[40px] h-[40px] bg-gray-dark rounded-lg"></Text>
                        </View>
                    </View>

                    {/* My Trip */}
                    <View className="bg-white h-auto w-full mt-[12px] mb-[20px]">
                        <Text className="text-[18px] text-gray-dark" style={{ fontFamily: 'Prompt_500Medium' }}>My Trips</Text>
                        <View className="mt-[10px] flex flex-row justify-between">
                            {/* Trip box 1 */}
                            <ImageBackground className="h-[160px] w-[126px] justify-end items-center"
                                source={require('../assets/TripImage.png')} imageStyle={{ borderRadius: 20 }}>
                                <View className="relative bg-white opacity-40 w-[110px] h-[70px] mb-2 py-2 px-3 rounded-[20px] items-center" />
                                <View className="absolute w-[110px] h-[70px] py-1 px-4">
                                    <Text className="text-[10px] text-gray-dark" style={{ fontFamily: 'Prompt_300Light' }}>Province</Text>
                                    <Text className="text-[14px] my-[-2px] text-gray-dark" style={{ fontFamily: 'Prompt_600SemiBold' }}>Trip Name</Text>
                                    <View className="flex flex-row mt-[3px] items-center">
                                        <Image className="mr-[6px]" source={{ uri: 'https://img.icons8.com/metro/96/2E2E2E/tear-off-calendar.png' }}
                                            style={{ width: 10, height: 10 }} />
                                        <Text className="text-[8px] text-gray-dark" style={{ fontFamily: 'Prompt_500Medium' }}>8/14 - 8/20</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                            {/* Trip box 2 */}
                            <ImageBackground className="h-[160px] w-[126px] justify-end items-center"
                                source={require('../assets/TripImage.png')} imageStyle={{ borderRadius: 20 }}>
                                <View className="relative bg-white opacity-40 w-[110px] h-[70px] mb-2 py-2 px-3 rounded-[20px] items-center" />
                                <View className="absolute w-[110px] h-[70px] py-1 px-4">
                                    <Text className="text-[10px] text-gray-dark" style={{ fontFamily: 'Prompt_300Light' }}>Province</Text>
                                    <Text className="text-[14px] my-[-2px] text-gray-dark" style={{ fontFamily: 'Prompt_600SemiBold' }}>Trip Name</Text>
                                    <View className="flex flex-row mt-[3px] items-center">
                                        <Image className="mr-[6px]" source={{ uri: 'https://img.icons8.com/metro/96/2E2E2E/tear-off-calendar.png' }}
                                            style={{ width: 10, height: 10 }} />
                                        <Text className="text-[8px] text-gray-dark" style={{ fontFamily: 'Prompt_500Medium' }}>8/14 - 8/20</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </View>

                    {/* Recommended Trip */}
                    <View className="bg-white h-auto w-full mb-5">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-[18px] text-gray-dark" style={{ fontFamily: 'Prompt_500Medium' }}>Recommended Trip</Text>
                            <Text className="text-[10px] text-gray-dark" style={{ fontFamily: 'Prompt_300Light' }}>View all</Text>
                        </View>
                        <View className="mt-[10px] flex">
                            {/* Recommended Trip box 1 */}
                            <View className="bg-gray-light w-full h-[120px] p-2 rounded-[20px] mb-3 flex flex-row items-center">
                                <View className="bg-blue-light w-[100px] h-[100px] rounded-[20px] mr-1"></View>
                                <View className="w-[150px] h-full p-2 justify-center">
                                    <View className="flex flex-row justify-between items-center">
                                        <Text className="text-[14px] text-gray-dark" style={{ fontFamily: 'Prompt_600SemiBold' }}>Trip Name</Text>
                                        <Image source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                                            style={{ width: 16, height: 16 }} />
                                    </View>
                                    <View className="mt-2 w-[full]">
                                        <Text className="text-[10px] leading-3 text-gray-dark" style={{ fontFamily: 'Prompt_300Light' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</Text>
                                    </View>
                                </View>
                            </View>
                            {/* Recommended Trip box 2 */}
                            <View className="bg-gray-light w-full h-[120px] p-2 rounded-[20px] mb-3 flex flex-row items-center">
                                <View className="bg-blue-light w-[100px] h-[100px] rounded-[20px] mr-1"></View>
                                <View className="w-[150px] h-full p-2 justify-center">
                                    <View className="flex flex-row justify-between items-center">
                                        <Text className="text-[14px] text-gray-dark" style={{ fontFamily: 'Prompt_600SemiBold' }}>Trip Name</Text>
                                        <Image source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                                            style={{ width: 16, height: 16 }} />
                                    </View>
                                    <View className="mt-2 w-[full]">
                                        <Text className="text-[10px] leading-3 text-gray-dark" style={{ fontFamily: 'Prompt_300Light' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</Text>
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