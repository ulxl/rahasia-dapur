const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../utils/jsonDb');
const { v4: uuidv4 } = require('uuid');

// @route   GET api/recipes
router.get('/', (req, res) => {
    try {
        const recipes = readData('recipes');
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/recipes/:id
router.get('/:id', (req, res) => {
    try {
        const recipes = readData('recipes');
        const recipe = recipes.find(r => r.id === req.params.id); // uuid is string

        if (!recipe) {
            // Also try to match by numeric ID if MOCK_DATA was used
            const recipeByNum = recipes.find(r => r.id == req.params.id);
            if (recipeByNum) return res.json(recipeByNum);

            return res.status(404).json({ msg: 'Recipe not found' });
        }

        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/recipes
router.post('/', (req, res) => {
    const { title, image, time, difficulty, rating, category, ingredients, steps } = req.body;

    try {
        const recipes = readData('recipes');
        const newRecipe = {
            id: uuidv4(),
            title,
            image,
            time,
            difficulty,
            rating: rating || 0,
            category,
            ingredients,
            steps,
            date: new Date()
        };

        recipes.push(newRecipe);
        writeData('recipes', recipes);
        res.json(newRecipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/recipes/seed
router.post('/seed', (req, res) => {
    try {
        const MOCK_RECIPES = [
            {
                id: "1",
                title: "Sayur Asem Jakarta Segar",
                image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=600&auto=format&fit=crop",
                time: "45 mnt",
                difficulty: "mudah",
                rating: 4.8,
                category: "Masakan Harian",
                ingredients: ["Labu siam", "Jagung manis", "Kacang panjang", "Melinjo", "Asam jawa"],
                steps: ["Rebus air hingga mendidih", "Masukkan bumbu halus", "Masukkan sayuran keras", "Tambahkan asam jawa dan gula merah", "Koreksi rasa"]
            },
            {
                id: "2",
                title: "Ayam Goreng Lengkuas",
                image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=600&auto=format&fit=crop",
                time: "60 mnt",
                difficulty: "sedang",
                rating: 4.9,
                category: "Ide Jualan",
                ingredients: ["Ayam potong", "Lengkuas parut", "Bawang merah", "Bawang putih", "Kunyit"],
                steps: ["Ungkep ayam dengan bumbu", "Goreng ayam hingga kecoklatan", "Goreng sisa bumbu lengkuas", "Sajikan hangat"]
            },
            {
                id: "3",
                title: "Bolu Kukus Mekar",
                image: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?q=80&w=600&auto=format&fit=crop",
                time: "30 mnt",
                difficulty: "mudah",
                rating: 4.7,
                category: "Kue Basah",
                ingredients: ["Tepung terigu", "Gula pasir", "Telur", "Sprite/Soda", "Emulsifier"],
                steps: ["Mixer semua bahan hingga mengembang pucat", "Tuang ke cetakan", "Kukus dengan api besar selama 15 menit", "Jangan buka tutup kukusan"]
            },
            {
                id: "4",
                title: "Soto Ayam Lamongan",
                image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?q=80&w=600&auto=format&fit=crop",
                time: "90 mnt",
                difficulty: "sedang",
                rating: 4.7,
                category: "Ide Jualan",
                ingredients: ["Tepung terigu", "Gula pasir", "Telur", "Sprite/Soda", "Emulsifier"],
                steps: ["Mixer semua bahan hingga mengembang pucat", "Tuang ke cetakan", "Kukus dengan api besar selama 15 menit", "Jangan buka tutup kukusan"]
            },
            {
                id: "5",
                title: "Tumis Kangkung Belacan",
                image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=600&auto=format&fit=crop",
                time: "15 mnt",
                difficulty: "mudah",
                rating: 4.7,
                category: "Masakan Harian",
                ingredients: ["Tepung terigu", "Gula pasir", "Telur", "Sprite/Soda", "Emulsifier"],
                steps: ["Mixer semua bahan hingga mengembang pucat", "Tuang ke cetakan", "Kukus dengan api besar selama 15 menit", "Jangan buka tutup kukusan"]
            },
            {
                id: "6",
                title: "Donat Kentang Empuk",
                image: "https://images.unsplash.com/photo-1552046200-87806f06e2dc?q=80&w=600&auto=format&fit=crop",
                time: "120 mnt",
                difficulty: "sulit",
                rating: 4.7,
                category: "Ide Jualan",
                ingredients: ["Tepung terigu", "Gula pasir", "Telur", "Sprite/Soda", "Emulsifier"],
                steps: ["Mixer semua bahan hingga mengembang pucat", "Tuang ke cetakan", "Kukus dengan api besar selama 15 menit", "Jangan buka tutup kukusan"]
            }
        ];

        writeData('recipes', MOCK_RECIPES);
        res.json({ msg: "Database seeded successfully!", recipes: MOCK_RECIPES });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
