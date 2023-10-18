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
import { db, collection, getDocs } from '../firebase/firebaseConfig';
import { query, where, doc, getDoc } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { usersId, usersInfo } from "../redux/usersSlice";
import { tripsReceived } from '../redux/tripsSlice';


export default function Home({ navigation }) {

    const dispatch = useDispatch();

    const user = useSelector(userSelector);
    const user_id = user.user_id;
    // console.log(user_id);

    const { dataTrip, loadedTrip } = TripApi();
    const TripItems = dataTrip.result ? dataTrip.result.filter((item, index) => index < 3) : [];

    const [trips, setTrips] = useState([]);

    const [userInfo, setUserInfo] = useState([]);

    const getTrips = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(db, "trips"), where("user_id", "==", user_id)));
            console.log("Total trips: ", querySnapshot.size);
            const tripsDoc = [];
            querySnapshot.forEach((doc) => {
                tripsDoc.push({ ...doc.data(), key: doc.id });
            });
            setTrips(tripsDoc);
            dispatch(tripsReceived(tripsDoc));
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    }

    const getUserInfo = async () => {
        try {
            const userRef = doc(db, 'users', user_id);
            const fetchUserInfo = await getDoc(userRef);

            if (fetchUserInfo.exists()) {
                setUserInfo(fetchUserInfo.data());
                dispatch(usersInfo(fetchUserInfo.data()));
            } else {
                console.log('No user found with given docId');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            if (user_id) {
                getTrips();
                getUserInfo();
            }
            return () => {
                setTrips([]);
                setUserInfo([]);
            };
        }, [user_id])
    );
    // console.log(trips);
    // console.log(userInfo);

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
                        <Header screen={"Home"} title={"Hello"} subtitle={userInfo.user_username} navigation={navigation} />
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
                            {user_id == null ? (<Text>Loading...</Text>) : (
                                trips.map((item, index) => {
                                    return (
                                        <MyTrip item={item} key={index} navigation={navigation} />
                                    )
                                })
                            )}
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