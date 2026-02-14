import axios from 'axios';

// USE LOCAL IP ADDRESS FOR MOBILE
const API_URL = 'http://192.168.8.27:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getRecipes = async () => {
    try {
        const response = await api.get('/recipes');
        return response.data;
    } catch (error) {
        console.error('API Error (getRecipes):', error);
        throw error;
    }
};

export const getRecipeById = async (id) => {
    try {
        const response = await api.get(`/recipes/${id}`);
        return response.data;
    } catch (error) {
        console.error('API Error (getRecipeById):', error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('API Error (register):', error);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        console.error('API Error (login):', error);
        throw error;
    }
};

export default api;
