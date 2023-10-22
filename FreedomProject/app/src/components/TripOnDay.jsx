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

export default function TripOnDay({ navigation, item }) {

    console.log(item);

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
                navigation.navigate("PlaceDetail", {item : item});
            }}>
                <View className="bg-gray-light w-[270px] h-[150px] rounded-[20px] ml-[20px] justify-center px-3 mb-4">
                    <View className="flex flex-row">
                        {/* Image */}
                        {item.thumbnail_url == ""? (<Image source={require('../assets/TripImage.png')} style={{ width: 112, height: 128, borderRadius: 20 }} />) : (<Image source={{ uri: item.thumbnail_url }} style={{ width: 112, height: 128, borderRadius: 20 }} />)}
                        {/* Text */}
                        <View className="justify-center">
                            <View className="ml-[14px] w-[120px]">
                                <Text className="text-[10px]" style={{ fontFamily: 'promptMedium' }}>{item.category_description}</Text>
                                <Text className="text-[16px] mt-[-2px]" style={{ fontFamily: 'promptSemiBold' }}>{item.place_name}</Text>
                                <Text className="text-[8px] mt-[2px] leading-[12px] h-[50]" style={{ fontFamily: 'promptLight' }}>{item.place_introduction}</Text>
                            </View>
                        </View>
                        {/* Fav */}
                        {/* <Image source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                            style={{ width: 16, height: 16 }} className="right-5 top-1" /> */}
                    </View>
                </View>
            </Pressable>
        </View>
    );

}