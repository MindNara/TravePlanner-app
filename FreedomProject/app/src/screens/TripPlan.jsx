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
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import TripDatePlan from "../components/TripDatePlan";
import { useSelector } from "react-redux";
import { tripSelector, tripsReceived } from '../redux/tripsSlice';
import { db } from '../firebase/firebaseConfig';
import { query, where, doc, getDocs, collection, addDoc, updateDoc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { scheduleReceived } from "../redux/schedulesSlice";
import { useFocusEffect } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown';
import { placesReceived } from '../redux/placesSlice';
import { EditTripPlan, UpdateButton } from "../components";
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { placeSelector } from '../redux/placesSlice';
import { userSelector } from "../redux/usersSlice";
import { scheduleSelector } from "../redux/schedulesSlice";


const TripPlan = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const { tripKey } = route.params;
    // console.log("Trip_id: " + tripKey);

    const user = useSelector(userSelector);
    const user_id = user.user_id;

    const trip = useSelector(tripSelector);
    const trips = trip.trips;
    // console.log(trips);

    const place = useSelector(placeSelector);
    const places = place.places;
    // console.log(placesItem);

    // เปลี่ยนเป็นดึง places แล้วเก็บเข้า store แทน
    const fetchPlaces = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(db, "places"), where("trip_id", "==", tripKey)));
            // console.log("Total places: ", querySnapshot.size);
            const placesDoc = [];
            querySnapshot.forEach((doc) => {
                placesDoc.push({ ...doc.data(), key: doc.id });
            });
            dispatch(placesReceived(placesDoc));
            // console.log(placesDoc);
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    };

    const [tripItem, setTrips] = useState([]);
    const fetchTrips = async () => {
        try {
            const tripsRef = doc(db, 'trips', tripKey);
            const trips = await getDoc(tripsRef);
            // console.log(trips.data());

            if (trips.exists()) {
                setTrips(trips.data());
                dispatch(tripsReceived(trips.data()));
            } else {
                console.log('No trip found with given docId');
                return null;
            }
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    };

    useEffect(() => {
        fetchPlaces();
        fetchTrips();
    }, []);

    // useEffect(() => {
    //     fetchPlaces();
    // }, []);

    const date = new Date();
    const formattedTime = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    const [isOpen, setIsOpen] = useState(false);
    const [isFav, setIsFav] = useState(true);

    const bottomSheetModelRef = useRef(null);
    const snapPoints = ["72%", "93%"];

    const bottomSheetEditTrip = useRef(null);
    const snapPointsEditTrip = ["57%"];

    function handlePresentModel() {
        bottomSheetModelRef.current?.present();
        setIsOpen(true);
    }

    let differanceDate = 0;
    let startDate;
    let tripDate;
    if (tripItem.trip_end_date !== undefined && tripItem.trip_start_date !== undefined) {
        const tripEndDate = tripItem.trip_end_date.slice(8);
        const tripStartDate = tripItem.trip_start_date.slice(8);
        differanceDate = parseInt(tripEndDate) - parseInt(tripStartDate) + 1;

        tripDate = tripItem.trip_start_date;
        const formatTripDate = tripDate.replace(/\//g, '-');
        startDate = new Date(formatTripDate);
    }

    // Calendar Button
    const [selectedDate, setSelectedDate] = useState(1);
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate());
    const [currentDates, setCurrentDates] = useState(currentDate);
    const [calendarButtons, setCalendarButtons] = useState([]);
    // console.log(currentDates);

    const calendarBtn = (tripDate, differanceDate) => {
        const buttons = [];
        for (let i = 1; i <= differanceDate; i++) {
            const date = i;

            const formatTripDate = tripDate?.replace(/\//g, '-');
            const startDate = new Date(formatTripDate);
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + i - 1);

            const dayIndex = currentDate.getDay();
            const dayName = daysOfWeek[dayIndex - 1];

            buttons.push(
                <TouchableOpacity
                    key={i}
                    className={`h-[76px] w-[42px] rounded-[20px] mr-[10px] ${selectedDate === date || i === selectedDate ? 'bg-gray-dark' : 'bg-gray-light'}`}
                    onPress={() => {
                        setSelectedDate(date);
                        setCurrentDates(currentDate);
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
        return buttons;
    }

    useEffect(() => {
        const buttons = calendarBtn(tripDate, differanceDate);
        // console.log(buttons);
        setCalendarButtons(buttons);
    }, [trips, currentDates])

    // filter place
    const filteredPlaces = places.filter(place => {
        const formatPlaceDate = place.place_schedule_date.replace(/\//g, '-');
        const placeDate = new Date(formatPlaceDate);

        let currDate;
        if (isNaN(currentDates) && trips.trip_start_date !== undefined) {
            currDate = new Date(trips.trip_start_date.replace(/\//g, '-'));
            // console.log(currDate);
            return (
                placeDate.getDate() === currDate.getDate() &&
                placeDate.getMonth() === currDate.getMonth() &&
                placeDate.getFullYear() === currDate.getFullYear()
            );
        } else {
            return (
                placeDate.getDate() === currentDates.getDate() &&
                placeDate.getMonth() === currentDates.getMonth() &&
                placeDate.getFullYear() === currentDates.getFullYear()
            );
        }
    });
    const placesCount = filteredPlaces.length;
    // console.log("Total Place: " + placesCount);
    // console.log(filteredPlaces);

    // Update Trip
    const dateToday = getToday();
    const [openDep, setOpenDep] = useState(false);
    const [openRet, setOpenRet] = useState(false);

    const [titleTrip, setTitleTrip] = useState('');
    const [desTrip, setDesTrip] = useState('');
    const [selectedDateDep, setSelectedDateDep] = useState('');
    const [selectedDateRet, setSelectedDateRet] = useState('');

    useEffect(() => {
        if (trips.trip_title !== undefined && trips.trip_description !== undefined && trips.trip_start_date !== undefined && trips.trip_end_date !== undefined) {
            setTitleTrip(trips.trip_title);
            setDesTrip(trips.trip_description);
            setSelectedDateDep(trips.trip_start_date);
            setSelectedDateRet(trips.trip_end_date);
        }
    }, [trips.trip_title, trips.trip_description, trips.trip_start_date, trips.trip_end_date]);

    // Update Trip
    const updateTrip = async () => {
        const tripRef = doc(db, 'trips', tripKey);
        // console.log(tripRef);
        try {
            await updateDoc(tripRef, {
                trip_title: titleTrip,
                trip_description: desTrip,
                trip_start_date: selectedDateDep,
                trip_end_date: selectedDateRet
            });
            const updatedDoc = await getDoc(tripRef);
            const updatedData = updatedDoc.data();
            dispatch(tripsReceived(updatedData));
            // navigation.navigate('Content');
            console.log("Trip update successfully");

            // const diff = parseInt(selectedDateRet.slice(8)) - parseInt(selectedDateDep.slice(8))  
            // const buttons = calendarBtn(selectedDateDep, diff);
            // setCalendarButtons(buttons);
        } catch (error) {
            console.log("Error adding document: ", error.message);
        } finally {
            bottomSheetEditTrip.current?.close();
        }
    };

    // Add places
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [address, setAddress] = useState('');
    const [openTime, setOpenTime] = useState(false);
    const [time, setTime] = useState(formattedTime);
    const [category, setCategory] = useState('');
    const categorys = ['Place', 'Restaurant', 'Hotel'];
    const [scheduleDates, setScheduleDates] = useState('');

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
    // console.log(time);

    // เซตค่า place_schedule_date เพื่อมาใส่ใน places
    useEffect(() => {
        const schedulesDate = new Date(currentDates);
        const year = schedulesDate.getFullYear();
        const month = String(schedulesDate.getMonth() + 1).padStart(2, '0');
        const day = String(schedulesDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;
        setScheduleDates(formattedDate);
    }, [currentDates]);
    // console.log(scheduleDates);

    const addPlaces = async () => {
        let place_schedule_date;
        try {
            if (scheduleDates === 'NaN/NaN/NaN' && tripItem.trip_start_date !== undefined) {
                place_schedule_date = tripItem.trip_start_date;
                const tripRef = await addDoc(collection(db, "places"), {
                    place_title: title,
                    place_description: des,
                    place_category: category,
                    trip_image: '',
                    place_time: time,
                    place_address: address,
                    place_latitude: '',
                    place_longitude: '',
                    trip_id: tripKey,
                    place_schedule_date: place_schedule_date,
                });
            } else {
                const tripRef = await addDoc(collection(db, "places"), {
                    place_title: title,
                    place_description: des,
                    place_category: category,
                    trip_image: '',
                    place_time: time,
                    place_address: address,
                    place_latitude: '',
                    place_longitude: '',
                    trip_id: tripKey,
                    place_schedule_date: scheduleDates,
                });
            }
            fetchPlaces();
            Alert.alert("Success", "Trip added successfully");
            bottomSheetModelRef.current?.close();
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

        <GestureHandlerRootView className="relative container mx-auto h-full bg-white">
            <BottomSheetModalProvider>
                {/* Bottom Sheet Create Event */}
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
                                                        addPlaces();
                                                    }} className="bg-gray-dark h-[36px] w-[140px] rounded-[10px] justify-center items-center">
                                                        <Text className="text-[12px] text-white tracking-[1px]" style={{ fontFamily: 'promptMedium' }}>CONFIRM</Text>
                                                    </Pressable>
                                                    <Pressable onPress={() => { bottomSheetModelRef.current?.close(); }} className="h-[36px] w-[140px] rounded-[10px] justify-center items-center border-[0.6px]">
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

                <BottomSheetModal
                    ref={bottomSheetEditTrip}
                    index={0}
                    snapPoints={snapPointsEditTrip}
                    backgroundStyle={{ borderRadius: 50 }}
                    onDismiss={() => {
                        setIsOpen(false);
                    }}
                >
                    {titleTrip !== undefined ? (
                        <View className="bg-white h-full mx-[32px] my-[24px]">
                            <View className="w-full bg-gray-light mb-5 rounded-[10px]">
                                <View className="m-[20px]">
                                    {/* Title */}
                                    <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-4 px-6 justify-center" >
                                        <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>TITLE</Text>
                                        <TextInput className="text-[20px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }} placeholder="Trip Name"
                                            onChangeText={text => setTitleTrip(text)}>{titleTrip}</TextInput>
                                    </View >

                                    {/* Date */}
                                    <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark mt-[20px] py-6 px-6 flex flex-row justify-between items-center" >
                                        <View>
                                            <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>DEPARTURE</Text>
                                            <Pressable className="flex flex-row items-center"
                                                onPress={() => {
                                                    setOpenDep(true);
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
                                                    setOpenRet(true);
                                                }}>
                                                <Text className="text-[15px] text-gray-dark mr-2" style={{ fontFamily: 'promptSemiBold' }}>{selectedDateRet}</Text>
                                                <Image source={{ uri: 'https://img.icons8.com/metro/26/2E2E2E/tear-off-calendar.png' }}
                                                    style={{ width: 14, height: 14 }} />
                                            </Pressable>
                                        </View>
                                    </View >

                                    {/* Descriptions */}
                                    <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-4 px-6 justify-center mt-[15px]" >
                                        <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>DESCRIPTIONS</Text>
                                        <TextInput multiline className="text-[14px] text-gray-dark leading-[18px] mt-2" style={{ fontFamily: 'promptSemiBold' }} placeholder="Descriptions"
                                            onChangeText={text => setDesTrip(text)}>{desTrip}</TextInput>
                                    </View >
                                    {/* Btn */}
                                    <View className="flex flex-row justify-between items-center mt-[15px]">
                                        <Pressable onPress={() => updateTrip()} className="bg-gray-dark h-[36px] w-[140px] rounded-[10px] justify-center items-center">
                                            <Text className="text-[12px] text-white tracking-[1px]" style={{ fontFamily: 'promptMedium' }}>UPDATE</Text>
                                        </Pressable>
                                        <Pressable onPress={() => { bottomSheetEditTrip.current?.close(); }} className="h-[36px] w-[140px] rounded-[10px] justify-center items-center border-[0.6px]">
                                            <Text className="text-[12px] text-gray-dark tracking-[1px]" style={{ fontFamily: 'promptMedium' }}>CANCEL</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>

                            {/* Date Picker */}
                            {openDep && (
                                <View className="absolute z-20 w-full h-full">
                                    <View className="mx-[32px] top-[5%]">
                                        <DatePicker
                                            style={{ borderRadius: 10 }}
                                            current={dateToday}
                                            selected={dateToday}
                                            mode="calendar"
                                            onDateChange={(date) => {
                                                setSelectedDateDep(date);
                                                setOpenDep(false);
                                            }}
                                        />
                                    </View>
                                </View>
                            )}

                            {openRet && (
                                <View className="absolute z-10 w-full h-auto">
                                    <View className="mx-[32px] top-[5%]">
                                        <DatePicker
                                            onDateChange={(date) => {
                                                setSelectedDateRet(date);
                                                setOpenRet(false);
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
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </BottomSheetModal>

                <ScrollView>
                    {/* Background */}
                    {isOpen && (
                        <Pressable onPress={() => {
                            bottomSheetModelRef.current?.close();
                            bottomSheetEditTrip.current?.close();
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
                                <Pressable onPress={() => {
                                    bottomSheetEditTrip.current?.present();
                                    setIsOpen(true);
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
                                    {trips.trip_start_date !== undefined && trips.trip_end_date !== undefined ? (
                                        differanceDate == 1 ? (
                                            trips.trip_start_date.slice(5)
                                        ) : (
                                            trips.trip_start_date.slice(5) + " - " + trips.trip_end_date.slice(5)
                                        )
                                    ) : (<Text>Loading...</Text>)}
                                </Text>
                            </View>
                            <Text
                                className="text-[32px] text-gray-dark"
                                style={{ fontFamily: "promptSemiBold" }}
                            >
                                {trips.trip_title}
                            </Text>
                            <Text
                                className="text-[14px] text-gray-dark leading-4 mt-2"
                                style={{ fontFamily: "promptLight" }}
                            >
                                {trips.trip_description}
                            </Text>
                        </View>
                    </View>

                    {/* Content */}
                    <View className="mx-[32px] pt-[20px] h-auto">
                        {/* Calendar */}
                        <View className="bg-white h-[76px] flex flex-row">
                            {calendarButtons}
                        </View>

                        <View className="mt-[36px]">
                            {/* <TripDatePlan navigation={navigation} currentDates={currentDates} tripKey={tripKey} /> */}
                            {/* Trip Plan */}
                            {filteredPlaces.map((item, index) => {
                                console.log(item)
                                return (
                                    <View className="flex flex-row">
                                        <TripDatePlan item={item} navigation={navigation} />
                                    </View>
                                )
                            })}
                        </View>

                    </View>
                </ScrollView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

export default TripPlan;
