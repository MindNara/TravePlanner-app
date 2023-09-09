import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    ImageBackground,
    Pressable
} from 'react-native';
import { useFonts } from '@expo-google-fonts/prompt';

export default function PlaceTrip({ navigation }) {

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
        <SafeAreaView>
            <View style={[styles.boxPopular]}>
                <View style={[styles.imgPopular]}>
                    <Image source={require('../assets/TripImage.png')}
                        style={{ width: 148, height: 157, borderRadius: 20 }} />
                    <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABsklEQVR4nO2XTStEURjHf2LhNcOGrcJCERuS7JWlBWVNCkX5Jj4BxkvTbEhM+QI+ASMpWQxF3l8XHJ16pqSYueeeO/fI+dW/ptvMc35Pc+99zgGPx+PxeP4RNcAYsArsAydAFtgEpoHGImro78zIb7JSQ9dKAqNAdRTiZcAkcA6oX3InjfyEFr8vUCMHTMiaVqgC1gss+j0bQO2XGvpzKmCNVaAyrHyZgXw+u0AFUA5sGdZIh/0n5g0XzmdREqbGrKl8A3AdcnEbuQISJg1MOyCvJFMmDWQcEFeSHZMGzhwQV5JTkwZeHRBXEu0SmAcHxNWXARmYIwfEleTQpIENB8SVZM2kgXEHxJVEbyADUwc8OyD/Ii5GpB1oIEUIuoD3GOXfgR5CEufDnMQC7cBbTMOrFUssxNDAHBbRh4rtEspnbB4p8zQXcSa2kRzQRER0RnzIubXx1ilEP/AYgfwzMEiJGLY8pZ+AIUpML3BhQf4SGCAmWoCDEPLHQBsxk5CJGVR+GajHIUbkdigkfiNbdSfRs2Llhw2gvrYU5TveJh2yDf4Q+T2gmz9In8Tj8Xg8OMkn7FcpedVOGikAAAAASUVORK5CYII=' }}
                        style={{ width: 24, height: 26 }} className="absolute bottom-16 left-16" />
                </View>
                <View className="top-16 mr-10">
                    <Text className="text-[16px]" style={{ fontFamily: 'promptLight' }}>Province</Text>
                    <Text className="text-[18px]" style={{ fontFamily: 'promptSemiBold' }}>Place Name</Text>
                </View>
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
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