import React from 'react';
import {
    Button,
    SafeAreaView,
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';

export default function ExploreTrip() {

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
        <SafeAreaView className="container mx-auto bg-white">
            <View className="h-full mx-[26px] mt-10 bg-white">
                <View className="h-auto w-full flex flex-row justify-between items-center">
                    {/* title */}
                    <View>
                        <Text className="text-[20px] text-gray-dark" style={{ fontFamily: 'prompt' }}>Explore Places to</Text>
                        <Text className="text-[24px] mt-[-8px] text-gray-dark" style={{ fontFamily: 'prompt2' }}>Visit in Thailand</Text>
                    </View>
                    {/* noti & profile */}
                    <View className="flex flex-row justify-between items-center gap-3">
                        <Image source={{ uri: 'https://img.icons8.com/sf-regular/96/2E2E2E/appointment-reminders.png' }}
                            style={{ width: 22, height: 22 }} />
                        <Text className="w-[40px] h-[40px] bg-gray-dark rounded-lg"></Text>
                    </View>
                </View>

            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    tabBarIconCreate: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarIcon: {
        marginBottom: 6,
    },
    boxProfile: {
        backgroundColor: "black",
        width: 32,
        height: 32,
        borderRadius: 8
    }
});