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
                navigation.navigate("PlaceDetail");
            }}>
                <View style={[styles.boxPopular]}>
                    <View style={[styles.imgPopular]}>
                        <Image source={{ uri: item.thumbnail_url }}
                            style={{ width: 142, height: 160, borderRadius: 20 }} />
                        <View className="bg-gray-dark w-[142px] h-[160px] rounded-[20px] opacity-10 absolute z-20"></View>
                        <View style={[styles.btn]} className="absolute bg-white bottom-14 left-14">
                            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/9a1b29/like--v1.png' }}
                                style={{ width: 20, height: 20 }} />
                        </View>

                    </View>
                    <View className="top-16 right-1">
                        <Text className="text-[12px]" style={{ fontFamily: 'promptLight' }}>{item.location.province}</Text>
                        <Text className="text-[18px] h-7 w-[130px]" style={{ fontFamily: 'promptSemiBold' }}>{item.place_name}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    imgPopular: {
        height: 36,
        width: 50,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    boxPopular: {
        height: 240,
        width: 165,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 20,
        marginRight: 18,
    },
    btn: {
        height: 32,
        width: 32,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 50,
    },
});