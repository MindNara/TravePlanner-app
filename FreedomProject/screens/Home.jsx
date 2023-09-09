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

import { MyTrip, RecommendedTrip } from '../components/index';

export default function Home({ navigation }) {

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
            <View className="mx-[32px] pt-14 bg-white gap-y-[24px]">
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
                        <MyTrip navigation={navigation} />
                        <MyTrip navigation={navigation} />
                    </View>
                </View>

                {/* Recommended Trip */}
                <View className="bg-white h-auto w-full mb-5">
                    <View className="flex flex-row justify-between items-center">
                        <Text className="text-[20px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>Recommended Trip</Text>
                        <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptLight' }}>View all</Text>
                    </View>
                    <View className="mt-[20px] flex">
                        <RecommendedTrip navigation={navigation} />
                        <RecommendedTrip navigation={navigation} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});