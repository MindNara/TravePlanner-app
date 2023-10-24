import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
import { firebase_auth, db } from '../firebase/firebaseConfig';
import { useDispatch } from "react-redux";
import { query, where, doc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { wishlistSlice, wishlistSelector, wishListReceived, wishlistStatus } from '../redux/wishlistSlice';

export default function WishlistForTrip({ navigation }) {

    const dispatch = useDispatch();
    const [wishlist, setWishlist] = useState([]);

    const wishlists = useSelector(wishlistSelector);
    const wishlistItem = wishlists.wish_list;
    // console.log(wishlist.length);

    const getWishlist = async () => {
        const user = firebase_auth.currentUser;
        try {
            const querySnapshot = await getDocs(query(collection(db, "wishlist"), where("user_id", "==", user.uid)));
            // console.log("Total Wishlist: ", querySnapshot.size);
            const wishlistDoc = [];
            querySnapshot.forEach((doc) => {
                wishlistDoc.push({ ...doc.data(), key: doc.id });
            });
            // console.log(wishlistDoc)
            setWishlist(wishlistDoc);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getWishlist();
        }, [])
    );

    const [status, setStatus] = useState(true);

    // console.log(wishlist.length)
    const addWishlist = (province, title, category, image) => {
        const wishList = {
            place_province: province,
            place_name: title,
            category_code: category,
            place_image: image
        }
        // console.log(wishList)
        dispatch(wishListReceived(wishList));
        dispatch(wishlistStatus());
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
        <View className="flex-row flex-wrap">
            {wishlist.map((item, index) => (
                <View key={index} className="h-[240px] w-[150px] bg-gray-light m-[5px] rounded-[20px]">
                    {/* Image */}
                    <View className="relative w-full h-[140px]">
                        <Image className="w-full h-full rounded-[20px]" source={{ uri: item.image_place }} />
                        <View className="bg-gray-dark w-full h-full rounded-[20px] opacity-10 absolute"></View>
                    </View>

                    {/* Title */}
                    <View className="pt-[10px] pl-[12px] w-[140px]">
                        <Text className="text-[10px]" style={{ fontFamily: 'promptLight' }}>{item.place_province}</Text>
                        <Text className="text-[16px] h-7 w-[130px]" style={{ fontFamily: 'promptMedium' }}>{item.place_name}</Text>

                        {/* Btn */}
                        <Pressable className="bg-black py-[6px] rounded-[10px] items-center"
                            onPress={() => { addWishlist(item.place_province, item.place_name, item.category_code, item.image_place) }}>
                            <Text className="text-[12px] text-white" style={{ fontFamily: 'promptMedium' }}>Add Place</Text>
                        </Pressable>
                    </View>

                </View>
            ))}
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