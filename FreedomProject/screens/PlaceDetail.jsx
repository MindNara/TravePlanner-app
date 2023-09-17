import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    ImageBackground
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';

export default function PlaceDetail({ navigation }) {

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
            {/* Header & Image */}
            <View className="relative w-full h-[420px] bg-blue-light">
                {/* <Image className="absolute w-full h-full" source={require('../assets/IntroImage.png')} /> */}
                <View className="mx-[32px] pt-16 flex flex-row justify-between">
                    <Pressable onPress={() => {
                        navigation.goBack();
                    }}>
                        <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                        <Image className="absolute top-[6.5px] left-[5px]" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/back.png' }}
                            style={{ width: 22, height: 22 }} />
                    </Pressable>
                    <View>
                        <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                        <Image className="absolute top-[9px] left-2" source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                            style={{ width: 20, height: 20 }} />
                    </View>
                </View>
            </View>
            {/* Content */}
            <View className="absolute bottom-0 bg-white w-full h-[500px] rounded-t-[50px]">
                <View className="mx-[32px] pt-16">
                    <View>
                        <Text className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptRegular' }}>PROVINCE</Text>
                        <Text className="text-[32px] text-gray-dark mt-[-6px]" style={{ fontFamily: 'promptSemiBold' }}>Place Name</Text>
                        <Text className="text-[13px] text-gray-dark mt-[20px] leading-4" style={{ fontFamily: 'promptLight' }}>Lorem ipsum dolor sit amet, consectetur adipiscing eli, sed do eiusmod tempor incididunt ut labore et dolore magna elit, sed do eiusmod tempor incididunt ut labor et dolore magna eiusmod tempor eopo.</Text>
                    </View>
                    <View className="flex flex-row mt-[30px] items-center gap-x-[16px]">
                        <View className="justify-center items-center h-[45px] w-[45px] bg-gray-light rounded-3xl">
                            <Image className="" source={{ uri: 'https://img.icons8.com/pastel-glyph/64/2E2E2E/shipping-location--v1.png' }}
                                style={{ width: 20, height: 20 }} />
                        </View>
                        <Text className="text-[14px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>LOCATION TYPE</Text>
                    </View>
                    <View className="flex flex-row mt-[10px] items-center gap-x-[16px]">
                        <View className="justify-center items-center h-[45px] w-[45px] bg-gray-light rounded-3xl">
                            <Image className="" source={{ uri: 'https://img.icons8.com/material-rounded/96/2E2E2E/retro-alarm-clock.png' }}
                                style={{ width: 20, height: 20 }} />
                        </View>
                        <Text className="text-[14px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>OFFICE HOURS</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});