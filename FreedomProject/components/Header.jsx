import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    ImageBackground,
    Pressable,
    TextInput,
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';

export default function Header({ screen, title, subtitle, navigation }) {

    const [isNotiModel, setNotiModel] = useState(false);
    const [isProfileModel, setProfileModel] = useState(false);

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
                {/* Title */}
                <View>
                    <Text className="text-[26px] text-gray-dark" style={{ fontFamily: 'promptRegular' }}>{title}</Text>
                    <Text className="text-[30px] mt-[-10px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>{subtitle}</Text>
                </View>

                {/* Noti & Profile */}
                <View style={{ gap: screen == "ExploreTrip" ? 10 : 20 }} className="flex flex-row justify-between items-center">

                    {/* Notifiaction */}
                    <Pressable onPress={() => { setNotiModel(true) }}>
                        <Image source={{ uri: 'https://img.icons8.com/sf-regular/96/2E2E2E/appointment-reminders.png' }}
                            style={{ width: 28, height: 28 }} />
                    </Pressable>

                    {/* Profile */}
                    <Pressable onPress={() => { setProfileModel(true) }}>
                        <Text className="w-[56px] h-[56px] bg-gray-dark rounded-xl"></Text>
                    </Pressable>
                </View>
            </View>

            {/* Notification Content */}
            <View className="relative">
                {isNotiModel && (
                    <View className="bg-white h-[410px] w-[347px] p-8 justify-center absolute z-20 rounded-[20px] top-16">

                        {/* Header */}
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-[24px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>Notifications</Text>
                            <Pressable onPress={() => { setNotiModel(false) }}>
                                <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/90/2E2E2E/multiply.png' }}
                                    style={{ width: 26, height: 26 }} />
                            </Pressable>
                        </View>

                        {/* Content */}
                        <View className="bg-white w-full h-[250px] my-[20px]">
                            <ScrollView>
                                <View className="relative px-6 mt-1" style={[styles.input]}>
                                    <View className="absolute z-20 left-6 bottom-2 flex flex-row items-center w-full justify-between">
                                        <Text className="text-[14px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>Place Name</Text>
                                        <Text className="text-[10px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>09:15 AM</Text>
                                    </View>

                                    <Text className="text-[12px] z-10 text-gray-dark p-1 absolute top-[-13px] left-5 bg-white w-auto h-auto opacity-80" style={{ fontFamily: 'promptRegular' }}>TRIP NAME</Text>
                                </View>

                                <View className="relative px-6 mt-6" style={[styles.input]}>
                                    <View className="absolute z-20 left-6 bottom-2 flex flex-row items-center w-full justify-between">
                                        <Text className="text-[14px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>Place Name</Text>
                                        <Text className="text-[10px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>09:15 AM</Text>
                                    </View>

                                    <Text className="text-[12px] z-10 text-gray-dark p-1 absolute top-[-13px] left-5 bg-white w-auto h-auto opacity-80" style={{ fontFamily: 'promptRegular' }}>TRIP NAME</Text>
                                </View>

                                <View className="relative px-6 mt-6" style={[styles.input]}>
                                    <View className="absolute z-20 left-6 bottom-2 flex flex-row items-center w-full justify-between">
                                        <Text className="text-[14px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>Place Name</Text>
                                        <Text className="text-[10px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>09:15 AM</Text>
                                    </View>

                                    <Text className="text-[12px] z-10 text-gray-dark p-1 absolute top-[-13px] left-5 bg-white w-auto h-auto opacity-80" style={{ fontFamily: 'promptRegular' }}>TRIP NAME</Text>
                                </View>

                                <View className="relative px-6 mt-6" style={[styles.input]}>
                                    <View className="absolute z-20 left-6 bottom-2 flex flex-row items-center w-full justify-between">
                                        <Text className="text-[14px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>Place Name</Text>
                                        <Text className="text-[10px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>09:15 AM</Text>
                                    </View>

                                    <Text className="text-[12px] z-10 text-gray-dark p-1 absolute top-[-13px] left-5 bg-white w-auto h-auto opacity-80" style={{ fontFamily: 'promptRegular' }}>TRIP NAME</Text>
                                </View>

                                <View className="relative px-6 mt-6" style={[styles.input]}>
                                    <View className="absolute z-20 left-6 bottom-2 flex flex-row items-center w-full justify-between">
                                        <Text className="text-[14px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>Place Name</Text>
                                        <Text className="text-[10px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>09:15 AM</Text>
                                    </View>

                                    <Text className="text-[12px] z-10 text-gray-dark p-1 absolute top-[-13px] left-5 bg-white w-auto h-auto opacity-80" style={{ fontFamily: 'promptRegular' }}>TRIP NAME</Text>
                                </View>
                            </ScrollView>
                        </View>

                        {/* Footer */}
                        <Pressable>
                            <Text className="text-[14px] text-gray-dark underline" style={{ fontFamily: 'promptMedium' }}>Clear all</Text>
                        </Pressable>
                    </View>
                )}

                {/* Background */}
                {isNotiModel && (
                    <Pressable onPress={() => {
                        setNotiModel(false)
                    }} className="absolute h-[900px] w-[500px] bg-gray-dark opacity-30 z-10 left-[-40px] top-[-150px]" />
                )}
            </View>


            {/* Profile Model Content */}
            <View className="relative">
                {isProfileModel && (
                    <View className="bg-white h-[70px] w-[120px] px-[20px] justify-center absolute z-20 rounded-[5px] right-0 top-3">
                        <View className="bg-white h-3 w-3 rotate-45 absolute top-[-6] right-5 z-10"></View>

                        {/* Btn My Trips */}
                        <Pressable className="flex flex-row items-center" onPress={() => { navigation.navigate("MyDreamTrip") }}>
                            <Image className="mr-2" source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/2E2E2E/passenger-with-baggage.png' }}
                                style={{ width: 16, height: 16 }} />
                            <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>My Trips</Text>
                        </Pressable>

                        {/* Btn Log Out */}
                        <Pressable className="flex flex-row items-center mt-[6px]" onPress={() => { navigation.navigate("Intro") }}>
                            <Image className="mr-2" source={{ uri: 'https://img.icons8.com/fluency-systems-regular/96/2E2E2E/exit--v1.png' }}
                                style={{ width: 16, height: 16 }} />
                            <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>Log out</Text>
                        </Pressable>
                    </View>
                )}

                {/* Background */}
                {isProfileModel && (
                    <Pressable onPress={() => {
                        setProfileModel(false)
                    }} className="absolute h-[900px] w-[500px] bg-gray-dark opacity-30 z-10 left-[-40px] top-[-150px]" />
                )}
            </View>

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        fontWeight: "normal",
        borderWidth: 0.6,
        height: 40,
        borderRadius: 10,
        borderColor: "#2E2E2E"
    },
});