import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    ImageBackground,
    Pressable,
    FlatList,
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';
import { useSelector } from "react-redux";
import { userSelector } from "../redux/usersSlice";
import { firebase_auth, db } from '../firebase/firebaseConfig';
import { query, where, doc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc} from 'firebase/firestore';

export default function PlaceTrip({ navigation, item }) {

    // console.log(item);
    // const user = useSelector(userSelector);
    // const user_info = user.user_info;

    const [like, setLike] = useState(false);
    // const [docId, setDocId] = useState('');
    const [loaded] = useFonts({
        promptLight: require("../assets/fonts/Prompt-Light.ttf"),
        promptRegular: require("../assets/fonts/Prompt-Regular.ttf"),
        promptMedium: require("../assets/fonts/Prompt-Medium.ttf"),
        promptSemiBold: require("../assets/fonts/Prompt-SemiBold.ttf"),
        promptBold: require("../assets/fonts/Prompt-Bold.ttf"),
    });

    const likePlace = async () => {
        const user = firebase_auth.currentUser;

        try {
            // console.log(item.place_id);
            // console.log(item.place_name);
            // console.log(item.category_code);
            // console.log(item.thumbnail_url);
            // console.log(item.location.province);
            const wishlistRef = await addDoc(collection(db, "wishlist"), {
                place_id: item.place_id,
                place_title: item.place_name,
                place_category: item.category_code,
                place_province: item.location.province,
                image_place: item.thumbnail_url,
                status_like: true,
                user_id: user.uid
            });
            alert("Add wishlist success");
            // setDocId(wishlistRef.id);
            // console.log(wishlistRef);
            setLike(true);
        } catch (error) {
            console.log(error);
        }

        // const userDocRef = doc(db, 'wishlist');

        // console.log(item);
        // console.log(user.uid);

    }

    const unlikePlace = async () => {
        const q = query(collection(db, "wishlist"), where("place_id", "==", item.place_id));

        const querySnapshot = await getDocs(q);

        console.log(querySnapshot);

        let docId = null;

        querySnapshot.forEach(document => {
            docId = document.id;
        });

        const documentRef = doc(db, 'wishlist', docId);
        try {
            await deleteDoc(documentRef);
            alert(`Wishlist deleted successfully.`);
            setLike(false);
        } catch (error) {
            console.error("Error deleting wishlist:", error);
        }
        console.log(docId);
    }

    if (!loaded) {
        return null;
    }

    return (
        <View className="mb-4">
            <Pressable onPress={() => {
                navigation.navigate("PlaceDetail", { item: item });
            }}>
                <View className="h-[223px] w-[156px] bg-gray-light mr-[15px] rounded-[20px]">
                    {/* Image */}
                    <View className="relative w-full h-[160]">
                        {item.thumbnail_url == "" ? (<Image className="w-full h-full rounded-[20px]"
                            source={require('../assets/TripImage.png')} />) : (<Image className="w-full h-full rounded-[20px]"
                                source={{ uri: item.thumbnail_url }} />)}

                        <View className="bg-gray-dark w-full h-full rounded-[20px] opacity-10 absolute"></View>
                        {like === false ? (
                            <Pressable onPress={likePlace}>
                                <View className="top-[-150px] left-[110px]">
                                    <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-60"></View>
                                    <Image className="absolute top-[9px] left-2" source={{ uri: 'https://img.icons8.com/material-outlined/24/9a1b29/like--v1.png' }}
                                        style={{ width: 20, height: 20 }} />
                                </View>
                            </Pressable>) : (
                            <Pressable onPress={unlikePlace}>
                                <View className="top-[-150px] left-[110px]">
                                    <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-60"></View>
                                    <Image className="absolute top-[9px] left-2" source={{ uri: 'https://img.icons8.com/ios-glyphs/30/9A1B29/like--v1.png' }}
                                        style={{ width: 20, height: 20 }} />
                                </View>
                            </Pressable>)}

                    </View>

                    {/* Title */}
                    <View className="pt-[10px] pl-[12px]">
                        <Text className="text-[10px]" style={{ fontFamily: 'promptLight' }}>{item.location.province}</Text>
                        <Text className="text-[18px] h-7 w-[130px]" style={{ fontFamily: 'promptSemiBold' }}>{item.place_name}</Text>
                    </View>
                </View>

                {/* Old version */}
                {/* <View className="shadow-xl" style={[styles.boxPopular]}>
                    <View style={[styles.imgPopular]}>
                        <Image source={{ uri: item.thumbnail_url }}
                            style={{ width: 142, height: 160, borderRadius: 20 }} />
                        <View className="bg-gray-dark w-[142px] h-[160px] rounded-[20px] opacity-10 absolute z-20"></View>
                        <View style={[styles.btn]} className="absolute bg-white bottom-14 left-14 opacity-60"></View>
                        <Image className="absolute bottom-[62] left-[62]" source={{ uri: 'https://img.icons8.com/ios-filled/50/9a1b29/like--v1.png' }}
                            style={{ width: 20, height: 20 }} />
                    </View>
                    <View className="top-16 right-1">
                        <Text className="text-[12px]" style={{ fontFamily: 'promptLight' }}>{item.location.province}</Text>
                        <Text className="text-[18px] h-7 w-[130px]" style={{ fontFamily: 'promptSemiBold' }}>{item.place_name}</Text>
                    </View>
                </View> */}
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    boxPopular: {
        height: 240,
        width: 165,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 20,
        marginRight: 15,
    },
    imgPopular: {
        height: 36,
        width: 50,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    btn: {
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 50,
    },
});