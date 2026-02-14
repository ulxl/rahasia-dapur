import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChefHat, Star, ArrowLeft, Heart, Share2, PlayCircle } from 'lucide-react';
import Button from '../components/Button';

import { getRecipeById } from '../services/api';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await getRecipeById(id);
                setRecipe(data);
            } catch (error) {
                console.error("Failed to fetch recipe:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <div className="flex bg-background min-h-screen items-center justify-center">Loading...</div>;
    if (!recipe) return <div className="flex bg-background min-h-screen items-center justify-center">Resep tidak ditemukan</div>;

    return (
        <div className="pb-20">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-orange-100 rounded-full transition-colors">
                    <ArrowLeft className="text-text" />
                </button>
                <div className="flex gap-2">
                    <button onClick={() => setIsFavorite(!isFavorite)} className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100 text-gray-500'}`}>
                        <Heart className={isFavorite ? "fill-current" : ""} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <Share2 />
                    </button>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-lg mb-8 group">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-10">
                    <div>
                        <div className="bg-primary/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg inline-block mb-3 shadow-lg">
                            RESEP PILIHAN
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 shadow-sm">{recipe.title}</h1>
                        <div className="flex items-center gap-4 text-white/90 text-sm font-medium">
                            <div className="flex items-center gap-1"><Clock size={16} /> {recipe.time}</div>
                            <div className="flex items-center gap-1"><ChefHat size={16} /> {recipe.difficulty}</div>
                            <div className="flex items-center gap-1"><Star size={16} className="text-yellow-400 fill-yellow-400" /> {recipe.rating}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    <section className="bg-surface p-6 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Tentang Resep</h2>
                        <p className="text-gray-600 leading-relaxed">{recipe.description}</p>
                    </section>

                    <section className="bg-surface p-6 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Bahan - Bahan</h2>
                        <ul className="space-y-3">
                            {recipe.ingredients.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-orange-50 transition-colors cursor-pointer group">
                                    <div className="w-6 h-6 rounded-full border-2 border-primary/40 group-hover:bg-primary group-hover:border-primary flex items-center justify-center transition-colors mt-0.5">
                                        <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100"></div>
                                    </div>
                                    <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Sidebar / Instructions */}
                <div className="space-y-8">
                    <section className="bg-secondary/10 p-6 rounded-2xl border-2 border-secondary/20">
                        <div className="flex items-center gap-2 mb-6">
                            <PlayCircle className="text-primary" size={24} />
                            <h2 className="text-xl font-bold text-primary">Tutorial Video</h2>
                        </div>
                        {/* Video Placeholder */}
                        <div className="aspect-video bg-gray-900 rounded-xl relative overflow-hidden group cursor-pointer shadow-lg">
                            <img src={recipe.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <PlayCircle className="text-white fill-white" size={48} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-surface p-6 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-6">Cara Membuat</h2>
                        <div className="space-y-6 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gray-100"></div>

                            {recipe.steps.map((step, idx) => (
                                <div key={idx} className="flex gap-4 relative">
                                    <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0 z-10 shadow-sm shadow-orange-200 text-sm">
                                        {idx + 1}
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-gray-700 leading-relaxed font-medium">{step}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <Button className="w-full py-4 text-lg">Selesai Masak!</Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
