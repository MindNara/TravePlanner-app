import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    ImageBackground,
    Pressable,
    FlatList
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';

export default function TripEventBox({ navigation, item }) {

    // console.log(item);

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
            <Pressable onPress={() => { navigation.navigate("PlaceDetail") }}>
                <View className="bg-gray-dark h-auto rounded-[30px] p-6 mb-3">
                    <View className="flex flex-row items-center justify-between">
                        <View className="flex flex-row items-center">
                            <View className="w-[20px] h-[20px] bg-gray-light rounded-[3px] justify-center items-center mr-3">
                                <Image className="" source={{ uri: 'https://img.icons8.com/pastel-glyph/64/2E2E2E/shipping-location--v1.png' }}
                                    style={{ width: 12, height: 12 }} />
                            </View>
                            <Text className="text-[12px] text-gray-light" style={{ fontFamily: 'promptMedium' }}>{item.place_category}</Text>
                        </View>
                        <Image className="" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/F8F8F8/menu-2.png' }}
                            style={{ width: 20, height: 20 }} />
                    </View>
                    <View className="flex flex-row justify-between items-center mt-3">
                        <Text className="text-[16px] text-gray-light" style={{ fontFamily: 'promptSemiBold' }}>{item.place_title}</Text>
                        <Text className="text-[12px] text-gray-light" style={{ fontFamily: 'promptRegular' }}>09:15 AM</Text>
                    </View>
                    <Text className="text-[10px] text-gray-light mt-2" style={{ fontFamily: 'promptLight' }}>{item.place_description}</Text>
                </View>
            </Pressable>
        </View>
    );

}

{/* Restaurant */ }
{/* <Pressable className="bg-gray-light h-auto rounded-[30px] p-6 mb-3"
onPress={() => { navigation.navigate("PlaceDetail") }}>
<View className="flex flex-row items-center justify-between">
    <View className="flex flex-row items-center">
        <View className="w-[20px] h-[20px] bg-gray-dark rounded-[3px] justify-center items-center mr-3">
            <Image
                className=""
                source={{
                    uri: "https://img.icons8.com/fluency-systems-filled/96/F8F8F8/restaurant.png",
                }}
                style={{ width: 14, height: 14 }}
            />
        </View>
        <Text
            className="text-[12px] text-gray-dark"
            style={{ fontFamily: "promptMedium" }}
        >
            RESTAURANT
        </Text>
    </View>
    <Image
        className=""
        source={{
            uri: "https://img.icons8.com/ios-glyphs/90/2E2E2E/menu-2.png",
        }}
        style={{ width: 20, height: 20 }}
    />
</View>
<View className="flex flex-row justify-between items-center mt-3">
    <Text
        className="text-[16px] text-gray-dark"
        style={{ fontFamily: "promptSemiBold" }}
    >
        Restaurant Name
    </Text>
    <Text
        className="text-[12px] text-gray-dark"
        style={{ fontFamily: "promptRegular" }}
    >
        10:00 AM
    </Text>
</View>
<Text
    className="text-[10px] text-gray-dark mt-2"
    style={{ fontFamily: "promptLight" }}
>
    Lorem ipsum dolor sit amet, consecoert adipisciot eit sed do.
</Text>
</Pressable> */}

{/* Hotel */ }
{/* <Pressable className="bg-gray-light h-auto rounded-[30px] p-6 mb-3"
onPress={() => { navigation.navigate("PlaceDetail") }}>
<View className="flex flex-row items-center justify-between">
    <View className="flex flex-row items-center">
        <View className="w-[20px] h-[20px] bg-gray-dark rounded-[3px] justify-center items-center mr-3">
            <Image
                className=""
                source={{
                    uri: "https://img.icons8.com/sf-regular-filled/48/F8F8F8/3-star-hotel.png",
                }}
                style={{ width: 14, height: 14 }}
            />
        </View>
        <Text
            className="text-[12px] text-gray-dark"
            style={{ fontFamily: "promptMedium" }}
        >
            HOTEL
        </Text>
    </View>
    <Image
        className=""
        source={{
            uri: "https://img.icons8.com/ios-glyphs/90/2E2E2E/menu-2.png",
        }}
        style={{ width: 20, height: 20 }}
    />
</View>
<View className="flex flex-row justify-between items-center mt-3">
    <Text
        className="text-[16px] text-gray-dark"
        style={{ fontFamily: "promptSemiBold" }}
    >
        Hotel Name
    </Text>
    <Text
        className="text-[12px] text-gray-dark"
        style={{ fontFamily: "promptRegular" }}
    >
        12:00 PM
    </Text>
</View>
<Text
    className="text-[10px] text-gray-dark mt-2"
    style={{ fontFamily: "promptLight" }}
>
    Lorem ipsum dolor sit amet, consecoert adipisciot eit sed do.
</Text>
</Pressable> */}