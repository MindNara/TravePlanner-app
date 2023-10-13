import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    ImageBackground,
    ScrollView
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';
// import { ScrollView } from 'react-native-gesture-handler';

export default function PlaceDetails({ route, navigation }) {

    const item = route.params.item;
    // console.log(item);

    const [loading, setLoading] = useState(true);
    const [dataDetail, setDataDetail] = useState([]);

    const apiKey = 'GBlAR1kAdZLNcsEPOzvbb6chWCSSoyX2qORdP5ifIdceDVTo2crn)n0yJHoUqvj4V=2';

    useEffect(() => {
        fetch('https://tatapi.tourismthailand.org/tatapi/v5/' + item.category_code + '/' + item.place_id, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Accept-Language": "TH"
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setDataDetail(json);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    // console.log("eiei");
    // console.log(dataDetail.result);

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
        <View className="container mx-auto h-full bg-white">
            <ScrollView>
                {/* Header & Image */}
                <View className="w-full h-full bg-blue-light">
                    <Image className="absolute w-[400px] h-[300px]" source={{ uri: item.thumbnail_url }} />
                    <View className="w-[400px] h-[300px] bg-black absolute opacity-30"></View>
                    <View className="mx-[32px] pt-16 flex flex-row justify-between">
                        <Pressable onPress={() => {
                            navigation.goBack();
                        }}>
                            <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                            <Image className="absolute top-[6.5px] left-[5px]" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/back.png' }}
                                style={{ width: 22, height: 22 }} />

                        </Pressable>
                        <View>
                            <View className="relative justify-center items-center h-[36px] w-[36px] bg-white rounded-3xl opacity-50"></View>
                            <Image className="absolute top-[9px] left-2" source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                                style={{ width: 20, height: 20 }} />
                        </View>
                    </View>

                    {/* content */}
                    <View className="bottom-0 mt-40 bg-white w-full h-full rounded-t-[50px]">
                        <View className="mx-[32px] pt-16">
                            {loading || !dataDetail.result ?
                                (<Text>Loading...</Text>) : (
                                    <View>
                                        <Text className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptRegular' }}>{dataDetail.result.destination}</Text>
                                        <Text className="text-[28px] text-gray-dark mt-[-6px]" style={{ fontFamily: 'promptSemiBold' }}>{item.place_name}</Text>
                                        {dataDetail.result.place_information.detail == "" ? (
                                            <Text className="text-[13px] text-gray-dark mt-[20px]" style={{ fontFamily: 'promptLight' }}>{dataDetail.result.place_information.introduction}</Text>
                                        ) : (<Text className="text-[13px] text-gray-dark mt-[20px]" style={{ fontFamily: 'promptLight' }}>{dataDetail.result.place_information.detail}</Text>)}
                                        <View className="flex flex-row items-center mt-[30px] gap-x-[16px]">
                                            <View className="justify-center items-center h-[45px] w-[45px] bg-gray-light rounded-3xl">
                                                <Image className="" source={{ uri: 'https://img.icons8.com/pastel-glyph/64/2E2E2E/shipping-location--v1.png' }}
                                                    style={{ width: 20, height: 20 }} />
                                            </View>
                                            <Text className="text-[14px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>{item.category_code}</Text>
                                        </View>
                                        <View className="flex flex-row mt-[10px] items-center gap-x-[16px]">
                                            <View className="justify-center items-center h-[45px] w-[45px] bg-gray-light rounded-3xl">
                                                <Image className="" source={{ uri: 'https://img.icons8.com/ios-glyphs/90/2E2E2E/map-marker.png' }}
                                                    style={{ width: 22, height: 22 }} />
                                            </View>
                                            <Text className="text-[14px] text-gray-dark" style={{ fontFamily: 'promptMedium' }}>VIEW LOCATION</Text>
                                        </View>
                                    </View>
                                )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
});