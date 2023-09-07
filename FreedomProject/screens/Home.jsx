import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native';

export default function Home() {

    return (
        <SafeAreaView className="container mx-auto bg-white">
            <View className="h-full mx-[32px] mt-8 bg-white">
                <View className="bg-white h-auto w-full flex flex-row justify-between items-center">
                    {/* title */}
                    <View>
                        <Text className="text-[16px]" style={{ fontFamily: 'Prompt_400Regular' }}>Hello</Text>
                        <Text className="text-[20px] mt-[-6px]" style={{ fontFamily: 'Prompt_600SemiBold' }}>Username</Text>
                    </View>
                    {/* noti & profile */}
                    <View className="flex flex-row justify-between items-center gap-5">
                        <Image source={{ uri: 'https://img.icons8.com/sf-regular/96/2E2E2E/appointment-reminders.png' }}
                            style={{ width: 22, height: 22 }} />
                        <Text className="w-[40px] h-[40px] bg-gray-dark rounded-lg"></Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});