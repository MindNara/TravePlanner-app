import React from 'react';
import {
    Button,
    SafeAreaView,
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';

export default function ExploreTrip() {

    const [loaded] = useFonts({
        prompt : require("../assets/fonts/Prompt-Regular.ttf"),
        prompt2 : require("../assets/fonts/Prompt-SemiBold.ttf"),
        // prompt2  : require("../assets/fonts/Prompt-SemiBoldtalic.ttf")
    });

    if(!loaded) {
        return null;
    }

    return (
        <SafeAreaView className="container mx-auto bg-white">
            <View className="h-full mx-[26px] mt-10 bg-white">
                {/* <View className="flex flex-row">
                <View>
                    <Text className="text-xl">Explore Places to</Text>
                    <Text className="text-2xl font-bold">Visit in Thailand</Text>
                </View>
                <Image source={{ uri: 'https://img.icons8.com/fluency-systems-regular/48/appointment-reminders--v1.png' }} style={{ width: 28, height: 28 }} className="mt-4 ml-8" />
                <View style={[styles.boxProfile]} className="mt-3 ml-2"></View>
                </View> */}
                {/* <Text className="text-2xl font-bold">Popular Place</Text> */}

                <View className="h-auto w-full flex flex-row justify-between items-center">
                        {/* title */}
                        <View>
                            <Text className="text-[20px] text-gray-dark" style={{fontFamily: 'prompt'}}>Explore Places to</Text>
                            <Text className="text-[24px] mt-[-8px] text-gray-dark" style={{fontFamily: 'prompt2'}}>Visit in Thailand</Text>
                        </View>
                        {/* noti & profile */}
                        <View className="flex flex-row justify-between items-center gap-3">
                            <Image source={{ uri: 'https://img.icons8.com/sf-regular/96/2E2E2E/appointment-reminders.png' }}
                                style={{ width: 22, height: 22 }}  />
                            <Text className="w-[40px] h-[40px] bg-gray-dark rounded-lg"></Text>
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
    boxProfile: {
        backgroundColor: "black",
        width: 32,
        height: 32,
        borderRadius: 8
    }
});