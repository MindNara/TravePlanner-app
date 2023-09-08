import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    ImageBackground
} from 'react-native';

// import fonts prompt
import {
    useFonts,
    Prompt_300Light,
    Prompt_400Regular,
    Prompt_500Medium,
    Prompt_600SemiBold,
    Prompt_700Bold,
} from '@expo-google-fonts/prompt';

export default function Intro() {

    let [] = useFonts({
        Prompt_300Light,
        Prompt_400Regular,
        Prompt_500Medium,
        Prompt_600SemiBold,
        Prompt_700Bold,
    });

    return (
        <SafeAreaView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});