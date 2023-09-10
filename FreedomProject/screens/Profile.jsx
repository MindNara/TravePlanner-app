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

export default function Profile({ navigation}) {
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
            <View className="absolute w-full h-[600px] bottom-0 bg-white rounded-t-[50px]">
                <View>
                    <View className="absolute w-[180px] h-[180px] bg-black rounded-full mt-[-90] ml-[120]" style={{backgroundColor: "#F8F8F8"}}></View>
                    <View className="ml-[250] mt-2">
                        <View style={[styles.picbtn]} className="rounded-full">
                            <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/30/FFFFFF/edit-image.png' }}
                            style={{ width: 24, height: 24 }} />
                        </View>
                    </View>    
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <View className="mt-10 ml-6 flex flex-row">
                            <Text className="text-[24px]" style={{fontFamily: 'promptSemiBold'}}>USERNAME</Text>
                            <Image source={{ uri: 'https://img.icons8.com/material-sharp/24/1A1A1A/pencil--v1.png' }}
                                style={{ width: 24, height: 24 }} className="ml-2 mt-1" />
                        </View>
                        <View>
                            <Text className="text-[20px] p-1" style={{fontFamily: 'promptRegular'}}>Firstname</Text>
                            <TextInput style={[styles.input]}></TextInput>
                            <Text className="text-[20px] p-1" style={{fontFamily: 'promptRegular'}}>Lastname</Text>
                            <TextInput style={[styles.input]}></TextInput>
                            <Text className="text-[20px] p-1" style={{fontFamily: 'promptRegular'}}>Email</Text>
                            <TextInput style={[styles.input]}></TextInput>
                            <Text className="text-[20px] p-1" style={{fontFamily: 'promptRegular'}}>Password</Text>
                            <TextInput style={[styles.input]}></TextInput>
                            <View className="mt-5">
                                <Pressable style={styles.button}>
                                    <Text style={{color: 'white', fontFamily: 'promptRegular'}}>SAVE</Text>
                                </Pressable>
                            </View>
                            <View className="mt-3">
                                <Pressable style={styles.button2} className="border-2 border-red" onPress={() => {
                                navigation.navigate("Intro");
                                }}>
                                    <Text style={{color: '#9A1B29', fontFamily: 'promptRegular'}}>LOG OUT</Text>
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
        marginTop: 10,
        marginLeft: 5,
        height: 45,
        width: 45,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10
    },
    input: {
        fontSize: 18,
        fontWeight: "normal",
        borderWidth: 1,
        width: 320,
        height: 40,
        borderRadius: 10
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