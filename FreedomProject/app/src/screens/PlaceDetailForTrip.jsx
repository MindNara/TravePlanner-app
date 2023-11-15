import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    ImageBackground,
    ScrollView
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { db } from '../firebase/firebaseConfig';
import { query, where, doc, getDoc, collection, addDoc, updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { useSelector } from 'react-redux/es/hooks/useSelector';

export default function PlaceDetailForTrip({ route, navigation }) {

    const item = route.params.item;
    // console.log(item);

    const [placeItem, setPlaceItem] = useState([]);
    const fetchPlaces = () => {
        try {
            const placesRef = doc(db, 'places', item.key);

            const unsubscribePlace = onSnapshot(placesRef, (snapshot) => {
                if (snapshot.exists()) {
                    setPlaceItem(snapshot.data());
                } else {
                    console.log('No trip found with given docId');
                }
            });

            return unsubscribePlace;

        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    };

    useEffect(() => {
        const unsubscribePlace = fetchPlaces();
        return unsubscribePlace;
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const bottomSheetEditplace = useRef(null);
    const snapPointsEditplace = ["65%"];

    // Update places
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [address, setAddress] = useState('');
    const [openTime, setOpenTime] = useState(false);
    const [time, setTime] = useState();
    const [category, setCategory] = useState('');

    const categorys = ['Attraction', 'Restaurant', 'Accommodation', 'Other'];

    useEffect(() => {
        if (placeItem.place_title !== undefined && placeItem.place_description !== undefined
            && placeItem.place_address !== undefined && placeItem.place_time !== undefined
            && placeItem.place_category !== undefined
        ) {
            setTitle(placeItem.place_title);
            setDes(placeItem.place_description);
            setAddress(placeItem.place_address);
            setTime(placeItem.place_time);
            setCategory(placeItem.place_category)
        }
    }, [placeItem.place_title, placeItem.place_description,
    placeItem.place_address, placeItem.place_time, placeItem.place_category, placeItem]);

    // Check AM, PM
    const formatTime = (time) => {
        const timeParts = time.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);

        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);

        const formattedTime = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        return formattedTime;
    }

    const updatePlace = async () => {
        const placeRef = doc(db, 'places', item.key);
        try {
            await updateDoc(placeRef, {
                place_title: title,
                place_description: des,
                place_time: time,
                place_address: address,
                place_category: category,
            });
            console.log("Place update successfully");
            navigation.navigate("TripPlan", { tripKey: item.key });
        } catch (error) {
            console.log("Error adding document: ", error.message);
        } finally {
            bottomSheetEditplace.current?.close();
        }
    }

    const deletePlace = async () => {
        try {
            const placeRef = doc(db, 'places', item.key);
            await deleteDoc(placeRef);
            console.log('Place successfully deleted from Firestore');
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting place:', error);
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
        <GestureHandlerRootView className="relative container mx-auto h-full bg-white">
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetEditplace}
                    index={0}
                    snapPoints={snapPointsEditplace}
                    backgroundStyle={{ borderRadius: 50 }}
                    onDismiss={() => {
                        setIsOpen(false);
                        setOpenTime(false);
                    }}
                >
                    <View className="bg-white h-full mx-[32px] my-[24px]">
                        <BottomSheetScrollView>
                            {/* Add Trip */}
                            <View className="w-full bg-gray-light mb-5 rounded-[10px]">
                                <View className="bg-gray-light w-full h-auto rounded-[10px] relative">
                                    {openTime && (
                                        <DatePicker
                                            mode="time"
                                            minuteInterval={3}
                                            onTimeChange={selectedTime => {
                                                setTime(formatTime(selectedTime));
                                                setOpenTime(false);
                                            }}
                                            className="absolute w-[260px] z-10 left-8 top-10"
                                            style={{ borderRadius: 10 }}
                                        />
                                    )}
                                    <View className="m-[20px]">
                                        {/* Title */}
                                        <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-4 px-6 justify-center">
                                            <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>TITLE</Text>
                                            <TextInput className="text-[20px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }} placeholder="Trip Name"
                                                onChangeText={text => setTitle(text)} value={title}></TextInput>
                                        </View>

                                        {/* Time & Category */}
                                        <View className="flex flex-row justify-between mt-[15px]">
                                            <Pressable onPress={() => { setOpenTime(true) }} className="w-[140px] h-auto border-[0.6px] rounded-[10px] border-gray-dark py-3 px-6 justify-center">
                                                <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>TIME</Text>
                                                <Text multiline className="text-[14px] text-gray-dark leading-[18px] mt-2" style={{ fontFamily: 'promptSemiBold' }}
                                                >{time}</Text>
                                            </Pressable>
                                            <View className="w-[140px] h-auto border-[0.6px] rounded-[10px] border-gray-dark py-3 justify-center">
                                                <Text className="text-[12px] text-gray-dark opacity-80 px-6" style={{ fontFamily: 'promptMedium' }}>CATEGORY</Text>
                                                <SelectDropdown
                                                    data={categorys}
                                                    onSelect={(selectedItem, index) => {
                                                        setCategory(selectedItem);
                                                    }}
                                                    buttonStyle={{ backgroundColor: '#F8F8F8', width: 'auto', height: 26 }}
                                                    buttonTextStyle={{ fontSize: 14, fontFamily: 'promptMedium', textAlign: 'left', paddingLeft: 8 }}
                                                    defaultButtonText={item.place_category}
                                                    dropdownStyle={{ borderRadius: 10 }}
                                                    rowStyle={{ height: 40 }}
                                                    rowTextStyle={{ fontSize: 14, fontFamily: 'promptRegular', textAlign: 'left', paddingLeft: 16 }}
                                                />
                                            </View>
                                        </View>

                                        {/* Descriptions */}
                                        <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-4 px-6 justify-center mt-[15px]">
                                            <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>DESCRIPTIONS</Text>
                                            <TextInput multiline className="text-[14px] text-gray-dark leading-[18px] mt-2" style={{ fontFamily: 'promptSemiBold' }} placeholder="Descriptions"
                                                onChangeText={text => setDes(text)} value={des}></TextInput>
                                        </View>

                                        {/* Address */}
                                        <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-4 px-6 justify-center mt-[15px]">
                                            <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>ADDRESS</Text>
                                            <TextInput multiline className="text-[14px] text-gray-dark leading-[18px] mt-2" style={{ fontFamily: 'promptSemiBold' }} placeholder="Address"
                                                onChangeText={text => setAddress(text)} value={address}></TextInput>
                                        </View>

                                        {/* Btn */}
                                        <View className="flex flex-row justify-between items-center mt-[15px]">
                                            <Pressable onPress={() => updatePlace()} className="bg-gray-dark h-[36px] w-[180px] rounded-[10px] justify-center items-center">
                                                <Text className="text-[12px] text-white tracking-[1px]" style={{ fontFamily: 'promptMedium' }}>UPDATE</Text>
                                            </Pressable>
                                            <Pressable onPress={() => { deletePlace(); }} className="h-[36px] w-[100px] bg-red rounded-[10px] justify-center items-center">
                                                <Text className="text-[12px] text-white tracking-[1px]" style={{ fontFamily: 'promptMedium' }}>DELETE</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </BottomSheetScrollView>

                    </View>
                </BottomSheetModal>



                <ScrollView>
                    {/* Background Shadow */}
                    {isOpen && (
                        <Pressable onPress={() => {
                            setIsOpen(false);
                            bottomSheetEditplace.current?.close();
                        }} style={{ zIndex: 3 }} className="absolute h-full w-full bg-gray-dark opacity-30" />
                    )}

                    {/* Header & Image */}
                    <View className="w-full h-full bg-blue-light">
                        {placeItem.place_image != '' || item.place_image != '' ? (
                            <View>
                                <Image className="absolute w-[400px] h-[300px]" source={{ uri: placeItem.place_image }} />
                                <View className="w-[400px] h-[300px] bg-black absolute opacity-30"></View>
                            </View>) : (
                            <View>
                                <Image className="absolute w-[400px] h-[300px]" source={require('../assets/TripImage.png')} />
                                <View className="w-[400px] h-[300px] bg-black absolute opacity-30"></View>
                            </View>)
                        }
                        <View className="mx-[32px] pt-16 flex flex-row justify-between">
                            <Pressable onPress={() => {
                                navigation.goBack();
                            }}>
                                <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                                <Image className="absolute top-[6.5px] left-[5px]" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/back.png' }}
                                    style={{ width: 22, height: 22 }} />

                            </Pressable>
                            <View className="flex flex-row gap-x-[15px]">
                                {/* Image */}
                                <View>
                                    <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                                    <Image
                                        className="absolute top-[9px] left-2"
                                        source={{
                                            uri: "https://img.icons8.com/fluency-systems-regular/96/2E2E2E/image--v1.png",
                                        }}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                                {/* Menu */}
                                <Pressable onPress={() => {
                                    setIsOpen(true);
                                    bottomSheetEditplace.current?.present();
                                }}>
                                    <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                                    <Image
                                        className="absolute top-[8px] left-2"
                                        source={{
                                            uri: "https://img.icons8.com/ios-glyphs/90/2E2E2E/menu-2.png",
                                        }}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        {/* content */}
                        <View className="bottom-0 mt-40 bg-white w-full h-full rounded-t-[50px]">
                            <View className="mx-[32px] pt-16">
                                <View>
                                    <Text className="text-[28px] text-gray-dark mt-[-6px]" style={{ fontFamily: 'promptSemiBold' }}>{item.place_title}</Text>
                                    {item.place_description !== '' && (
                                        <Text className="text-[13px] text-gray-dark mt-[20px]" style={{ fontFamily: 'promptLight' }}>{item.place_description}</Text>
                                    )}
                                    <View className="flex flex-row items-center mt-[30px] gap-x-[16px]">
                                        <View className="justify-center items-center h-[45px] w-[45px] bg-gray-light rounded-3xl">
                                            <Image className="" source={{ uri: 'https://img.icons8.com/pastel-glyph/64/2E2E2E/shipping-location--v1.png' }}
                                                style={{ width: 20, height: 20 }} />
                                        </View>
                                        <Text className="text-[14px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>{item.place_category}</Text>
                                    </View>
                                    <View className="flex flex-row mt-[10px] items-center gap-x-[16px]">
                                        <View className="justify-center items-center h-[45px] w-[45px] bg-gray-light rounded-3xl">
                                            <Image className="" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/2E2E2E/map-marker.png' }}
                                                style={{ width: 22, height: 22 }} />
                                        </View>
                                        <Text className="text-[14px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>{item.place_address}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </BottomSheetModalProvider>

        </GestureHandlerRootView>
    );
}