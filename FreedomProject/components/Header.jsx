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

export default function Header({ title, subtitle }) {

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
            <View className="h-auto w-full flex flex-row justify-between items-center">
                {/* title */}
                <View>
                    <Text className="text-[26px] text-gray-dark" style={{ fontFamily: 'promptRegular' }}>{title}</Text>
                    <Text className="text-[30px] mt-[-10px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>{subtitle}</Text>
                </View>
                {/* noti & profile */}
                <View style={{ gap: title == "Explore Places to" ? 10 : 20 }} className="flex flex-row justify-between items-center">
                    <Image source={{ uri: 'https://img.icons8.com/sf-regular/96/2E2E2E/appointment-reminders.png' }}
                        style={{ width: 28, height: 28 }} />
                    <Text className="w-[56px] h-[56px] bg-gray-dark rounded-xl"></Text>
                </View>
            </View>
        </SafeAreaView>
    );

}