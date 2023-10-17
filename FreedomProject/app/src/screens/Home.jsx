import React, { useState } from 'react';
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
import { MyTrip, RecommendedTrip, Header } from '../components/index';
import { TripApi } from "../data/PlaceApi";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/usersSlice";
import { useFocusEffect } from "@react-navigation/native";
import { db, collection, getDocs } from '../../firebase/firebaseDB';
import { where } from 'firebase/firestore';

export default function Home({ navigation }) {

    const user = useSelector(userSelector);
    const user_id = user.user_id;
    console.log(user_id);

    const { dataTrip, loadedTrip } = TripApi();
    const TripItems = dataTrip.result ? dataTrip.result.filter((item, index) => index < 3) : [];

    const [trips, setTrips] = useState([]);
    const getTrips = async () => {
        const querySnapshot = await getDocs(collection(db, "trips"), where("user_id", "==", user_id));
        console.log("Total trips: ", querySnapshot.size);
        const tripsDoc = [];
        querySnapshot.forEach((doc) => {
            tripsDoc.push({ ...doc.data(), key: doc.id });
        });
        setTrips(tripsDoc);
    }

    useFocusEffect(
        React.useCallback(() => {
            getTrips();
            return () => {
                setTrips([]);
            };
        }, [])
    );
    console.log(trips);

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
        <ScrollView>
            <View className="container mx-auto h-full bg-white">
                <View className="mx-[32px] pt-14 bg-white gap-y-[24px]">
                    {/* Header */}
                    <View className="relative">
                        <Header screen={"Home"} title={"Hello"} subtitle={"Username"} navigation={navigation} />
                    </View>

                    {/* My Trip */}
                    <View className="bg-white h-auto w-full mt-[12px] mb-[20px]">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-[20px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>My Trips</Text>
                            <Pressable onPress={() => {
                                navigation.navigate("MyDreamTrip");
                            }}>
                                <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptLight' }}>All Trips</Text>
                            </Pressable>
                        </View>
                        <View className="mt-[20px] flex flex-row justify-between">
                            <MyTrip navigation={navigation} />
                            <MyTrip navigation={navigation} />
                        </View>
                    </View>

                    {/* Recommended Trip */}
                    <View className="bg-white h-auto w-full mb-5">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-[20px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>Recommended Trip</Text>
                            <Pressable onPress={() => {
                                navigation.navigate("ExploreTrip");
                            }}>
                                <Text className="text-[12px] text-gray-dark" style={{ fontFamily: 'promptLight' }}>View All</Text>
                            </Pressable>
                        </View>
                        <View className="mt-[20px] flex">
                            {loadedTrip ? (<Text>Loading...</Text>) : (
                                TripItems.map((item, index) => {
                                    return (
                                        <RecommendedTrip item={item} key={index} navigation={navigation} />
                                    )

                                })
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
});