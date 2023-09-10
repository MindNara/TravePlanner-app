import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    TextInput
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
        <SafeAreaView className="container mx-auto h-full bg-blue-light " >
            <View className="h-full mx-[32px] pt-14">
                <Text className="text-[20px]" style={{fontFamily: "promptRegular"}}>Freedom.</Text>
                <Text className="text-[28px] pt-6" style={{fontFamily: "promptBold"}}>Let's Start</Text>
                <Text className="text-[28px]" style={{fontFamily: "promptBold"}}>your vacation !</Text>
            </View>
            
            <View className="absolute w-full h-[640px] bottom-0 bg-black rounded-t-[50px]">
                <Text className="text-[18px] mx-[98px] pt-3" style={{color: "white", fontFamily: "promptSemiBold"}}>Sign In to Your Account</Text>
            </View>
            <View className="absolute w-full h-[590px] bottom-0 bg-white rounded-t-[50px]">
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text className="text-[30px] p-1 mt-24" style={{fontFamily: 'promptBold'}}>WELCOME BACK</Text>
                    <View className="mt-4">
                        <Text className="text-[18px] p-1" style={{fontFamily: 'promptRegular'}}>Email</Text>
                        <TextInput style={[styles.input]}></TextInput>
                        <Text className="text-[18px] p-1" style={{fontFamily: 'promptRegular'}}>Password</Text>
                        <TextInput style={[styles.input]}></TextInput>
                        <View className="mt-8">
                            <Pressable style={styles.button} onPress={() => {
                                navigation.navigate("Content");
                            }}>
                                <Text style={{color: 'white', fontFamily: 'promptSemiBold'}} className="text-[18px]">SIGN IN</Text>
                            </Pressable>
                        </View>
                        <View className="mt-3 flex flex-row" style={{alignItems: 'center', justifyContent: 'center'}}>
                           <Text className="text-[18px]" style={{fontFamily: 'promptSemiBold'}}>Don't have an account?</Text>  
                           <Pressable onPress={() => {
                                navigation.navigate("SignUp");
                            }}>
                                <Text className="text-[18px] pl-2" style={{fontFamily: 'promptSemiBold', textDecorationLine:"underline"}}>Sign Up</Text> 
                            </Pressable>
                        </View>                
                    </View>
                </View>
            </View>
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
});