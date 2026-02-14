import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import logo from '../../assets/logo-white.png';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="flex-1 bg-primary items-center justify-center p-6">
            {/* Decorative Circles */}
            <View className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <View className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/20 rounded-full -ml-24 -mb-24" />

            <View className="items-center mb-10">
                <View className="mb-4 transform rotate-3">
                    <Image source={logo} className="w-32 h-32" resizeMode="contain" />
                </View>
                <Text className="text-4xl font-extrabold text-white text-center shadow-sm">Rahasia Dapur</Text>
                <Text className="text-white/90 text-lg text-center mt-2 font-medium">Masak enak, jualan laris!</Text>
            </View>

            <View className="w-full space-y-4 gap-4">
                <TouchableOpacity
                    className="w-full bg-white py-4 rounded-2xl items-center shadow-lg active:scale-95"
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text className="text-primary font-bold text-lg">Masuk</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-full bg-transparent border-2 border-white py-4 rounded-2xl items-center active:scale-95"
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text className="text-white font-bold text-lg">Daftar Akun</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;
