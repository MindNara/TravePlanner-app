import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    Button,
    SafeAreaView,
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    Pressable,
    FlatList
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';
import { MyAllTrip, Header } from '../components/index';
import { useSelector } from "react-redux";
import { tripSelector } from '../redux/tripsSlice';
import { firebase_auth, db } from '../firebase/firebaseConfig';
import { query, where, doc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function MyDreamTrip({ navigation }) {

    const trip = useSelector(tripSelector);
    const tripInfo = trip.trips;

    const [myAlltrip, setMyAllTrip] = useState([]);
    // console.log(tripInfo);

    const [loaded] = useFonts({
        promptLight: require("../assets/fonts/Prompt-Light.ttf"),
        promptRegular: require("../assets/fonts/Prompt-Regular.ttf"),
        promptMedium: require("../assets/fonts/Prompt-Medium.ttf"),
        promptSemiBold: require("../assets/fonts/Prompt-SemiBold.ttf"),
        promptBold: require("../assets/fonts/Prompt-Bold.ttf"),
    });

    const getMyAllTrip = async () => {
        const user = firebase_auth.currentUser;
        console.log(user.uid);
        try {
            const querySnapshot = await getDocs(query(collection(db, "trips"), where("user_id", "==", user.uid)));
            // console.log("Total Wishlist: ", querySnapshot.size);
            const myAllTripDoc = [];
            querySnapshot.forEach((doc) => {
                myAllTripDoc.push({ ...doc.data(), key: doc.id });
            });
            console.log(myAllTripDoc)
            setMyAllTrip(myAllTripDoc);
            // console.log(wishlist)
            // const isLiked = wishlistDoc.some(item_wishlist => item.place_id === item_wishlist.place_id);
            // setLike(isLiked);
        } catch (error) {
            console.error("Error fetching myAllTrip:", error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getMyAllTrip();
        }, [])
    );

    if (!loaded) {
        return null;
    }

    return (
        // <ScrollView className="bg-white">
            <View className="container mx-auto bg-white">
                <View className="h-full mx-[32px] pt-14 bg-white">
                    {/* Header */}
                    <View className="flex flex-row justify-between items-center">
                        {/* Btn Back */}
                        <Pressable onPress={() => {
                            navigation.navigate("Home");
                        }}>
                            <View className="relative justify-center items-center h-[36px] w-[36px] rounded-3xl opacity-50" style={{ backgroundColor: "#F8F8F8" }}></View>
                            <Image className="absolute top-[6.5px] left-[5px]" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/back.png' }}
                                style={{ width: 22, height: 22 }} />
                        </Pressable>
                        {/* Title */}
                        <View className="items-end">
                            <Text className="text-[24px] text-gray-dark" style={{ fontFamily: 'promptRegular' }}>My Prefect</Text>
                            <Text className="text-[32px] text-gray-dark mt-[-12px]" style={{ fontFamily: 'promptSemiBold' }}>Dream Trip</Text>
                        </View>
                    </View>

                    {/* SearchBar */}
                    {/* <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={[styles.SearchContainer]}>
                            <Image source={{ uri: 'https://img.icons8.com/fluency-systems-filled/48/search.png' }}
                                style={{ width: 20, height: 20 }} className="ml-3 opacity-80" />
                            <TextInput placeholder='Search location' className="ml-3 w-full text-[14px]" style={[styles.input, { fontFamily: 'promptRegular', fontSize: 12 }]}></TextInput>
                        </View>
                        <View style={[styles.sortbtn]}>
                            <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAy0lEQVR4nO3YSw6CMBSF4X8fitHuXAawAXEBdi+ibgJjchMNYSCP2xRyvuROOijcPsgJICIiGxOAGnhZ1Ta2KifgAXS9aoEjK1Lai1+AnVVjY2fvh8eBFZxb+5/5Dw7zx1SNFM6N3FIdrcZ25dPQNdXRWvqytwMreF/bZcc+tRXwtKqsQRERyVJQat5aao4Ooc47NcfcGyn+bMQ9/U5VKjVnKCg1i4j0KZnmpFwimaYQF06mKSrOacT7f243oialXyXTHAUlUxER4esNlJFPhidtdXQAAAAASUVORK5CYII=' }}
                                style={{ width: 20, height: 20 }} />
                        </View>
                    </View> */}

                    <View className="mt-2">
                        <View className="flex-row flex-wrap mt-[20px]">
                            <FlatList
                                data={myAlltrip}
                                keyExtractor={item => item.place_id}
                                renderItem={({ item }) => (
                                    <MyAllTrip item={item} navigation={navigation} />
                                )}
                                numColumns={2}
                            // showsHorizontalScrollIndicator={false}
                            />
                            {/* <MyAllTrip navigation={navigation} />
                            <MyAllTrip navigation={navigation} />
                            <MyAllTrip navigation={navigation} />
                            <MyAllTrip navigation={navigation} />
                            <MyAllTrip navigation={navigation} />
                            <MyAllTrip navigation={navigation} /> */}
                        </View>
                        {/* <View className="flex flex-row mt-[20px] justify-between">
                            <MyAllTrip navigation={navigation} />
                            <MyAllTrip navigation={navigation} />
                        </View>
                        <View className="flex flex-row my-[20px] justify-between">
                            <MyAllTrip navigation={navigation} />
                            <MyAllTrip navigation={navigation} />
                        </View> */}
                    </View>
                </View>
            </View>
        // </ScrollView>
    );
}


const styles = StyleSheet.create({
    tabBarIconCreate: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarIcon: {
        marginBottom: 6,
    },
    SearchContainer: {
        marginTop: 10,
        height: 40,
        width: 280,
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        fontSize: 18,
        fontWeight: "normal",
    },
    sortbtn: {
        marginTop: 10,
        marginLeft: 5,
        height: 41,
        width: 40,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10
    },
});