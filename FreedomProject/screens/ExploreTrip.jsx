import React from 'react';
import {
    Button,
    SafeAreaView,
    Text,
    View,
    Image,
    StyleSheet,
    TextInput
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';

import { PlaceTrip, RecommendedTrip } from '../components/index';

export default function ExploreTrip({ navigation }) {

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
        <SafeAreaView className="container mx-auto bg-white">
            <View className="h-full mx-[32px] pt-14 bg-white">
                <View className="h-auto w-full flex flex-row justify-between items-center">
                    {/* title */}
                    <View>
                        <Text className="text-[25px] text-gray-dark" style={{ fontFamily: 'promptRegular' }}>Explore Places to</Text>
                        <Text className="text-[29px] mt-[-10px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>Visit in Thailand</Text>
                    </View>
                    {/* noti & profile */}
                    <View className="flex flex-row justify-between items-center gap-3">
                        <Image source={{ uri: 'https://img.icons8.com/sf-regular/96/2E2E2E/appointment-reminders.png' }}
                            style={{ width: 28, height: 28 }} />
                        <Text className="w-[56px] h-[56px] bg-gray-dark rounded-xl"></Text>
                    </View>
                </View>
                {/* SearchBar */}
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={[styles.SearchContainer]}>
                        <Image source={{ uri: 'https://img.icons8.com/fluency-systems-filled/48/search.png' }}
                            style={{ width: 24, height: 24 }} className="ml-3" />
                        <TextInput placeholder='Search' className="ml-3" style={[styles.input]}></TextInput>
                    </View>
                    <View style={[styles.sortbtn]}>
                        <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAy0lEQVR4nO3YSw6CMBSF4X8fitHuXAawAXEBdi+ibgJjchMNYSCP2xRyvuROOijcPsgJICIiGxOAGnhZ1Ta2KifgAXS9aoEjK1Lai1+AnVVjY2fvh8eBFZxb+5/5Dw7zx1SNFM6N3FIdrcZ25dPQNdXRWvqytwMreF/bZcc+tRXwtKqsQRERyVJQat5aao4Ooc47NcfcGyn+bMQ9/U5VKjVnKCg1i4j0KZnmpFwimaYQF06mKSrOacT7f243oialXyXTHAUlUxER4esNlJFPhidtdXQAAAAASUVORK5CYII=' }}
                            style={{ width: 24, height: 24 }} />
                    </View>
                </View>
                <View className="mt-4">
                    <Text className="text-[20px]" style={{ fontFamily: 'promptMedium' }}>Popular Places</Text>
                    <View className="flex flex-row mt-[20px] justify-between">
                        {/* Popular places box1 */}
                        <PlaceTrip navigation={navigation}/>
                        {/* Popular places box2 */}
                        <PlaceTrip navigation={navigation}/>
                    </View>
                </View>

                <View className="mt-[30px]">
                    <Text className="text-[20px]" style={{ fontFamily: 'promptMedium' }}>Recommended Trip</Text>

                    <View className="mt-[20px] flex">
                        {/* Recommended trip 1 */}
                        <RecommendedTrip navigation={navigation} />
                        {/* Recommended trip 2 */}
                        <RecommendedTrip navigation={navigation} />
                    </View>
                </View>
            </View>

        </SafeAreaView>
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
        width: 300,
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