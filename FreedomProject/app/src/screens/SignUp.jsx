import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    TextInput,
    Alert
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';
import { firebase_auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase/firebaseConfig';
import { setDoc, doc, getFirestore, collection, addDoc } from 'firebase/firestore';

export default function Intro({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;

    const db = getFirestore();

    const signUp = async () => {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            // console.log(response);
            const user_id = response.user.uid;
            // setUserId(user_id);
            console.log(user_id);

            const userDocRef = doc(db, 'users', user_id);  // กำหนด path สำหรับ document
            await setDoc(userDocRef, {
                user_email: email,
                user_fname: firstname,
                user_lname: lastname,
                user_image: '',
                user_password: password,
                user_username: username,
            });
            navigation.navigate("SignIn");
            alert('Sign Up Complete');
            addTrip(user_id);
        }
        catch (error) {
            console.log(error);
            alert('Sign Up Fail', error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const addTrip = async (userId) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const formattedDate = `${year}/${month}/${day}`;
        console.log("User ID of Trip: " + userId);

        try {
            const tripRef = await addDoc(collection(db, "trips"), {
                trip_title: 'Test',
                trip_description: 'Description',
                trip_start_date: formattedDate,
                trip_end_date: formattedDate,
                trip_image: '',
                user_id: userId
            });
        } catch (e) {
            alert("Error", "Error adding document: ", e.message);
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
                <Text className="text-[32px] mt-[30px]" style={{ fontFamily: "promptBold" }}>Enjoy the trip</Text>
                <Text className="text-[32px] mt-[-12px]" style={{ fontFamily: "promptBold" }}>with me !</Text>
            </View>

            <View className="absolute w-full h-[600px] bottom-0 bg-black rounded-t-[50px] items-center">
                <Text className="text-[18px] py-3 tracking-[1px]" style={{ color: "white", fontFamily: "promptSemiBold" }}>Create New Account</Text>
            </View>
            <View className="absolute w-full h-[550px] bottom-0 bg-white rounded-t-[50px]">
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View className="mt-16">
                        <View>
                            <TextInput value={firstname} onChangeText={text => setFirstname(text)} className="relative px-6" style={[styles.input]}></TextInput>
                            <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Firstname</Text>
                        </View>
                        <View className="mt-6">
                            <TextInput value={lastname} onChangeText={text => setLastname(text)} className="relative px-6" style={[styles.input]}></TextInput>
                            <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Lastname</Text>
                        </View>
                        <View className="mt-6">
                            <TextInput value={username} onChangeText={text => setUsername(text)} className="relative px-6" style={[styles.input]}></TextInput>
                            <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Username</Text>
                        </View>
                        <View className="mt-6">
                            <TextInput value={email} onChangeText={text => setEmail(text)} className="relative px-6" style={[styles.input]}></TextInput>
                            <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Email</Text>
                        </View>
                        <View className="mt-6">
                            <TextInput value={password} onChangeText={text => setPassword(text)} className="relative px-6" style={[styles.input]}></TextInput>
                            <Text className="text-[16px] text-gray-dark p-1 absolute top-[-15px] left-5 bg-white w-auto h-auto" style={{ fontFamily: 'promptRegular' }}>Password</Text>
                        </View>
                        <View className="mt-8">
                            <Pressable style={styles.button} onPress={() => {
                                signUp();
                            }}>
                                <Text style={{ color: 'white', fontFamily: 'promptSemiBold' }} className="text-[16px] tracking-[1px]">SIGN UP</Text>
                            </Pressable>
                        </View>
                        <View className="mt-[15px] flex flex-row" style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text className="text-[15px]" style={{ fontFamily: 'promptRegular' }}>Already have an account?</Text>
                            <Pressable onPress={() => {
                                navigation.navigate("SignIn");
                            }}>
                                <Text className="text-[15px] pl-2" style={{ fontFamily: 'promptMedium', textDecorationLine: "underline" }}>Sign In</Text>
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