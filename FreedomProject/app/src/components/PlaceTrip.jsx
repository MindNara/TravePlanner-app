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
    FlatList,
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';

export default function PlaceTrip({ navigation, item }) {

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
                navigation.navigate("PlaceDetail", { item: item });
            }}>
                <View className="h-[223px] w-[156px] bg-gray-light mr-[15px] rounded-[20px]">
                    {/* Image */}
                    <View className="relative w-full h-[160]">
                        {item.thumbnail_url == "" ? (<Image className="w-full h-full rounded-[20px]"
                            source={require('../assets/TripImage.png')} />) : (<Image className="w-full h-full rounded-[20px]"
                            source={{ uri: item.thumbnail_url }} />)}
                        
                        <View className="bg-gray-dark w-full h-full rounded-[20px] opacity-10 absolute z-20"></View>
                        <View style={[styles.btn]} className="absolute bg-white right-2 top-2 opacity-60"></View>
                        <Image className="absolute right-[15px] top-[15px]" source={{ uri: 'https://img.icons8.com/ios-filled/50/9a1b29/like--v1.png' }}
                            style={{ width: 16, height: 16 }} />
                    </View>

                    {/* Title */}
                    <View className="pt-[10px] pl-[12px]">
                        <Text className="text-[10px]" style={{ fontFamily: 'promptLight' }}>{item.location.province}</Text>
                        <Text className="text-[18px] h-7 w-[130px]" style={{ fontFamily: 'promptSemiBold' }}>{item.place_name}</Text>
                    </View>
                </View>

                {/* Old version */}
                {/* <View className="shadow-xl" style={[styles.boxPopular]}>
                    <View style={[styles.imgPopular]}>
                        <Image source={{ uri: item.thumbnail_url }}
                            style={{ width: 142, height: 160, borderRadius: 20 }} />
                        <View className="bg-gray-dark w-[142px] h-[160px] rounded-[20px] opacity-10 absolute z-20"></View>
                        <View style={[styles.btn]} className="absolute bg-white bottom-14 left-14 opacity-60"></View>
                        <Image className="absolute bottom-[62] left-[62]" source={{ uri: 'https://img.icons8.com/ios-filled/50/9a1b29/like--v1.png' }}
                            style={{ width: 20, height: 20 }} />
                    </View>
                    <View className="top-16 right-1">
                        <Text className="text-[12px]" style={{ fontFamily: 'promptLight' }}>{item.location.province}</Text>
                        <Text className="text-[18px] h-7 w-[130px]" style={{ fontFamily: 'promptSemiBold' }}>{item.place_name}</Text>
                    </View>
                </View> */}
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    boxPopular: {
        height: 240,
        width: 165,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 20,
        marginRight: 15,
    },
    imgPopular: {
        height: 36,
        width: 50,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    btn: {
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 50,
    },
});