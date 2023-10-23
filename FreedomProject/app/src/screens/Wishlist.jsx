import React, { useState, useEffect } from 'react';
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
    FlatList
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';
import { PlaceTrip, RecommendedTrip, Header } from '../components/index';
import { firebase_auth, db } from '../firebase/firebaseConfig';
import { query, where, doc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

export default function Wishlist({ navigation }) {

    const [wishlist, setWishlist] = useState([]);
    const [like, setLike] = useState(true)


    const [loaded] = useFonts({
        promptLight: require("../assets/fonts/Prompt-Light.ttf"),
        promptRegular: require("../assets/fonts/Prompt-Regular.ttf"),
        promptMedium: require("../assets/fonts/Prompt-Medium.ttf"),
        promptSemiBold: require("../assets/fonts/Prompt-SemiBold.ttf"),
        promptBold: require("../assets/fonts/Prompt-Bold.ttf"),
    });

    const getWishlist = () => {
        const user = firebase_auth.currentUser;
        console.log(user.uid);

        const wishlistQuery = query(collection(db, "wishlist"), where("user_id", "==", user.uid));

        const unsubscribe = onSnapshot(wishlistQuery, (snapshot) => {
            const myWishlist = [];
            snapshot.forEach((doc) => {
                myWishlist.push({ ...doc.data(), key: doc.id });
            });
            console.log(myWishlist);
            setWishlist(myWishlist);
        }, (error) => {
            console.error("Error fetching myWishlist:", error);
        });

        // คืนค่าฟังก์ชัน unsubscribe เพื่อที่เราจะเรียกเมื่อต้องการหยุดฟังค้นหา
        return unsubscribe;
    }

    // useFocusEffect(
    //     React.useCallback(() => {
    //         getWishlist();
    //     }, [wishlist])
    // );


    useEffect(() => {
        const unsubscribe = getWishlist();
        return unsubscribe;  // จะเรียกเมื่อ component ถูก unmount
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <ScrollView className="bg-white">
            <View className="container mx-auto bg-white">
                <View className="h-full mx-[32px] pt-14 bg-white">
                    {/* Header */}
                    <View>
                        <Header screen={"Wishlist"} title={"My Travel"} subtitle={"Wishlist"} navigation={navigation} />
                    </View>

                    <View className="mt-6">
                        <View className="flex-row flex-wrap">
                            {wishlist.map(item => (
                                <View className="w-[50%] p-1 mt-[-16px]"
                                    key={item.place_id}>
                                    <PlaceTrip
                                        item={item}
                                        navigation={navigation}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
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
    imgPopular: {
        height: 36,
        width: 50,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    boxPopular: {
        height: 240,
        width: 170,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 20
    },
});