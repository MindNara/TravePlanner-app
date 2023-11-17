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
import DatePicker, { getToday } from 'react-native-modern-datepicker';
import { db, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from '../firebase/firebaseConfig';
import { useSelector } from "react-redux";
import { userSelector } from "../redux/usersSlice";
import { useDispatch } from "react-redux";
import { tripSelector } from '../redux/tripsSlice';

const CreateTrip = ({ navigation }) => {

    const dispatch = useDispatch();
    const dateToday = getToday();
    const [isOpen, setIsOpen] = useState(false);
    const [openDep, setOpenDap] = useState(false);
    const [openRet, setOpenRet] = useState(false);

    const [title, setTiltle] = useState('');
    const [des, setDes] = useState('');
    const [selectedDateDep, setSelectedDateDep] = useState(dateToday);
    const [selectedDateRet, setSelectedDateRet] = useState(dateToday);

    const user = useSelector(userSelector);
    const user_id = user.user_id;

    const trip = useSelector(tripSelector);
    const tripsItem = trip.trips;

    // POST
    const addTrip = async () => {

        try {
            // save trips
            const tripRef = await addDoc(collection(db, "trips"), {
                trip_title: title,
                trip_description: des,
                trip_start_date: selectedDateDep,
                trip_end_date: selectedDateRet,
                trip_image: '',
                user_id: user_id
            });
            const tripKey = tripRef.id;
            navigation.navigate('TripPlan', { tripKey: tripKey });
        } catch (e) {
            Alert.alert("Error", "Error adding document: ", e.message);
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
        <View className="container mx-auto h-full bg-gray-light" >
            <View className="w-full h-[250px] bg-blue-light">
                {/* Header */}
                <View className="mx-[32px] pt-16 flex flex-row justify-between items-center">
                    {/* Btn Back */}
                    <Pressable onPress={() => {
                        navigation.navigate("Home");
                    }}>
                        <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                        <Image className="absolute top-[6.5px] left-[5px]" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/back.png' }}
                            style={{ width: 22, height: 22 }} />
                    </Pressable>
                    {/* Title */}
                    <View className="items-end">
                        <Text className="text-[24px] text-gray-dark" style={{ fontFamily: 'promptRegular' }}>PLAN A</Text>
                        <Text className="text-[32px] text-gray-dark mt-[-12px]" style={{ fontFamily: 'promptSemiBold' }}>NEW TRIP</Text>
                    </View>
                </View>

                {/* Content */}
                <View className="mx-[32px] pt-8">
                    <View className="relative bg-white w-full h-auto rounded-[20px] shadow-lg shadow-[#2E2E2E]">
                        <View className="bg-white m-[20px]">
                            {/* Title */}
                            <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-5 px-6 justify-center">
                                <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>TITLE</Text>
                                <TextInput className="text-[20px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }} placeholder="Trip Name"
                                    value={title} onChangeText={text => setTiltle(text)} ></TextInput>
                            </View>
                            {/* Date */}
                            <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark mt-[24px] py-6 px-6 flex flex-row justify-between items-center">
                                <View>
                                    <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>DEPARTURE</Text>
                                    <Pressable className="flex flex-row items-center"
                                        onPress={() => {
                                            setIsOpen(true);
                                            setOpenDap(true);
                                        }}>
                                        <Text className="text-[15px] text-gray-dark mr-2" style={{ fontFamily: 'promptSemiBold' }}>{selectedDateDep}</Text>
                                        <Image source={{ uri: 'https://img.icons8.com/metro/26/2E2E2E/tear-off-calendar.png' }}
                                            style={{ width: 14, height: 14 }} />
                                    </Pressable>
                                </View>
                                <View>
                                    <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>RETURN</Text>
                                    <Pressable className="flex flex-row items-center"
                                        onPress={() => {
                                            setIsOpen(true);
                                            setOpenRet(true);
                                        }}>
                                        <Text className="text-[15px] text-gray-dark mr-2" style={{ fontFamily: 'promptSemiBold' }}>{selectedDateRet}</Text>
                                        <Image source={{ uri: 'https://img.icons8.com/metro/26/2E2E2E/tear-off-calendar.png' }}
                                            style={{ width: 14, height: 14 }} />
                                    </Pressable>
                                </View>
                            </View>
                            {/* Descriptions */}
                            <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-5 px-6 justify-center mt-[24px]">
                                <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>DESCRIPTIONS</Text>
                                <TextInput multiline className="text-[15px] text-gray-dark leading-[18px] mt-2" style={{ fontFamily: 'promptSemiBold' }} placeholder="Descriptions"
                                    value={des} onChangeText={text => setDes(text)} ></TextInput>
                            </View>
                        </View>

                        {/* Background: Spot */}
                        {/* <View className="absolute bg-gray-light w-[20px] h-[20px] rounded-xl bottom-[100px] left-[-10]"></View> */}
                        <View className="absolute w-[310px] h-[1px] left-[10px] bottom-[90px] border-dashed border-[0.8px] border-gray-dark opacity-30"></View>
                        {/* <View className="absolute bg-gray-light w-[20px] h-[20px] rounded-xl bottom-[100px] right-[-10]"></View> */}

                        {/* Btn Start Planning */}
                        <Pressable onPress={() => { addTrip() }} className="bg-gray-dark h-[50px] m-[20px] rounded-[10px] justify-center items-center">
                            <Text className="text-[12px] text-gray-light tracking-[2px]" style={{ fontFamily: 'promptMedium' }}>START PLANNING</Text>
                        </Pressable>

                        {/* Background: Spot */}
                        {/* <View className="absolute bg-gray-light w-[30px] h-[30px] rounded-2xl bottom-[-15px] left-[35px]"></View>
                        <View className="absolute bg-gray-light w-[30px] h-[30px] rounded-2xl bottom-[-15px] left-[85px]"></View>
                        <View className="absolute bg-gray-light w-[30px] h-[30px] rounded-2xl bottom-[-15px] left-[135px]"></View>
                        <View className="absolute bg-gray-light w-[30px] h-[30px] rounded-2xl bottom-[-15px] left-[185px]"></View>
                        <View className="absolute bg-gray-light w-[30px] h-[30px] rounded-2xl bottom-[-15px] left-[235px]"></View>
                        <View className="absolute bg-gray-light w-[30px] h-[30px] rounded-2xl bottom-[-15px] left-[285px]"></View> */}
                    </View>
                </View>
            </View>

            {/* Date Picker */}
            {isOpen && (
                <View className="relative w-full h-full bottom-[250px]">
                    <Pressable
                        onPress={() => {
                            setIsOpen(false)
                            setOpenDap(false)
                            setOpenRet(false)
                        }}
                        style={{ zIndex: 1 }} className="absolute h-full w-full bg-gray-dark opacity-30" />

                    {openDep && (
                        <View className="absolute z-10 w-[83%] h-auto">
                            <View className="mx-[32px] left-[10%] top-[68%]">
                                <DatePicker
                                    onSelectedChange={(date) => {
                                        setSelectedDateDep(date);
                                    }}
                                    style={{ borderRadius: 10 }}
                                    current={dateToday}
                                    selected={dateToday}
                                    mode="calendar"
                                />
                            </View>
                        </View>
                    )}

                    {openRet && (
                        <View className="absolute z-10 w-[83%] h-auto">
                            <View className="mx-[32px] left-[10%] top-[68%]">
                                <DatePicker
                                    onSelectedChange={(date) => {
                                        setSelectedDateRet(date);
                                    }}
                                    style={{ borderRadius: 10 }}
                                    current={dateToday}
                                    selected={dateToday}
                                    mode="calendar"
                                />
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

export default CreateTrip;