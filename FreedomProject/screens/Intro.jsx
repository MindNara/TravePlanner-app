import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    Pressable
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';

export default function Intro({ navigation }) {

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
        <SafeAreaView className="container mx-auto h-full bg-white">
            <View className="h-[300px] w-full bg-black rounded-br-[100px]">
                <View className="mx-[32px] mt-14 h-full">
                    <Text className="text-[16px] text-white" style={{ fontFamily: 'promptLight' }}>freedom.</Text>
                    <Text className="text-[32px] text-white mt-[30px]" style={{ fontFamily: 'promptBold' }}>Plan your road trip</Text>
                    <Text className="text-[32px] text-white mt-[-12px]" style={{ fontFamily: 'promptBold' }}>with Freedom</Text>
                    <Text className="text-[15px] text-white mt-[10px]" style={{ fontFamily: 'promptRegular' }}>Find places, plan, and experience their own personalized trip in an easy way.</Text>
                </View>
            </View>
            <View className="bg-black w-full h-full">
                <View className="bg-white w-full h-full rounded-tl-[100px]">
                    <View className="pt-10 justify-center items-center">
                        <Image className="bg-cover rounded-[100px]" source={require('../assets/IntroImage.png')}
                            style={{ height: 420, width: 420 }} />
                    </View>
                    <Pressable className="mx-[32px] items-center flex flex-row justify-end gap-x-2"
                        onPress={() => {
                            navigation.navigate("SignUp");
                        }}>
                        <Text className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>Get Start</Text>
                        <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/90/2E2E2E/long-arrow-right.png' }}
                            style={{ width: 28, height: 28 }} />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});