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

export default function RecommendedTrip({ navigation, item }) {

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
            <Pressable onPress={() => {
                navigation.navigate("TripDetail", { item: item });
            }}>
                <View className="bg-gray-light w-[full] h-[120px] rounded-[20px] mb-4 flex flex-row items-center">
                    {/* Image */}
                    <View className="relative w-[120px] h-full">
                        {item.thumbnail_url == ""? (<Image source={require('../assets/TripImage.png')}  className="w-full h-full rounded-[20px]" />) : (<Image source={{ uri: item.thumbnail_url }} className="w-full h-full rounded-[20px]" />)}  
                        <View className="bg-gray-dark w-full h-full rounded-[20px] opacity-10 absolute"></View>
                    </View>

                    {/* Title */}
                    <View className="w-[210px] h-full px-3 py-3 pt-5">
                        <View className="flex flex-row justify-between items-center h-[50px]">
                            <Text className="text-[16px] text-gray-dark leading-[23px] " style={{ fontFamily: 'promptSemiBold' }}>{item.route_name}</Text>
                        </View>
                        <View className="mt-2 w-[full]">
                            <Text className="text-[10px] leading-3 text-gray-dark" style={{ fontFamily: 'promptLight' }}>{item.route_introduction}</Text>
                        </View>
                    </View>
                </View>

                {/* Old Version */}
                {/* <View className="bg-gray-light w-[full] h-[120px] p-2 rounded-[20px] mb-4 flex flex-row items-center">
                    <Image source={{ uri: item.thumbnail_url }} className="bg-blue-light w-[100px] h-[100px] rounded-[20px] relative z-10"></Image>
                    <View className="bg-gray-dark w-[100px] h-[100px] rounded-[20px] opacity-10 absolute z-20 left-2"></View>
                    <View className="bg-gray-light w-[200px] h-full pl-3 justify-center">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>{item.route_name}</Text>
                            <Image source={{ uri: 'https://img.icons8.com/material-outlined/24/9a1b29/like--v1.png' }}
                                style={{ width: 20, height: 20 }} className="mt-[-40]" />
                        </View>
                        <View className="mt-2 w-[full]">
                            <Text className="text-[10px] leading-3 text-gray-dark" style={{ fontFamily: 'promptLight' }}>{item.route_introduction}</Text>
                        </View>
                    </View>
                </View> */}
            </Pressable>
        </View>
    );

}