import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    Button,
    Pressable
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';

export default function Profile({ navigation }) {
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
        <SafeAreaView className="container mx-auto h-full bg-blue-light " >
            <View className="absolute w-full h-[620px] bottom-0 bg-white rounded-t-[50px]">
                <View>
                    <View className="absolute w-[180px] h-[180px] bg-black rounded-full mt-[-90] ml-[105]" style={{ backgroundColor: "#F8F8F8" }}></View>
                    <View className="ml-[230] mt-2">
                        <View style={[styles.picbtn]} className="rounded-full">
                            <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/30/FFFFFF/edit-image.png' }}
                                style={{ width: 24, height: 24 }} />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View className="mt-8 ml-6 flex flex-row">
                            <Text className="text-[24px]" style={{ fontFamily: 'promptSemiBold' }}>USERNAME</Text>
                            <Image source={{ uri: 'https://img.icons8.com/material-sharp/24/1A1A1A/pencil--v1.png' }}
                                style={{ width: 24, height: 24 }} className="ml-2 mt-1" />
                        </View>
                        <View className="mt-8">
                            <View>
                                <TextInput className="relative px-6" style={[styles.input]}></TextInput>
                                <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Firstname</Text>
                            </View>
                            <View className="mt-6">
                                <TextInput className="relative px-6" style={[styles.input]}></TextInput>
                                <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Lastname</Text>
                            </View>
                            <View className="mt-6">
                                <TextInput className="relative px-6" style={[styles.input]}></TextInput>
                                <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Email</Text>
                            </View>
                            <View className="mt-6">
                                <TextInput className="relative px-6" style={[styles.input]}></TextInput>
                                <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Password</Text>
                            </View>
                            <View className="mt-[30px]">
                                <Pressable style={styles.button}>
                                    <Text className="text-[14px] tracking-[1px]" style={{ color: 'white', fontFamily: 'promptSemiBold' }}>SAVE</Text>
                                </Pressable>
                            </View>
                            <View className="mt-[16px]">
                                <Pressable style={styles.button2} className="border-[2px] border-red" onPress={() => {
                                    navigation.navigate("Intro");
                                }}>
                                    <Text className="text-[14px] tracking-[1px]" style={{ color: '#9A1B29', fontFamily: 'promptSemiBold' }}>LOG OUT</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
            {/* <Text >My Profile</Text> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    picbtn: {
        marginTop: 30,
        marginLeft: 8,
        height: 40,
        width: 40,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10
    },
    input: {
        fontSize: 18,
        fontWeight: "normal",
        borderWidth: 0.6,
        width: 320,
        height: 48,
        borderRadius: 10,
        borderColor: "#2E2E2E"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor: 'black',
    },
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor: 'white',

    },
});