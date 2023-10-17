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
} from "react-native";
import { useFonts } from "@expo-google-fonts/prompt";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TripEventBox, PlaceTrip } from '../components/index';
import { useSelector } from "react-redux";
import { tripSelector } from '../redux/tripsSlice';

const TripPlan = ({ route, navigation }) => {

    const { tripKey } = route.params;
    // console.log(tripKey);

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
    console.log(tripItem);

    const tripEndDate = tripItem.trip_end_date.slice(8);
    const tripStartDate = tripItem.trip_start_date.slice(8);
    const differanceDate = parseInt(tripEndDate) - parseInt(tripStartDate) + 1;
    // console.log(differanceDate);

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
                        setIsOpen(false),
                            setIsFav(true)
                    }}
                >
                    <View>
                        {/* SearchBar */}
                        {isFav ? (
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
                                        <View className="bg-gray-light w-full h-auto rounded-[10px]">
                                            <View className="m-[20px]">
                                                {/* Title */}
                                                <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-4 px-6 justify-center">
                                                    <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>TITLE</Text>
                                                    <TextInput className="text-[20px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }} placeholder="Trip Name">ExampleTitle</TextInput>
                                                </View>

                                                {/* Time & Category */}
                                                <View className="flex flex-row justify-between mt-[15px]">
                                                    <View className="w-[140px] h-auto border-[0.6px] rounded-[10px] border-gray-dark py-3 px-6 justify-center">
                                                        <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>TIME</Text>
                                                        <TextInput className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }} placeholder="Time">08:00 AM</TextInput>
                                                    </View>
                                                    <View className="w-[140px] h-auto border-[0.6px] rounded-[10px] border-gray-dark py-3 px-6 justify-center">
                                                        <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>CATEGORY</Text>
                                                        <TextInput className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }} placeholder="Category">Place</TextInput>
                                                    </View>
                                                </View>

                                                {/* Descriptions */}
                                                <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-4 px-6 justify-center mt-[15px]">
                                                    <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>DESCRIPTIONS</Text>
                                                    <TextInput multiline className="text-[14px] text-gray-dark leading-[18px] mt-2" style={{ fontFamily: 'promptSemiBold' }} placeholder="Descriptions">Lorem ipsum dolor sit amet, conseco adipiscing eit sed do.</TextInput>
                                                </View>

                                                {/* Address */}
                                                <View className="w-full h-auto border-[0.6px] rounded-[10px] border-gray-dark py-4 px-6 justify-center mt-[15px]">
                                                    <Text className="text-[12px] text-gray-dark opacity-80" style={{ fontFamily: 'promptMedium' }}>ADDRESS</Text>
                                                    <TextInput multiline className="text-[14px] text-gray-dark leading-[18px] mt-2" style={{ fontFamily: 'promptSemiBold' }} placeholder="Descriptions">Lorem ipsum dolor sit amet, conseco adipiscing eit sed do.</TextInput>
                                                </View>

                                                {/* Btn */}
                                                <View className="flex flex-row justify-between items-center mt-[15px]">
                                                    <Pressable className="bg-gray-dark h-[36px] w-[140px] rounded-[10px] justify-center items-center">
                                                        <Text className="text-[12px] text-white tracking-[1px]" style={{ fontFamily: 'promptMedium' }}>CONFIRM</Text>
                                                    </Pressable>
                                                    <Pressable className="h-[36px] w-[140px] rounded-[10px] justify-center items-center border-[0.6px]">
                                                        <Text className="text-[12px] text-gray-dark tracking-[1px]" style={{ fontFamily: 'promptMedium' }}>CANCEL</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </BottomSheetScrollView>

                            </View>
                        ) : (
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
                                            <Pressable onPress={() => { setIsFav(true) }}>
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
                    <View className="mx-[32px] pt-[20px]">
                        {/* Calendar */}
                        <View className="bg-white h-[76px] flex flex-row">
                            <View className="bg-gray-dark h-[76px] w-[42px] rounded-[20px] shadow-lg shadow-black justify-center items-center mr-[10px]">
                                <Text
                                    className="text-[12px] text-gray-light"
                                    style={{ fontFamily: "promptMedium" }}
                                >
                                    14
                                </Text>
                                <Text
                                    className="text-[12px] text-gray-light mb-[6px]"
                                    style={{ fontFamily: "promptRegular" }}
                                >
                                    Mon
                                </Text>
                                <Text className="w-[5px] h-[5px] bg-white rounded-xl"></Text>
                            </View>
                            <View className="bg-gray-light h-[76px] w-[42px] rounded-[20px] justify-center items-center mr-[10px]">
                                <Text
                                    className="text-[12px] text-gray-dark opacity-60"
                                    style={{ fontFamily: "promptMedium" }}
                                >
                                    15
                                </Text>
                                <Text
                                    className="text-[12px] text-gray-dark mb-[6px] opacity-60"
                                    style={{ fontFamily: "promptRegular" }}
                                >
                                    Tue
                                </Text>
                                <Text className="w-[6px] h-[6px] rounded-xl opacity-60 border-[1px] border-gray-dark"></Text>
                            </View>
                            <View className="bg-gray-light h-[76px] w-[42px] rounded-[20px] justify-center items-center mr-[10px]">
                                <Text
                                    className="text-[12px] text-gray-dark opacity-60"
                                    style={{ fontFamily: "promptMedium" }}
                                >
                                    16
                                </Text>
                                <Text
                                    className="text-[12px] text-gray-dark mb-[6px] opacity-60"
                                    style={{ fontFamily: "promptRegular" }}
                                >
                                    Wed
                                </Text>
                                <Text className="w-[6px] h-[6px] rounded-xl opacity-60 border-[1px] border-gray-dark"></Text>
                            </View>
                        </View>

                        {/* Trip Plan */}
                        <View className="bg-white w-full h-full mt-[36px] flex flex-row">
                            {/* Line */}
                            <View className="bg-white w-[42px] h-auto items-center">
                                <View className="w-[24px] h-[24px] rounded-xl items-center justify-center border-collapse border-[1px]">
                                    <View className="bg-gray-dark w-[16px] h-[16px] rounded-xl"></View>
                                </View>
                                <View className="w-[1.5px] h-[120px] bg-gray-dark my-1"></View>
                                <View className="w-[16px] h-[16px] rounded-xl items-center justify-center border-collapse border-[1px]"></View>
                                <View className="w-[1.5px] h-[135px] bg-gray-dark my-1"></View>
                                <View className="w-[16px] h-[16px] rounded-xl items-center justify-center border-collapse border-[1px]"></View>
                                <View className="w-[1.5px] h-[135px] bg-gray-dark my-1"></View>
                                {/* <View className="w-[16px] h-[16px] rounded-xl items-center justify-center border-collapse border-[1px]"></View> */}
                            </View>

                            {/* Plan event */}
                            <View className="bg-white w-[295px] h-auto ml-3">
                                {/* Place */}
                                {/* <Pressable onPress={() => { navigation.navigate("PlaceDetail") }}> */}
                                <TripEventBox navigation={navigation} />
                                {/* </Pressable> */}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

export default TripPlan;
