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
import { query, where, doc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

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
            // console.log(wishlist)
            // const isLiked = wishlistDoc.some(item_wishlist => item.place_id === item_wishlist.place_id);
            // setLike(isLiked);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getWishlist();
        }, [wishlist])
    );

    // useEffect(() => {
    //     // console.log(wishlist);
    // }, [wishlist]);

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

                    {/* SearchBar */}
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={[styles.SearchContainer]}>
                            <Image source={{ uri: 'https://img.icons8.com/fluency-systems-filled/48/search.png' }}
                                style={{ width: 20, height: 20 }} className="ml-3 opacity-80" />
                            <TextInput placeholder='Search location' className="ml-3 w-full text-[12px]" style={[styles.input, { fontFamily: 'promptRegular', fontSize: 12 }]}></TextInput>
                        </View>
                        <View style={[styles.sortbtn]}>
                            <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAy0lEQVR4nO3YSw6CMBSF4X8fitHuXAawAXEBdi+ibgJjchMNYSCP2xRyvuROOijcPsgJICIiGxOAGnhZ1Ta2KifgAXS9aoEjK1Lai1+AnVVjY2fvh8eBFZxb+5/5Dw7zx1SNFM6N3FIdrcZ25dPQNdXRWvqytwMreF/bZcc+tRXwtKqsQRERyVJQat5aao4Ooc47NcfcGyn+bMQ9/U5VKjVnKCg1i4j0KZnmpFwimaYQF06mKSrOacT7f243oialXyXTHAUlUxER4esNlJFPhidtdXQAAAAASUVORK5CYII=' }}
                                style={{ width: 20, height: 20 }} />
                        </View>
                    </View>

                    <View className="mt-2">
                        <View className="flex-row flex-wrap mt-[20px]">
                            <FlatList
                                data={wishlist}
                                keyExtractor={item => item.place_id}
                                renderItem={({ item }) => (
                                    <PlaceTrip item={item} navigation={navigation} />
                                )}
                                numColumns={2}
                                // showsHorizontalScrollIndicator={false}
                            />
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
    }
});