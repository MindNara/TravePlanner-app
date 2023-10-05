import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    TextInput,
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';

export default function CreateTrip({ navigation }) {

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
        <View className="container mx-auto h-full bg-gray-light" >
            <View className="w-full h-[250px] bg-blue-light">
                {/* Header */}
                <View className="mx-[32px] pt-16 flex flex-row justify-between items-center">
                    {/* Btn Back */}
                    <Pressable onPress={() => {
                        navigation.navigate("Home");
                    }}>
                        <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                        <Image className="absolute top-[6.5px] left-[5px]" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/back.png' }}
                            style={{ width: 22, height: 22 }} />
                    </Pressable>
                    {/* Title */}
                    <View className="items-end">
                        <Text className="text-[24px] text-gray-dark" style={{ fontFamily: 'promptRegular' }}>PLAN A</Text>
                        <Text className="text-[32px] text-gray-dark mt-[-12px]" style={{ fontFamily: 'promptSemiBold' }}>NEW TRIP</Text>
                    </View>
                </View>

                {/* Content */}
                <View className="mx-[32px] pt-8">
                    <View className="relative bg-white w-full h-auto rounded-[20px] shadow-lg shadow-black">
                        <View className="bg-white m-[30px]">
                            {/* Title */}
                            <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-5 px-6 justify-center">
                                <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>TITLE</Text>
                                <TextInput className="text-[20px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }} placeholder="Trip Name">Trip Name</TextInput>
                            </View>
                            {/* Date */}
                            <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark mt-[24px] py-6 px-6 flex flex-row justify-between items-center">
                                <View>
                                    <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>DEPARTURE</Text>
                                    <View className="flex flex-row items-center">
                                        <Text className="text-[15px] text-gray-dark mr-2" style={{ fontFamily: 'promptSemiBold' }}>14/08/2023</Text>
                                        <Image source={{ uri: 'https://img.icons8.com/metro/26/2E2E2E/tear-off-calendar.png' }}
                                            style={{ width: 14, height: 14 }} />
                                    </View>
                                </View>
                                <View>
                                    <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>RETURN</Text>
                                    <View className="flex flex-row items-center">
                                        <Text className="text-[15px] text-gray-dark mr-2" style={{ fontFamily: 'promptSemiBold' }}>20/08/2023</Text>
                                        <Image source={{ uri: 'https://img.icons8.com/metro/26/2E2E2E/tear-off-calendar.png' }}
                                            style={{ width: 14, height: 14 }} />
                                    </View>
                                </View>
                            </View>
                            {/* Descriptions */}
                            <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-5 px-6 justify-center mt-[24px]">
                                <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>DESCRIPTIONS</Text>
                                <TextInput multiline className="text-[15px] text-gray-dark leading-[18px] mt-2" style={{ fontFamily: 'promptSemiBold' }} placeholder="Descriptions">Lorem ipsum dolor sit amet, conseco adipiscing eit sed do.</TextInput>
                            </View>
                        </View>

                        {/* Background: Spot */}
                        {/* <View className="absolute bg-gray-light w-[20px] h-[20px] rounded-xl bottom-[100px] left-[-10]"></View> */}
                        <View className="absolute w-[327px] h-[1px] left-[10px] bottom-[110px] border-dashed border-[0.8px] border-gray-dark opacity-30"></View>
                        {/* <View className="absolute bg-gray-light w-[20px] h-[20px] rounded-xl bottom-[100px] right-[-10]"></View> */}

                        {/* Btn Start Planning */}
                        <Pressable onPress={() => {
                            navigation.navigate("TripPlan");
                        }} className="bg-gray-dark h-[50px] m-[30px] rounded-[10px] justify-center items-center">
                            <Text className="text-[12px] text-gray-light tracking-[2px]" style={{ fontFamily: 'promptMedium' }}>START PLANNING</Text>
                        </Pressable>

                        {/* Background: Spot */}
                        {/* <View className="absolute bg-gray-light w-[30px] h-[30px] rounded-2xl bottom-[-15px] left-[35px]"></View>
                        <View className="absolute bg-gray-light w-[30px] h-[30px] rounded-2xl bottom-[-15px] left-[85px]"></View>
                        <View className="absolute bg-gray-light w-[30px] h-[30px] rounded-2xl bottom-[-15px] left-[135px]"></View>
                        <View className="absolute bg-gray-light w-[30px] h-[30px] rounded-2xl bottom-[-15px] left-[185px]"></View>
                        <View className="absolute bg-gray-light w-[30px] h-[30px] rounded-2xl bottom-[-15px] left-[235px]"></View>
                        <View className="absolute bg-gray-light w-[30px] h-[30px] rounded-2xl bottom-[-15px] left-[285px]"></View> */}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
});