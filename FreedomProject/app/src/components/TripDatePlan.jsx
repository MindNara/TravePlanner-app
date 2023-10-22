import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    ImageBackground,
    Pressable,
    FlatList
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';
import { db } from '../firebase/firebaseConfig';
import { query, where, doc, getDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deletePlaces } from '../redux/placesSlice';
import { useFocusEffect } from '@react-navigation/native';

export default function TripDatePlan({ navigation, item }) {

    const dispatch = useDispatch();
    const [isMenuPopup, setMenuPopup] = useState(false);
    console.log(item.key);

    useFocusEffect(
        React.useCallback(() => {
            setMenuPopup(false);
        }, [])
    );

    const deletePlace = async () => {
        try {
            const placesRef = doc(db, 'places', item.key);
            await deleteDoc(placesRef);
            dispatch(deletePlaces(item.key));
            console.log('Trip successfully deleted from Firestore');
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    };

    function menuPopup() {
        return (
            <View className="bg-gray-light absolute z-20 right-7 top-12 w-auto h-auto rounded-[5px] px-3 py-1">
                <Pressable className="p-1 flex flex-row items-center" onPress={() => { menuPopup() }}>
                    <Image className="mr-2" source={{ uri: 'https://img.icons8.com/fluency-systems-regular/48/create-new.png' }}
                        style={{ width: 15, height: 15 }} />
                    <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>Edit</Text>
                </Pressable>
                <Pressable className="p-1 flex flex-row items-center" onPress={() => { deletePlace() }}>
                    <Image className="mr-2" source={{ uri: 'https://img.icons8.com/fluency-systems-regular/9A1B29/48/filled-trash.png' }}
                        style={{ width: 15, height: 15 }} />
                    <Text className="text-[12px] text-red" style={{ fontFamily: 'promptMedium' }}>Delete</Text>
                </Pressable>
            </View>
        );
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
        <View className="flex flex-row">
            {/* Line */}
            <View className="bg-white w-[42px] h-auto items-center">
                <View className="items-center justify-center mb-2">
                    <View className="w-[16px] h-[16px] bg-gray-dark rounded-xl items-center justify-center border-collapse border-[1px]"></View>
                    <View className="w-[1.5px] h-[120px] bg-gray-dark my-1"></View>
                    <View className="w-[16px] h-[16px] rounded-xl items-center justify-center border-collapse border-[1px]"></View>
                </View>
            </View>

            {/* Plan event */}
            <View className="w-[290px] h-auto">
                <View className="h-40 mb-2">
                    <Pressable onPress={() => { navigation.navigate("PlaceDetailForTrip", { item: item }) }}>
                        <View className="bg-gray-dark h-auto rounded-[30px] p-6 mb-3">
                            <View className="flex flex-row items-center justify-between">
                                <View className="flex flex-row items-center">
                                    <View className="w-[20px] h-[20px] bg-gray-light rounded-[3px] justify-center items-center mr-3">
                                        <Image className="" source={{ uri: 'https://img.icons8.com/pastel-glyph/64/2E2E2E/shipping-location--v1.png' }}
                                            style={{ width: 12, height: 12 }} />
                                    </View>
                                    <Text className="text-[12px] text-gray-light" style={{ fontFamily: 'promptMedium' }}>{item.place_category}</Text>
                                </View>
                                <Pressable className="relative" onPress={() => { setMenuPopup(!isMenuPopup) }}>
                                    <Image className="" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/F8F8F8/menu-2.png' }}
                                        style={{ width: 20, height: 20 }} />
                                </Pressable>

                            </View>
                            <View className="flex flex-row justify-between items-center mt-3">
                                <Text className="text-[16px] text-gray-light" style={{ fontFamily: 'promptSemiBold' }}>{item.place_title}</Text>
                                <Text className="text-[12px] text-gray-light" style={{ fontFamily: 'promptRegular' }}>{item.place_time}</Text>
                            </View>
                            <Text className="text-[10px] text-gray-light mt-2 h-8" style={{ fontFamily: 'promptLight' }}>{item.place_description}</Text>
                        </View>
                    </Pressable>
                    {isMenuPopup && menuPopup()}
                </View>
            </View>
        </View>
    );

}