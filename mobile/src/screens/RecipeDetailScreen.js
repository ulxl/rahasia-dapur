import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { getRecipeById } from '../services/api';

const RecipeDetailScreen = ({ route }) => {
    const navigation = useNavigation();
    const { recipeId } = route.params;
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await getRecipeById(recipeId);
                setRecipe(data);
            } catch (error) {
                console.error("Failed to fetch recipe detail:", error);
            } finally {
                setLoading(false);
            }
        };

        if (recipeId) {
            fetchDetail();
        }
    }, [recipeId]);

    if (loading) {
        return <View className="flex-1 items-center justify-center bg-background"><ActivityIndicator size="large" color="#F97316" /></View>;
    }

    if (!recipe) {
        return <View className="flex-1 items-center justify-center bg-background"><Text>Resep tidak ditemukan</Text></View>;
    }

    return (
        <View className="flex-1 bg-background relative">
            {/* Header Image */}
            <Image source={{ uri: recipe.image }} className="w-full h-80" resizeMode="cover" />

            {/* Back Button Overlay */}
            <TouchableOpacity
                className="absolute top-12 left-6 w-10 h-10 bg-white/80 rounded-full items-center justify-center shadow-lg"
                onPress={() => navigation.goBack()}
            >
                <Octicons name="arrow-left" size={20} color="#374151" />
            </TouchableOpacity>

            {/* Content Container (Bottom Sheet Style) */}
            <ScrollView
                className="bg-background flex-1 -mt-10 rounded-t-3xl shadow-2xl"
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
            >
                <View className="flex-row justify-between items-start mb-4">
                    <View className="flex-1 mr-4">
                        <Text className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</Text>
                        <View className="flex-row gap-4">
                            <View className="flex-row items-center gap-1">
                                <Octicons name="clock" size={14} color="#6B7280" />
                                <Text className="text-gray-500 text-sm">{recipe.time}</Text>
                            </View>
                            <View className="flex-row items-center gap-1">
                                <Octicons name="flame" size={14} color="#6B7280" />
                                <Text className="text-gray-500 text-sm capitalize">{recipe.difficulty}</Text>
                            </View>
                            <View className="flex-row items-center gap-1">
                                <Octicons name="star-fill" size={14} color="#FBBF24" />
                                <Text className="text-gray-500 text-sm">{recipe.rating}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity className="w-12 h-12 bg-red-50 rounded-full items-center justify-center">
                        <Octicons name="heart" size={20} color="#EF4444" />
                    </TouchableOpacity>
                </View>

                <Text className="text-gray-600 leading-6 mb-8">{recipe.description}</Text>

                {/* Video Button */}
                <TouchableOpacity className="flex-row items-center bg-secondary/10 p-4 rounded-2xl border border-secondary/20 mb-8 active:opacity-80">
                    <View className="w-10 h-10 bg-primary rounded-full items-center justify-center mr-3 shadow-sm">
                        <Octicons name="play" size={18} color="white" />
                    </View>
                    <View>
                        <Text className="font-bold text-primary">Tonton Tutorial Video</Text>
                        <Text className="text-xs text-gray-500">Pelajari langkah demi langkah</Text>
                    </View>
                </TouchableOpacity>

                <View className="mb-8">
                    <Text className="text-lg font-bold text-gray-800 mb-4">Bahan - Bahan</Text>
                    {recipe.ingredients.map((item, idx) => (
                        <View key={idx} className="flex-row items-center mb-3 bg-white p-3 rounded-xl border border-gray-50">
                            <View className="w-2 h-2 bg-primary rounded-full mr-3" />
                            <Text className="text-gray-700 font-medium">{item}</Text>
                        </View>
                    ))}
                </View>

                <View>
                    <Text className="text-lg font-bold text-gray-800 mb-4">Cara Membuat</Text>
                    {recipe.steps.map((step, idx) => (
                        <View key={idx} className="flex-row mb-6">
                            <View className="w-8 h-8 bg-orange-100 rounded-full items-center justify-center mr-4 mt-1 border border-orange-200">
                                <Text className="text-primary font-bold">{idx + 1}</Text>
                            </View>
                            <Text className="flex-1 text-gray-700 leading-6 mt-1">{step}</Text>
                        </View>
                    ))}
                </View>

            </ScrollView>

            {/* Bottom Action */}
            <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 items-center shadow-lg">
                <TouchableOpacity className="w-full bg-primary py-4 rounded-2xl items-center shadow-md shadow-orange-200 active:scale-95">
                    <Text className="text-white font-bold text-lg">Mulai Masak</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RecipeDetailScreen;
