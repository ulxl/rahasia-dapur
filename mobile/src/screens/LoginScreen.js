import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>

                <View className="items-center mb-10">
                    <Text className="text-3xl font-bold text-primary mb-2">Selamat Datang!</Text>
                    <Text className="text-gray-500 text-base text-center">Masuk untuk mulai belajar memasak.</Text>
                </View>

                <View className="space-y-6 gap-4">
                    <View>
                        <Text className="text-sm font-bold text-gray-600 mb-2 ml-1">Email</Text>
                        <TextInput
                            className="w-full bg-white px-4 py-4 rounded-2xl text-gray-800 border-2 border-gray-100 focus:border-primary"
                            placeholder="contoh@email.com"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                        />
                    </View>

                    <View>
                        <Text className="text-sm font-bold text-gray-600 mb-2 ml-1">Kata Sandi</Text>
                        <TextInput
                            className="w-full bg-white px-4 py-4 rounded-2xl text-gray-800 border-2 border-gray-100 focus:border-primary"
                            placeholder="********"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry
                        />
                        <TouchableOpacity className="items-end mt-2">
                            <Text className="text-primary font-semibold">Lupa Kata Sandi?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className="w-full bg-primary py-4 rounded-2xl items-center shadow-lg shadow-orange-200 mt-4 active:scale-95"
                        onPress={() => navigation.replace('Home')}
                    >
                        <Text className="text-white font-bold text-lg">Masuk</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-center mt-8">
                    <Text className="text-gray-500">Belum punya akun? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text className="text-primary font-bold">Daftar sekarang</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;
