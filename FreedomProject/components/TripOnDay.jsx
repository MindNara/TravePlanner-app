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

export default function RecommendedTrip({ navigation }) {

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
            <Pressable onPress={() => {
                // navigation.navigate("TripDetail");
            }}>
                <View className="bg-gray-light w-[320] h-[220px] p-2 rounded-[20px] mb-4">
                    <View className="flex flex-row ">
                        <Image source={require('../assets/TripImage.png')}
                        style={{ width: 145, height: 200, borderRadius: 20 }} />
                        <View className="pt-2">
                            <Image source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                                style={{ width: 20, height: 20 }} className="left-32"/>
                            <Text className="text-[16px] pl-3 top-[-2]" style={{ fontFamily: 'promptRegular'}}>PLACE</Text>
                            <Text className="text-[22px] pl-3 top-[-2]" style={{ fontFamily: 'promptSemiBold'}}>Place Name</Text>
                            <Text className="text-[12px] w-[160] pl-4 mt-2" style={{ fontFamily: 'promptLight' }}>Lorem ipsum dolor sit amet, consecoert adipisciot eit sed do.Lorem ipsum dolor sit amet.</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </SafeAreaView>
    );

}