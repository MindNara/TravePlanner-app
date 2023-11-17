import React, { useState } from 'react';
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
import { fas } from '@fortawesome/free-solid-svg-icons';
import { firebase_auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { usersId, usersLoading } from "../redux/usersSlice";

export default function SingIn({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');

    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;

    const dispatch = useDispatch();

    const signIn = async () => {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const user_id = response.user.uid;
            setUserId(user_id);
            dispatch(usersId(user_id));
            dispatch(usersLoading());
            // console.log(user_id);
            alert('Sign In Complete');
            navigation.navigate('Content');
        }
        catch (error) {
            console.log(error);
            alert('Sign In Fail');
        }
        finally {
            setLoading(false);
        }
    }

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
        <View className="container mx-auto h-full bg-blue-light " >
            <View className="h-full mx-[32px] pt-14">
                <Text className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptRegular' }}>freedom.</Text>
                <Text className="text-[32px] mt-[30px]" style={{ fontFamily: "promptBold" }}>Let's Start</Text>
                <Text className="text-[32px] mt-[-12px]" style={{ fontFamily: "promptBold" }}>your vacation !</Text>
            </View>

            <View className="absolute w-full h-[600px] bottom-0 bg-black rounded-t-[50px]">
                <Text className="text-[18px] mx-[80px] pt-3 tracking-[1px] w-full" style={{ color: "white", fontFamily: "promptSemiBold" }}>Sign In to Your Account</Text>
            </View>
            <View className="absolute w-full h-[550px] bottom-0 bg-white rounded-t-[50px]">
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text className="text-[30px] p-1 mt-24 tracking-[1px]" style={{ fontFamily: 'promptSemiBold' }}>WELCOME BACK</Text>
                    <View className="mt-4">
                        <View className="mt-6">
                            <TextInput value={email} onChangeText={text => setEmail(text)} className="relative px-6" style={[styles.input]}></TextInput>
                            <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }} >Email</Text>
                        </View>
                        <View className="mt-6">
                            <TextInput value={password} onChangeText={text => setPassword(text)} className="relative px-6" style={[styles.input]}></TextInput>
                            <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Password</Text>
                        </View>
                        <View className="mt-8">
                            <Pressable style={styles.button} onPress={signIn}>
                                <Text style={{ color: 'white', fontFamily: 'promptSemiBold' }} className="text-[16px] tracking-[1px]">SIGN IN</Text>
                            </Pressable>
                        </View>
                        <View className="mt-[15px] flex flex-row" style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text className="text-[15px]" style={{ fontFamily: 'promptRegular' }}>Don't have an account?</Text>
                            <Pressable onPress={() => {
                                navigation.navigate("SignUp");
                            }}>
                                <Text className="text-[15px] pl-2" style={{ fontFamily: 'promptMedium', textDecorationLine: "underline" }}>Sign Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
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
        borderWidth: 0.6,
        width: 320,
        height: 48,
        borderRadius: 10,
        borderColor: "#2E2E2E"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor: 'black',
    },
});