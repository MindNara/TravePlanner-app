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

export default function MyTrip({ navigation }) {

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
                navigation.navigate("TripPlan");
            }}>
                <ImageBackground className="relative h-[210px] w-[156px] justify-end items-center"
                    source={require('../assets/TripImage.png')} imageStyle={{ borderRadius: 20 }}>
                    <View style={[styles.btn]} className="absolute bg-white top-[10] left-[110]">
                        <Image source={{ uri: 'https://img.icons8.com/material-outlined/24/9a1b29/like--v1.png' }}
                        style={{ width: 20, height: 20 }} />
                    </View>
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
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    btn: {
        height: 32,
        width: 32,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 50,
    },
});