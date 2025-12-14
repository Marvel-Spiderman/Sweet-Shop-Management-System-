import axios from 'axios';
import { useStore } from '../store/useStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
    const token = useStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Dynamic import to avoid circular dependencies if possible, or just standard import usage limitation
        // We can't use hooks here. We'll dispatch a custom event or let components handle it, 
        // BUT we can use the Sonner toast method directly if imported? 
        // Yes, 'toast' from sonner can be used outside components
        import('sonner').then(({ toast }) => {
            const message = error.response?.data?.detail || "Something went wrong. Please try again.";
            toast.error(message);
        });
        return Promise.reject(error);
    }
);

export default api;
