import React from 'react';
import {
    SafeAreaView,
    Text,
    View
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';

export default function TabBar() {
    return (
        <SafeAreaView className="flex-1 items-center justify-center" >
            <Text >Tab Bar</Text>
        </SafeAreaView>
    );
}