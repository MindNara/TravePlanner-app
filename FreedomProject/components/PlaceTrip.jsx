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
        <SafeAreaView>
            <Pressable onPress={() => {
                navigation.navigate("PlaceDetail");
            }}>
                <View style={[styles.boxPopular]}>
                    <View style={[styles.imgPopular]}>
                        <Image source={{ uri: item.thumbnail_url }}
                            style={{ width: 142, height: 160, borderRadius: 20 }} />
                        <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/90/2E2E2E/like--v1.png' }}
                            style={{ width: 22, height: 22 }} className="absolute bottom-16 left-16" />
                    </View>
                    <View className="top-16 right-1">
                        <Text className="text-[12px]" style={{ fontFamily: 'promptLight' }}>{item.location.province}</Text>
                        <Text className="text-[18px] h-7 w-[130px]" style={{ fontFamily: 'promptSemiBold' }}>{item.place_name}</Text>
                    </View>
                </View>
            </Pressable>
        </SafeAreaView>
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
    }
});