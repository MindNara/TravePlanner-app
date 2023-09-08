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

export default function ExploreTrip() {

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
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <View style={[styles.SearchContainer]}>
                        <Image source={{ uri: 'https://img.icons8.com/fluency-systems-filled/48/search.png' }}
                        style={{ width: 24, height: 24 }} className="ml-3" />
                        <TextInput placeholder='Search' className="ml-3" style={[styles.input]}></TextInput>
                    </View>
                    <View style={[styles.sortbtn]}>
                    <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAy0lEQVR4nO3YSw6CMBSF4X8fitHuXAawAXEBdi+ibgJjchMNYSCP2xRyvuROOijcPsgJICIiGxOAGnhZ1Ta2KifgAXS9aoEjK1Lai1+AnVVjY2fvh8eBFZxb+5/5Dw7zx1SNFM6N3FIdrcZ25dPQNdXRWvqytwMreF/bZcc+tRXwtKqsQRERyVJQat5aao4Ooc47NcfcGyn+bMQ9/U5VKjVnKCg1i4j0KZnmpFwimaYQF06mKSrOacT7f243oialXyXTHAUlUxER4esNlJFPhidtdXQAAAAASUVORK5CYII=' }}
                        style={{ width: 24, height: 24 }}/>
                    </View>
                </View>
                <View className="mt-6">
                    <Text className="text-[20px]" style={{ fontFamily: 'promptMedium' }}>Popular Places</Text>
                    <View className="flex flex-row gap-3 mt-1">
                        {/* Popular places box1 */}
                        <View style={[styles.boxPopular]}>
                            <View style={[styles.imgPopular]}>
                                <Image source={require('../assets/TripImage.png')}
                                style={{ width: 148, height: 157, borderRadius: 20}} className="bottom-1"/>
                                <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABsklEQVR4nO2XTStEURjHf2LhNcOGrcJCERuS7JWlBWVNCkX5Jj4BxkvTbEhM+QI+ASMpWQxF3l8XHJ16pqSYueeeO/fI+dW/ptvMc35Pc+99zgGPx+PxeP4RNcAYsArsAydAFtgEpoHGImro78zIb7JSQ9dKAqNAdRTiZcAkcA6oX3InjfyEFr8vUCMHTMiaVqgC1gss+j0bQO2XGvpzKmCNVaAyrHyZgXw+u0AFUA5sGdZIh/0n5g0XzmdREqbGrKl8A3AdcnEbuQISJg1MOyCvJFMmDWQcEFeSHZMGzhwQV5JTkwZeHRBXEu0SmAcHxNWXARmYIwfEleTQpIENB8SVZM2kgXEHxJVEbyADUwc8OyD/Ii5GpB1oIEUIuoD3GOXfgR5CEufDnMQC7cBbTMOrFUssxNDAHBbRh4rtEspnbB4p8zQXcSa2kRzQRER0RnzIubXx1ilEP/AYgfwzMEiJGLY8pZ+AIUpML3BhQf4SGCAmWoCDEPLHQBsxk5CJGVR+GajHIUbkdigkfiNbdSfRs2Llhw2gvrYU5TveJh2yDf4Q+T2gmz9In8Tj8Xg8OMkn7FcpedVOGikAAAAASUVORK5CYII=' }}
                                style={{ width: 24, height: 26}} className="absolute bottom-16 left-16"/>
                            </View>
                            <View className="top-16 mr-10">
                            <Text className="text-[16px]" style={{ fontFamily: 'promptLight' }}>Province</Text>
                            <Text className="text-[18px]" style={{ fontFamily: 'promptSemiBold' }}>Place Name</Text>
                            </View>
                        </View>

                        {/* Popular places box2 */}
                        <View style={[styles.boxPopular]}>
                            <View style={[styles.imgPopular]}>
                                <Image source={require('../assets/TripImage.png')}
                                style={{ width: 148, height: 157, borderRadius: 20}} className="bottom-1"/>
                                <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABsklEQVR4nO2XTStEURjHf2LhNcOGrcJCERuS7JWlBWVNCkX5Jj4BxkvTbEhM+QI+ASMpWQxF3l8XHJ16pqSYueeeO/fI+dW/ptvMc35Pc+99zgGPx+PxeP4RNcAYsArsAydAFtgEpoHGImro78zIb7JSQ9dKAqNAdRTiZcAkcA6oX3InjfyEFr8vUCMHTMiaVqgC1gss+j0bQO2XGvpzKmCNVaAyrHyZgXw+u0AFUA5sGdZIh/0n5g0XzmdREqbGrKl8A3AdcnEbuQISJg1MOyCvJFMmDWQcEFeSHZMGzhwQV5JTkwZeHRBXEu0SmAcHxNWXARmYIwfEleTQpIENB8SVZM2kgXEHxJVEbyADUwc8OyD/Ii5GpB1oIEUIuoD3GOXfgR5CEufDnMQC7cBbTMOrFUssxNDAHBbRh4rtEspnbB4p8zQXcSa2kRzQRER0RnzIubXx1ilEP/AYgfwzMEiJGLY8pZ+AIUpML3BhQf4SGCAmWoCDEPLHQBsxk5CJGVR+GajHIUbkdigkfiNbdSfRs2Llhw2gvrYU5TveJh2yDf4Q+T2gmz9In8Tj8Xg8OMkn7FcpedVOGikAAAAASUVORK5CYII=' }}
                                style={{ width: 24, height: 26}} className="absolute bottom-16 left-16"/>
                            </View>
                            <View className="top-16 mr-10">
                            <Text className="text-[16px]" style={{ fontFamily: 'promptLight' }}>Province</Text>
                            <Text className="text-[18px]" style={{ fontFamily: 'promptSemiBold' }}>Place Name</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mt-6">
                    <Text className="text-[20px]" style={{ fontFamily: 'promptMedium' }}>Recommended Trip</Text>

                    {/* Recommended trip 1 */}
                    <View className="bg-gray-light w-full h-[120px] p-2 rounded-[20px] mb-4 flex flex-row items-center">
                        <View className="bg-blue-light w-[100px] h-[100px] rounded-[20px] mr-3"></View>
                        <View className="bg-gray-light w-[212px] h-full p-2 justify-center">
                            <View className="flex flex-row justify-between items-center">
                                <Text className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>Trip Name</Text>
                                    <Image source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                                        style={{ width: 18, height: 18 }} />
                            </View>
                            <View className="mt-2 w-[full]">
                                <Text className="text-[10px] leading-3 text-gray-dark" style={{ fontFamily: 'promptLight' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</Text>
                            </View>
                        </View>
                    </View>

                     {/* Recommended trip 2 */}
                    <View className="bg-gray-light w-full h-[120px] p-2 rounded-[20px] mb-4 flex flex-row items-center">
                        <View className="bg-blue-light w-[100px] h-[100px] rounded-[20px] mr-3"></View>
                        <View className="bg-gray-light w-[212px] h-full p-2 justify-center">
                            <View className="flex flex-row justify-between items-center">
                                <Text className="text-[16px] text-gray-dark" style={{ fontFamily: 'promptSemiBold' }}>Trip Name</Text>
                                    <Image source={{ uri: 'https://img.icons8.com/material-outlined/96/2E2E2E/filled-like.png' }}
                                        style={{ width: 18, height: 18 }} />
                            </View>
                            <View className="mt-2 w-[full]">
                                <Text className="text-[10px] leading-3 text-gray-dark" style={{ fontFamily: 'promptLight' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</Text>
                            </View>
                        </View>
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
    input : {
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
        height: 41,
        width: 40,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10
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