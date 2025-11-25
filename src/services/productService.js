// IMPORTANTE: Usamos 'api' en lugar de 'axios' para que incluya el Token de seguridad
import api from './api';

const API_URL = '/api/products'; // 'api' ya tiene la base URL http://localhost:8080

// 1. OBTENER TODOS
export const getProducts = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error conectando con el backend:", error);
        return [];
    }
};

// 2. CREAR PRODUCTO (Requiere Token, 'api' lo pone solo)
export const createProduct = async (product) => {
    try {
        const response = await api.post(API_URL, product);
        return response.data;
    } catch (error) {
        console.error("Error creando producto:", error);
        throw error;
    }
};

// 3. ELIMINAR PRODUCTO (Nuevo)
export const deleteProduct = async (id) => {
    try {
        await api.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error eliminando producto:", error);
        throw error;
    }
};