import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
import { useSelector } from "react-redux";
import { userSelector } from "../redux/usersSlice";
import { firebase_auth, db } from '../firebase/firebaseConfig';
import { updatePassword } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { usersId, usersLoading } from "../redux/usersSlice";

export default function Profile({ navigation }) {

    const user = useSelector(userSelector);
    const user_info = user.user_info;

    const dispatch = useDispatch();

    // console.log(user_info.user_lname);

    const [user_fname, setUser_fname] = useState(user_info.user_fname);
    const [user_lname, setUser_lname] = useState(user_info.user_lname);
    const [user_email, setUser_email] = useState(user_info.user_email);
    const [user_password, setUser_password] = useState(user_info.user_password);
    const [user_image, setUser_image] = useState("");
    const [user_username, setUser_username] = useState(user_info.user_username);
    const [isPressed, setIsPressed] = useState(false);
    console.log(isPressed);

    useFocusEffect(
        React.useCallback(() => {
            setIsPressed(false);
            setUser_password(user_info.user_password); // ตั้งค่า isPressed เป็น false ทุกครั้งที่หน้านี้ถูก focus
        }, [])
    );

    const [loaded] = useFonts({
        promptLight: require("../assets/fonts/Prompt-Light.ttf"),
        promptRegular: require("../assets/fonts/Prompt-Regular.ttf"),
        promptMedium: require("../assets/fonts/Prompt-Medium.ttf"),
        promptSemiBold: require("../assets/fonts/Prompt-SemiBold.ttf"),
        promptBold: require("../assets/fonts/Prompt-Bold.ttf"),
    });

    const changePassword = async () => {
        const user = firebase_auth.currentUser;
        try {
            await updatePassword(user, user_password)
            alert('Password updated successfully');
        } catch (error) {
            console.log(error);
            alert('Error updating password');
        }
        setIsPressed(false)
    };

    console.log(firebase_auth.currentUser);

    if (!loaded) {
        return null;
    }

    return (
        <View className="container mx-auto h-full bg-blue-light " >
            <View className="absolute w-full h-[620px] bottom-0 bg-white rounded-t-[50px]">
                {isPressed == false ? (
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
                            <TextInput className="text-[24px]" style={{ fontFamily: 'promptSemiBold', color: 'black' }} editable={false}  >{user_username}</TextInput>
                            <Pressable onPress={() => setIsPressed(true)}>
                                <Image source={{ uri: 'https://img.icons8.com/material-sharp/24/1A1A1A/pencil--v1.png' }}
                                    style={{ width: 24, height: 30 }} className="ml-2 mt-1" />
                            </Pressable>
                        </View>
                        <View className="mt-8">
                            <View>
                                <TextInput className="relative px-6 text-gray-dark" style={[styles.input]} value={user_fname} editable={false} ></TextInput>
                                <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Firstname</Text>
                            </View>
                            <View className="mt-6">
                                <TextInput className="relative px-6 text-gray-dark" style={[styles.input]} value={user_lname} editable={false} ></TextInput>
                                <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Lastname</Text>
                            </View>
                            <View className="mt-6">
                                <TextInput className="relative px-6 text-gray-dark" style={[styles.input]} value={user_email} editable={false} ></TextInput>
                                <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Email</Text>
                            </View>
                            <View className="mt-6">
                                <TextInput className="relative px-6 text-gray-dark" style={[styles.input]} value="*********" editable={false} ></TextInput>
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
                </View>) : (
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
                            <TextInput className="text-[24px]" style={{ fontFamily: 'promptSemiBold', color: 'black' }}  >{user_username}</TextInput>
                            <Pressable>
                                <Image source={{ uri: 'https://img.icons8.com/material-sharp/24/1A1A1A/pencil--v1.png' }}
                                    style={{ width: 24, height: 30 }} className="ml-2 mt-1" />
                            </Pressable>
                        </View>
                        <View className="mt-8">
                            <View>
                                <TextInput className="relative px-6 text-gray-dark" style={[styles.input]} value={user_fname} onChangeText={text => setUser_fname(text)} editable={true}></TextInput>
                                <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Firstname</Text>
                            </View>
                            <View className="mt-6">
                                <TextInput className="relative px-6 text-gray-dark" style={[styles.input]} value={user_lname} onChangeText={text => setUser_lname(text)} editable={true}></TextInput>
                                <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Lastname</Text>
                            </View>
                            <View className="mt-6">
                                <TextInput className="relative px-6 text-gray-dark" style={[styles.input]} value={user_email} onChangeText={text => setUser_email(text)} editable={true}></TextInput>
                                <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Email</Text>
                            </View>
                            <View className="mt-6">
                                <TextInput className="relative px-6 text-gray-dark" style={[styles.input]} value={user_password} onChangeText={text => setUser_password(text)} editable={true}></TextInput>
                                <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Password</Text>
                            </View>
                            <View className="mt-[30px]">
                                <Pressable style={styles.button}  onPress={changePassword}>
                                    <Text className="text-[14px] tracking-[1px]" style={{ color: 'white', fontFamily: 'promptSemiBold' }}>SAVE</Text>
                                </Pressable>
                            </View>
                            <View className="mt-[16px]">
                                <Pressable style={styles.button2} className="border-[2px] border-red" onPress={() => {
                                    dispatch(usersLoading());
                                    navigation.navigate("Intro");
                                }}>
                                    <Text className="text-[14px] tracking-[1px]" style={{ color: '#9A1B29', fontFamily: 'promptSemiBold' }}>LOG OUT</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </View>)}
            </View>
            {/* <Text >My Profile</Text> */}
        </View>
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