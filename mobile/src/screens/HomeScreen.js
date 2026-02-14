import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Octicons } from '@expo/vector-icons';
import logo from '../../assets/logo.png';
import { getRecipes } from '../services/api';

const CATEGORIES = ["Semua", "Harian", "Jualan", "Kue", "Diet", "Camilan"];

const HomeScreen = ({ navigation }) => {
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getRecipes();
                setRecipes(data);
            } catch (error) {
                console.error("Failed to fetch recipes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const renderRecipeCard = ({ item }) => (
        <TouchableOpacity
            className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100 overflow-hidden"
            onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
        >
            <Image source={{ uri: item.image }} className="w-full h-48" resizeMode="cover" />
            <View className="p-4">
                <View className="flex-row justify-between items-start mb-2">
                    <Text className="text-lg font-bold text-gray-800 flex-1 mr-2">{item.title}</Text>
                    <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-lg">
                        <Octicons name="star-fill" size={12} color="#FBBF24" />
                        <Text className="text-xs font-bold ml-1 text-yellow-600">{item.rating}</Text>
                    </View>
                </View>

                <View className="flex-row gap-4">
                    <View className="flex-row items-center">
                        <Octicons name="clock" size={12} color="#9CA3AF" />
                        <Text className="text-xs text-gray-500 ml-1">{item.time}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Octicons name="flame" size={12} color="#9CA3AF" />
                        <Text className="text-xs text-gray-500 ml-1 capitalize">{item.difficulty}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const filteredRecipes = activeCategory === "Semua"
        ? recipes
        : recipes.filter(r => r.category.includes(activeCategory) || r.category === activeCategory);

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="px-6 py-4 flex-row justify-between items-center bg-white shadow-sm">
                <View className="flex-row items-center gap-2">
                    <View className="items-center justify-center">
                        <Image source={logo} className="w-10 h-10" resizeMode="contain" />
                    </View>
                    <Text className="text-lg font-bold text-primary">Rahasia Dapur</Text>
                </View>
                <View className="w-8 h-8 bg-orange-100 rounded-full items-center justify-center">
                    <Octicons name="person" size={16} color="#FF8C42" />
                </View>
            </View>

            <ScrollView contentContainerStyle={{ padding: 24 }}>
                {/* Welcome Section */}
                <View className="mb-8">
                    <Text className="text-gray-500 text-lg">Halo, Ibu Budi 👋</Text>
                    <Text className="text-2xl font-bold text-gray-800">Mau masak apa hari ini?</Text>
                </View>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
                    {CATEGORIES.map((cat, idx) => (
                        <TouchableOpacity
                            key={idx}
                            onPress={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full mr-3 ${activeCategory === cat ? 'bg-primary' : 'bg-white border border-gray-100'}`}
                        >
                            <Text className={`font-semibold ${activeCategory === cat ? 'text-white' : 'text-gray-500'}`}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Recipe List */}
                <View>
                    <Text className="text-xl font-bold text-gray-800 mb-4">Resep Terbaru</Text>
                    {loading ? (
                        <Text className="text-gray-500 text-center">Memuat resep...</Text>
                    ) : (
                        filteredRecipes.map(item => (
                            <View key={item.id}>
                                {renderRecipeCard({ item })}
                            </View>
                        ))
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
