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

export default function CreateTrip() {

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
        <SafeAreaView className="flex-1 items-center justify-center bg-white" >
            <Text >Create Trip</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});