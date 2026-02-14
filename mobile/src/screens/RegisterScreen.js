import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>

                <View className="items-center mb-10">
                    <Text className="text-3xl font-bold text-primary mb-2">Buat Akun</Text>
                    <Text className="text-gray-500 text-base text-center">Gabung komunitas Rahasia Dapur.</Text>
                </View>

                <View className="space-y-6 gap-4">
                    <View>
                        <Text className="text-sm font-bold text-gray-600 mb-2 ml-1">Nama Lengkap</Text>
                        <TextInput
                            className="w-full bg-white px-4 py-4 rounded-2xl text-gray-800 border-2 border-gray-100 focus:border-primary"
                            placeholder="Ibu Budi"
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>

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
                    </View>

                    <TouchableOpacity
                        className="w-full bg-primary py-4 rounded-2xl items-center shadow-lg shadow-orange-200 mt-4 active:scale-95"
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text className="text-white font-bold text-lg">Daftar</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-center mt-8">
                    <Text className="text-gray-500">Sudah punya akun? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="text-primary font-bold">Masuk disini</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;
