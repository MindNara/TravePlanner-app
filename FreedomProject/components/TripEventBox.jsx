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

export default function TripEventBox({ navigation }) {

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
            <View className="bg-gray-dark h-auto rounded-[30px] p-6 mb-3">
                <View className="flex flex-row items-center justify-between">
                    <View className="flex flex-row items-center">
                        <View className="w-[20px] h-[20px] bg-gray-light rounded-[3px] justify-center items-center mr-3">
                            <Image className="" source={{ uri: 'https://img.icons8.com/pastel-glyph/64/2E2E2E/shipping-location--v1.png' }}
                                style={{ width: 12, height: 12 }} />
                        </View>
                        <Text className="text-[12px] text-gray-light" style={{ fontFamily: 'promptMedium' }}>PLACE</Text>
                    </View>
                    <Image className="" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/F8F8F8/menu-2.png' }}
                        style={{ width: 20, height: 20 }} />
                </View>
                <View className="flex flex-row justify-between items-center mt-3">
                    <Text className="text-[16px] text-gray-light" style={{ fontFamily: 'promptSemiBold' }}>Place Name</Text>
                    <Text className="text-[12px] text-gray-light" style={{ fontFamily: 'promptRegular' }}>09:15 AM</Text>
                </View>
                <Text className="text-[10px] text-gray-light mt-2" style={{ fontFamily: 'promptLight' }}>Lorem ipsum dolor sit amet, consecoert adipisciot eit sed do.</Text>
            </View>
        </SafeAreaView>
    );

}