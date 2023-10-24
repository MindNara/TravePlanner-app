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

export default function MyTripDefault({ navigation, item }) {

    // console.log(item.key);

    // const tripEndDate = item.trip_end_date.slice(8);
    // const tripStartDate = item.trip_start_date.slice(8);
    // const differanceDate = parseInt(tripEndDate) - parseInt(tripStartDate) + 1;
    // console.log(differanceDate);

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
        <View className="mr-4">
            <Pressable onPress={() => {
                navigation.navigate("CreateTrip");
            }}>
                <ImageBackground className="relative h-[210px] w-[156px] justify-center items-center"
                    source={require('../assets/TripImage.png')} imageStyle={{ borderRadius: 20 }}>
                    <View className="bg-gray-dark w-full h-full absolute rounded-[20px] opacity-20"></View>
                    <ImageBackground source={{ uri: 'https://img.icons8.com/sf-black-filled/128/B3D7E7/filled-circle.png' }}
                        style={[{ width: 62, height: 60 }, styles.tabBarIconCreate]}>
                        <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/90/FFFFFF/plus-math.png' }}
                            style={{ width: 18, height: 18 }} />
                    </ImageBackground>
                    <Text className="text-[12px] text-gray-light" style={{ fontFamily: 'promptRegular' }}>Create Trip</Text>
                </ImageBackground>
            </Pressable>
        </View>
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
});