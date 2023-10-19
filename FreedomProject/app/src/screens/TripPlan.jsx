import React, { useRef, useState, useEffect } from "react";
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    ImageBackground,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useFonts } from "@expo-google-fonts/prompt";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TripDatePlan from "../components/TripDatePlan";
import { useSelector } from "react-redux";
import { tripSelector } from '../redux/tripsSlice';
import { db } from '../firebase/firebaseConfig';
import { query, where, doc, getDoc, getDocs, collection, addDoc } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { scheduleReceived } from "../redux/schedulesSlice";
import { useFocusEffect } from "@react-navigation/native";
import DatePicker from 'react-native-modern-datepicker';
import SelectDropdown from 'react-native-select-dropdown';
import { placesReceived } from '../redux/placesSlice';


const TripPlan = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const { tripKey } = route.params;
    // console.log(tripKey);

    const [schedules, setSchedules] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                if (tripKey) {
                    try {
                        const querySnapshot = await getDocs(query(collection(db, "schedules"), where("trip_id", "==", tripKey)));
                        // console.log("Total schdules: ", querySnapshot.size);
                        const schdulesDoc = [];
                        querySnapshot.forEach((doc) => {
                            schdulesDoc.push({ ...doc.data(), key: doc.id });
                        });
                        setSchedules(schdulesDoc);
                        dispatch(scheduleReceived(schdulesDoc));
                        // console.log(schdulesDoc);
                    } catch (error) {
                        console.error("Error fetching schedules:", error);
                    }
                }
            };
            fetchData();
        }, [tripKey])
    );

    const date = new Date();
    const formattedTime = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [address, setAddress] = useState('');
    const [openTime, setOpenTime] = useState(false);
    const [time, setTime] = useState(formattedTime);
    const [category, setCategory] = useState('');
    const categorys = ['Place', 'Restaurant', 'Hotel']

    // Check AM, PM
    const formatTime = () => {
        const timeParts = time.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);

        date.setHours(hours);
        date.setMinutes(minutes);

        const formattedTime = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        return formattedTime;
    }

    const addTripEvents = async () => {
        try {
            const tripRef = await addDoc(collection(db, "places"), {
                place_title: title,
                place_description: des,
                place_category: category,
                trip_image: '',
                place_time: time,
                place_address: address,
                place_latitude: '',
                place_longitude: '',
                schedule_id: filteredSchedules[0].key,

            });
            // dispatch(placesReceived({
            //     place_title: title,
            //     place_description: des,
            //     place_category: category,
            //     trip_image: '',
            //     place_time: time,
            //     place_address: address,
            //     place_latitude: '',
            //     place_longitude: '',
            //     schedule_id: filteredSchedules[0].key
            // }));
            Alert.alert("Success", "Trip added successfully");
        } catch (e) {
            Alert.alert("Error", "Error adding document: ", e.message);
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const [isFav, setIsFav] = useState(true);

    const bottomSheetModelRef = useRef(null);
    const snapPoints = ["72%", "94%"];

    function handlePresentModel() {
        bottomSheetModelRef.current?.present();
        setIsOpen(true);
    }

    const trip = useSelector(tripSelector);
    const trips = trip.trips;
    // console.log(trips);

    const tripItem = trips.find(trip => trip.key === tripKey);
    // console.log(tripItem);

    const tripEndDate = tripItem.trip_end_date.slice(8);
    const tripStartDate = tripItem.trip_start_date.slice(8);
    const differanceDate = parseInt(tripEndDate) - parseInt(tripStartDate) + 1;
    // console.log(differanceDate);

    // Selected Date
    const [selectedDate, setSelectedDate] = useState(1);
    const [initialDate, setInitialDate] = useState(1);
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const tripDate = tripItem.trip_start_date;
    const formatTripDate = tripDate.replace(/\//g, '-');
    const startDate = new Date(formatTripDate);

    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate());
    // console.log(currentDate);

    const [currentDates, setCurrentDates] = useState(currentDate);
    // console.log("Calendar Date: " + currentDates);

    useEffect(() => {
        setSelectedDate(initialDate);
    }, [initialDate]);

    const calendarButtons = [];
    for (let i = 1; i <= differanceDate; i++) {
        const date = i;

        const tripDate = tripItem.trip_start_date;
        const formatTripDate = tripDate.replace(/\//g, '-');
        const startDate = new Date(formatTripDate);

        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i - 1);
        // console.log(currentDate);

        const dayIndex = currentDate.getDay();
        const dayName = daysOfWeek[dayIndex - 1];

        calendarButtons.push(
            <TouchableOpacity
                key={i}
                className={`h-[76px] w-[42px] rounded-[20px] mr-[10px] ${selectedDate === date || i === selectedDate ? 'bg-gray-dark' : 'bg-gray-light'}`}
                onPress={() => {
                    setSelectedDate(date);
                    setCurrentDates(currentDate);
                }}
                onLongPress={() => {
                    setInitialDate(date);
                }}
            >
                <View className={`justify-center items-center h-full`}>
                    <Text
                        className={`text-[12px] ${selectedDate === date ? 'text-gray-light' : 'text-gray-dark'}`}
                        style={{ fontFamily: "promptMedium" }}
                    >
                        {currentDate.getDate()}
                    </Text>
                    <Text
                        className={`text-[12px] mb-[6px] ${selectedDate === date ? 'text-gray-light' : 'text-gray-dark'}`}
                        style={{ fontFamily: "promptRegular" }}
                    >
                        {dayName}
                    </Text>
                    <Text className="w-[5px] h-[5px] bg-gray-light rounded-xl"></Text>
                </View>
            </TouchableOpacity>
        );
    }

    const filteredSchedules = schedules.filter(schedule => {
        const scheduleDate = new Date((schedule.schedule_date).replace(/\//g, '-'));
        return (
            scheduleDate.getDate() === currentDates.getDate() &&
            scheduleDate.getMonth() === currentDates.getMonth() &&
            scheduleDate.getFullYear() === currentDates.getFullYear()
        );
    });
    // console.log(filteredSchedules);

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
                {/* Bottom Sheet */}
                <BottomSheetModal
                    ref={bottomSheetModelRef}
                    index={isFav ? 0 : 1}
                    snapPoints={snapPoints}
                    backgroundStyle={{ borderRadius: 50 }}
                    onDismiss={() => {
                        setIsOpen(false);
                        setIsFav(true);
                        setOpenTime(false);
                    }}
                >
                    <View>
                        {isFav ? (
                            // Form trip events
                            <View className="bg-white h-full mx-[32px] my-[24px]">

                                <View className="flex flex-row justify-between mb-5">
                                    {/* Search bar */}
                                    <View className="flex flex-row h-[40px] w-[280px] bg-gray-light items-center rounded-[10px]">
                                        <Image source={{ uri: 'https://img.icons8.com/fluency-systems-filled/48/search.png' }}
                                            style={{ width: 20, height: 20 }} className="ml-3 opacity-60" />
                                        <TextInput className="text-[12px] text-gray-dark ml-3 w-full opacity-80" style={{ fontFamily: 'promptRegular' }} placeholder='Search location'></TextInput>
                                    </View>
                                    {/* Btn Fav */}
                                    <Pressable className="flex flex-row h-[40px] w-[45px] bg-gray-light items-center justify-center rounded-[10px]"
                                        onPress={() => { setIsFav(false) }}>
                                        <Image source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                                            style={{ width: 20, height: 20 }} className="opacity-80" />
                                    </Pressable>
                                </View>

                                <BottomSheetScrollView>
                                    {/* Add Trip */}
                                    <View className="w-full bg-gray-light mb-5 rounded-[10px]">
                                        <View className="bg-gray-light w-full h-auto rounded-[10px] relative">
                                            {openTime && (
                                                <DatePicker
                                                    mode="time"
                                                    minuteInterval={3}
                                                    onTimeChange={selectedTime => {
                                                        setTime(selectedTime);
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
                                                        onChangeText={text => setTitle(text)}></TextInput>
                                                </View>

                                                {/* Time & Category */}
                                                <View className="flex flex-row justify-between mt-[15px]">
                                                    <Pressable onPress={() => { setOpenTime(true) }} className="w-[140px] h-auto border-[0.6px] rounded-[10px] border-gray-dark py-3 px-6 justify-center">
                                                        <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>TIME</Text>
                                                        <Text multiline className="text-[14px] text-gray-dark leading-[18px] mt-2" style={{ fontFamily: 'promptSemiBold' }}>{formatTime()}</Text>
                                                    </Pressable>
                                                    <View className="w-[140px] h-auto border-[0.6px] rounded-[10px] border-gray-dark py-3 justify-center">
                                                        <Text className="text-[12px] text-gray-dark opacity-80 px-6" style={{ fontFamily: 'promptMedium' }}>CATEGORY</Text>
                                                        {/* <TextInput className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }} placeholder="Category">Place</TextInput> */}
                                                        <SelectDropdown
                                                            data={categorys}
                                                            onSelect={(selectedItem, index) => {
                                                                setCategory(selectedItem);
                                                            }}
                                                            buttonStyle={{ backgroundColor: '#F8F8F8', width: 'auto', height: 26 }}
                                                            buttonTextStyle={{ fontSize: 14, fontFamily: 'promptMedium', textAlign: 'left', paddingLeft: 8 }}
                                                            defaultButtonText={"Category..."}
                                                            dropdownStyle={{ width: 140, borderRadius: 10 }}
                                                            rowStyle={{ height: 40 }}
                                                            rowTextStyle={{ fontSize: 14, fontFamily: 'promptRegular', textAlign: 'left', paddingLeft: 16 }}
                                                        />
                                                    </View>
                                                </View>

                                                {/* Descriptions */}
                                                <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-4 px-6 justify-center mt-[15px]">
                                                    <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>DESCRIPTIONS</Text>
                                                    <TextInput multiline className="text-[14px] text-gray-dark leading-[18px] mt-2" style={{ fontFamily: 'promptSemiBold' }} placeholder="Descriptions"
                                                        onChangeText={text => setDes(text)}></TextInput>
                                                </View>

                                                {/* Address */}
                                                <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-4 px-6 justify-center mt-[15px]">
                                                    <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>ADDRESS</Text>
                                                    <TextInput multiline className="text-[14px] text-gray-dark leading-[18px] mt-2" style={{ fontFamily: 'promptSemiBold' }} placeholder="Address"
                                                        onChangeText={text => setAddress(text)}></TextInput>
                                                </View>

                                                {/* Btn */}
                                                <View className="flex flex-row justify-between items-center mt-[15px]">
                                                    <Pressable onPress={() => {
                                                        addTripEvents();
                                                    }} className="bg-gray-dark h-[36px] w-[140px] rounded-[10px] justify-center items-center">
                                                        <Text className="text-[12px] text-white tracking-[1px]" style={{ fontFamily: 'promptMedium' }}>CONFIRM</Text>
                                                    </Pressable>
                                                    <Pressable onPress={() => { }} className="h-[36px] w-[140px] rounded-[10px] justify-center items-center border-[0.6px]">
                                                        <Text className="text-[12px] text-gray-dark tracking-[1px]" style={{ fontFamily: 'promptMedium' }}>CANCEL</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </BottomSheetScrollView>

                            </View>
                        ) : (
                            // My Wishlist
                            <View className="h-auto w-full">
                                <View className="bg-white h-auto my-5 fixed mx-[32px]">
                                    {/* Title */}
                                    <View className="flex flex-row justify-between items-center">
                                        <View className="flex flex-row items-center">
                                            <Text className="text-[24px] text-gray-dark mr-3" style={{ fontFamily: 'promptSemiBold' }}>My Wishlist</Text>
                                            <Text className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>(6)</Text>
                                        </View>
                                        <View className="flex flex-row items-center">
                                            <Image source={{ uri: 'https://img.icons8.com/material-rounded/96/2E2E2E/sorting-options.png' }}
                                                style={{ width: 20, height: 20 }} className="mr-[20px]" />
                                            <Pressable onPress={() => {
                                                setIsFav(true);
                                                setOpenTime(false);
                                            }}>
                                                <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/90/2E2E2E/multiply.png' }}
                                                    style={{ width: 24, height: 24 }} />
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>

                                <ScrollView>
                                    <View className="px-[32px]">
                                        {/* Search bar */}
                                        <View className="flex flex-row h-[40px] w-full bg-gray-light items-center rounded-[10px]">
                                            <Image source={{ uri: 'https://img.icons8.com/fluency-systems-filled/48/search.png' }}
                                                style={{ width: 20, height: 20 }} className="ml-3 opacity-60" />
                                            <TextInput className="text-[12px] text-gray-dark ml-3 w-full opacity-80" style={{ fontFamily: 'promptRegular' }} placeholder='Search location'></TextInput>
                                        </View>

                                        <View className="mt-[20px]">
                                            <View className="flex flex-row justify-between">
                                                {/* <PlaceTrip navigation={navigation} />
                                                <PlaceTrip navigation={navigation} /> */}
                                            </View>
                                            <View className="flex flex-row justify-between mt-[20px]">
                                                {/* <PlaceTrip navigation={navigation} />
                                                <PlaceTrip navigation={navigation} /> */}
                                            </View>
                                            <View className="flex flex-row justify-between mt-[20px]">
                                                {/* <PlaceTrip navigation={navigation} />
                                                <PlaceTrip navigation={navigation} /> */}
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        )
                        }
                    </View>
                </BottomSheetModal>

                {/* Btn Create Trip */}
                <Pressable style={{ zIndex: isOpen ? 0 : 2 }}
                    className="absolute bottom-10 right-10"
                    onPress={handlePresentModel}
                >
                    <View className="w-[46px] h-[46px] bg-gray-dark rounded-3xl fixed right-0 bottom-0 justify-center items-center shadow-lg shadow-gray-dark">
                        <Image
                            source={{
                                uri: "https://img.icons8.com/fluency-systems-regular/96/F8F8F8/passenger-with-baggage.png",
                            }}
                            style={{ width: 25, height: 25 }}
                        />
                    </View>
                </Pressable>

                <ScrollView>
                    {/* Background */}
                    {isOpen && (
                        <Pressable onPress={() => {
                            bottomSheetModelRef.current?.close()
                        }} style={{ zIndex: 3 }} className="absolute h-full w-full bg-gray-dark opacity-30" />
                    )}

                    {/* Header & Image */}
                    <View className="w-full h-auto pb-[40px] bg-blue-light rounded-b-[50px]">
                        <View className="mx-[32px] pt-16 flex flex-row justify-between">
                            {/* Home */}
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("Home");
                                }}
                            >
                                <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                                <Image
                                    className="absolute top-[7px] left-[8px]"
                                    source={{
                                        uri: "https://img.icons8.com/fluency-systems-regular/48/2E2E2E/home--v1.png",
                                    }}
                                    style={{ width: 20, height: 20 }}
                                />
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
                                {/* Fav */}
                                <View>
                                    <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                                    <Image
                                        className="absolute top-[9px] left-2"
                                        source={{
                                            uri: "https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png",
                                        }}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                                {/* Menu */}
                                <View>
                                    <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                                    <Image
                                        className="absolute top-[8px] left-2"
                                        source={{
                                            uri: "https://img.icons8.com/ios-glyphs/90/2E2E2E/menu-2.png",
                                        }}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Title */}
                        <View className="mx-[32px] mt-[20px]">
                            <View className="flex flex-row items-center">
                                <Image
                                    className="mr-3"
                                    source={{
                                        uri: "https://img.icons8.com/metro/26/2E2E2E/tear-off-calendar.png",
                                    }}
                                    style={{ width: 18, height: 18 }}
                                />
                                <Text
                                    className="text-[14px] text-gray-dark opacity-80"
                                    style={{ fontFamily: "promptSemiBold" }}
                                >
                                    {differanceDate == 1 ? (
                                        tripItem.trip_start_date.slice(5)
                                    ) : (
                                        tripItem.trip_start_date.slice(5) + " - " + tripItem.trip_end_date.slice(5)
                                    )}
                                </Text>
                            </View>
                            <Text
                                className="text-[32px] text-gray-dark"
                                style={{ fontFamily: "promptSemiBold" }}
                            >
                                {tripItem.trip_title}
                            </Text>
                            <Text
                                className="text-[14px] text-gray-dark leading-4 mt-2"
                                style={{ fontFamily: "promptLight" }}
                            >
                                {tripItem.trip_description}
                            </Text>
                        </View>
                    </View>

                    {/* Content */}
                    <View className="mx-[32px] pt-[20px] h-auto">
                        {/* Calendar */}
                        <View className="bg-white h-[76px] flex flex-row">
                            {calendarButtons}
                        </View>

                        {/* Trip Plan */}
                        {filteredSchedules.map((item, index) => {
                            return (
                                <TripDatePlan item={item} navigation={navigation} />
                            )
                        })}
                    </View>
                </ScrollView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

export default TripPlan;
