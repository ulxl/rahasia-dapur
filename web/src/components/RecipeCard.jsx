import React from 'react';
import { Clock, Star, ChefHat } from 'lucide-react';

const RecipeCard = ({ title, image, time, difficulty, rating, onClick }) => {
    return (
        <div
            className="bg-surface rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100"
            onClick={onClick}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-text flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    {rating}
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-lg text-text mb-1 group-hover:text-primary transition-colors line-clamp-1">{title}</h3>

                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ChefHat size={14} />
                        <span className="capitalize">{difficulty}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
