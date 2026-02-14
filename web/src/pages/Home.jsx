import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Button from '../components/Button';
import { TrendingUp } from 'lucide-react';
import { getRecipes } from '../services/api';

const CATEGORIES = ["Semua", "Masakan Harian", "Ide Jualan", "Kue Basah", "Menu Diet", "Camilan"];

const Home = () => {
    const navigate = useNavigate();
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

    const filteredRecipes = activeCategory === "Semua"
        ? recipes
        : recipes.filter(recipe => recipe.category === activeCategory);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading Recipes...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="relative rounded-3xl overflow-hidden p-6 md:p-10 text-white shadow-lg shadow-orange-200">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1600&auto=format&fit=crop"
                        alt="Banner Food"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
                </div>

                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                        Mau masak apa <br /> hari ini, Bu?
                    </h1>
                    <p className="text-lg md:text-xl mb-8 opacity-90 text-gray-100">
                        Temukan inspirasi resep harian atau ide jualan laris manis disini.
                    </p>
                    <Button variant="primary" className="px-8 py-4 text-lg shadow-lg shadow-orange-900/20 hover:scale-105" onClick={() => document.getElementById('recipes').scrollIntoView()}>
                        Mulai Masak
                    </Button>
                </div>
            </section>

            {/* Categories */}
            <section className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {CATEGORIES.map((cat, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full whitespace-nowrap transition-all font-semibold shadow-sm
                    ${activeCategory === cat
                                ? 'bg-primary text-white shadow-orange-200'
                                : 'bg-surface text-gray-500 hover:bg-orange-50'}`}
                    >
                        {cat}
                    </button>
                ))}
            </section>

            {/* Featured / Trending (Only show on 'Semua') */}
            {activeCategory === "Semua" && (
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="text-primary" />
                        <h2 className="text-xl font-bold text-text">Sedang Hits</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Feature top 2 recipes */}
                        {recipes.slice(0, 2).map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                {...recipe}
                                onClick={() => navigate(`/recipe/${recipe.id}`)}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Main Recipe Grid */}
            <section id="recipes">
                <h2 className="text-xl font-bold text-text mb-4">
                    {activeCategory === "Semua" ? "Resep Terbaru" : `Resep ${activeCategory}`}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            {...recipe}
                            onClick={() => navigate(`/recipe/${recipe.id}`)}
                        />
                    ))}
                </div>
                {filteredRecipes.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        Belum ada resep di kategori ini.
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
