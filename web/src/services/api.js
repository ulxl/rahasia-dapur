import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getRecipes = async () => {
    const response = await api.get('/recipes');
    return response.data;
};

export const getRecipeById = async (id) => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await api.post('/auth/login', userData);
    return response.data;
};

export default api;
