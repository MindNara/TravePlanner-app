import React, { useState, useEffect } from "react";
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
import { PlaceApi, TripApi } from '../data/PlaceApi';

export default function ExploreTrip({ navigation }) {

    const { data, loading } = PlaceApi();

    const { dataTrip, loadedTrip } = TripApi();

    // console.log(dataTrip.result);

    const placeItems = data.result ? data.result.filter((item, index) => index < 5) : [];
    // console.log(placeItems);

    const TripItems = dataTrip.result ? dataTrip.result.filter((item, index) => index < 3) : [];
    // console.log("eiei");
    // console.log(TripItems);


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
            <View className="container mx-auto bg-white">

                <View className="w-full h-[200px]">
                    <View className="w-full h-[165px] bg-white px-[32px] rounded-b-[0px]">
                        {/* Header */}
                        <View className="pt-14">
                            <Header screen={"ExploreTrip"} title={"Explore Places to"} subtitle={"Visit in Thailand"} navigation={navigation} />
                        </View>

                        {/* SearchBar */}
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={[styles.SearchContainer]}>
                                <Image source={{ uri: 'https://img.icons8.com/fluency-systems-filled/48/search.png' }}
                                    style={{ width: 18, height: 20 }} className="ml-3 opacity-80" />
                                <TextInput placeholder='Search location' className="ml-3 w-full text-[14px]" style={[styles.input, { fontFamily: 'promptRegular', fontSize: 12 }]}></TextInput>
                            </View>
                            <View style={[styles.sortbtn]}>
                                <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAy0lEQVR4nO3YSw6CMBSF4X8fitHuXAawAXEBdi+ibgJjchMNYSCP2xRyvuROOijcPsgJICIiGxOAGnhZ1Ta2KifgAXS9aoEjK1Lai1+AnVVjY2fvh8eBFZxb+5/5Dw7zx1SNFM6N3FIdrcZ25dPQNdXRWvqytwMreF/bZcc+tRXwtKqsQRERyVJQat5aao4Ooc47NcfcGyn+bMQ9/U5VKjVnKCg1i4j0KZnmpFwimaYQF06mKSrOacT7f243oialXyXTHAUlUxER4esNlJFPhidtdXQAAAAASUVORK5CYII=' }}
                                    style={{ width: 20, height: 20 }} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Header
                <View>
                    <Header screen={"ExploreTrip"} title={"Explore Places to"} subtitle={"Visit in Thailand"} navigation={navigation} />
                </View>

                SearchBar
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={[styles.SearchContainer]}>
                        <Image source={{ uri: 'https://img.icons8.com/fluency-systems-filled/48/search.png' }}
                            style={{ width: 18, height: 20 }} className="ml-3 opacity-80" />
                        <TextInput placeholder='Search location' className="ml-3 w-full text-[14px]" style={[styles.input, { fontFamily: 'promptRegular', fontSize: 12 }]}></TextInput>
                    </View>
                    <View style={[styles.sortbtn]}>
                        <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAy0lEQVR4nO3YSw6CMBSF4X8fitHuXAawAXEBdi+ibgJjchMNYSCP2xRyvuROOijcPsgJICIiGxOAGnhZ1Ta2KifgAXS9aoEjK1Lai1+AnVVjY2fvh8eBFZxb+5/5Dw7zx1SNFM6N3FIdrcZ25dPQNdXRWvqytwMreF/bZcc+tRXwtKqsQRERyVJQat5aao4Ooc47NcfcGyn+bMQ9/U5VKjVnKCg1i4j0KZnmpFwimaYQF06mKSrOacT7f243oialXyXTHAUlUxER4esNlJFPhidtdXQAAAAASUVORK5CYII=' }}
                            style={{ width: 20, height: 20 }} />
                    </View>
                </View> */}

                <View className="h-full mx-[32px] bg-white">
                    <View className="my-[20px]">
                        <Text className="text-[20px]" style={{ fontFamily: 'promptMedium' }}>Popular Places</Text>
                        <View className="flex flex-row mt-[20px] justify-between">

                            {loading ? (<Text>Loading...</Text>) : (
                                <FlatList
                                    data={placeItems}
                                    keyExtractor={item => item.place_id}
                                    renderItem={({ item }) => (
                                        <PlaceTrip item={item} navigation={navigation} />
                                    )}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                />
                            )}

                        </View>
                    </View>

                    <View>
                        <Text className="text-[20px]" style={{ fontFamily: 'promptMedium' }}>Recommended Trip</Text>
                        <View className="mt-[20px]">
                            {loading ? (<Text>Loading...</Text>) : (
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
        </ScrollView >
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
        height: 220,
        width: 170,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 20
    }
});