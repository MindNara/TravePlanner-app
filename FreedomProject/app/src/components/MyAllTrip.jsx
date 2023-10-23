import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
import { firebase_auth, db } from '../firebase/firebaseConfig';
import { query, where, doc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function MyAllTrip({ navigation, item }) {
    // console.log("eiei");
    console.log(item);

    const [isMenuPopup, setMenuPopup] = useState(false);
    const tripEndDate = item.trip_end_date.slice(8);
    const tripStartDate = item.trip_start_date.slice(8);
    const differanceDate = parseInt(tripEndDate) - parseInt(tripStartDate) + 1;

    const [loaded] = useFonts({
        promptLight: require("../assets/fonts/Prompt-Light.ttf"),
        promptRegular: require("../assets/fonts/Prompt-Regular.ttf"),
        promptMedium: require("../assets/fonts/Prompt-Medium.ttf"),
        promptSemiBold: require("../assets/fonts/Prompt-SemiBold.ttf"),
        promptBold: require("../assets/fonts/Prompt-Bold.ttf"),
    });

    function menuPopup() {
        return (
            <View className="bg-gray-light absolute z-20 left-12 top-9 w-auto h-auto rounded-[5px] px-3 py-1">
                <Pressable className="p-1 flex flex-row items-center" onPress={delTrip}>
                    <Image className="mr-2" source={{ uri: 'https://img.icons8.com/fluency-systems-regular/9A1B29/48/filled-trash.png' }}
                        style={{ width: 15, height: 15 }} />
                    <Text className="text-[12px] text-red" style={{ fontFamily: 'promptMedium' }}>Delete</Text>
                </Pressable>
            </View>
        );
    }

    const delTrip = async () => {
        console.log("delete eiei")
        console.log(item.key);

        const documentRef = doc(db, 'trips', item.key);
        // console.log(documentRef.id);
        try {
            // console.log(documentRef);
            const placeQuery = query(collection(db, 'places'), where('trip_id', '==', item.key));
            const placeSnapshot = await getDocs(placeQuery);
            // console.log(placeSnapshot.doc.data());
            const myTrip = [];
            placeSnapshot.forEach((doc) => {
                myTrip.push({ ...doc.data(), key: doc.id }); // สั่งให้ลบ document นั้น
            });
            // console.log(myTrip);

            delPlaceInTrip(myTrip);
            await deleteDoc(documentRef);
            alert(`Trip deleted successfully.`);
        } catch (error) {
            console.error("Error deleting Trip:", error);
        }
    }

    const delPlaceInTrip = async (myTrip) => {
        console.log(myTrip);
        myTrip.forEach(async (trip) => {
            const tripRef = doc(db, 'places', trip.key);
            try {
                await deleteDoc(tripRef);
                console.log(`Document with ID ${trip.key} deleted successfully.`);
            } catch (error) {
                console.error("Error deleting document:", trip.key, error);
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            setMenuPopup(false);
        }, [])
    );

    if (!loaded) {
        return null;
    }

    return (
        <View className="m-1">
            <Pressable onPress={() => {
                navigation.navigate("TripPlan", { tripKey: item.key });
            }}>
                <ImageBackground className="relative h-[210px] w-[156px] justify-end items-center"
                    source={require('../assets/TripImage.png')} imageStyle={{ borderRadius: 20 }}>
                    {/* <Image className="absolute top-5 left-4" source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                        style={{ width: 20, height: 20 }} /> */}
                    <Pressable onPress={() => { setMenuPopup(!isMenuPopup) }}>
                        <Image className="relative top-[-90px] left-[60px]" source={{ uri: 'https://img.icons8.com/external-regular-kawalan-studio/24/external-kebab-menu-user-interface-regular-kawalan-studio.png' }}
                        style={{ width: 24, height: 24 }} />
                    </Pressable>
                    
                    <View className="relative bg-white opacity-40 w-[145px] h-[76px] mb-2 py-2 px-3 rounded-[20px] items-center" />
                    <View className="absolute w-[110px] h-[70px] px-1">
                        {/* <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptLight' }}>Province</Text> */}
                        <Text className="text-[16px] my-[-2px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>{item.trip_title}</Text>
                        <View className="flex flex-row mt-[3px] items-center">
                            <Image className="mr-[6px]" source={{ uri: 'https://img.icons8.com/metro/96/2E2E2E/tear-off-calendar.png' }}
                                style={{ width: 10, height: 10 }} />
                            <Text className="text-[8px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>
                            {differanceDate == 1 ? (
                                    item.trip_start_date.slice(5)
                                ) : (
                                    item.trip_start_date.slice(5) + " - " + item.trip_end_date.slice(5)
                            )}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </Pressable>
            {isMenuPopup && menuPopup()}
        </View>
    );

}