import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useStore } from '../store/useStore';
import type { User } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const loginImages = [
    "https://imgs.search.brave.com/mgH_jxdcdUUCuX0gI6RCEFd2eZNADtme4OtFDJQUUh0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTQy/Mjg2Mjc4L3Bob3Rv/L3dvbWFuLXBob3Rv/Z3JhcGhpbmctaGVy/LWNha2UuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXlPWXVZ/WkZyVS1tUGM3U2pX/Mjd1NWw5czgwdnZl/THlwb3REU0VISTRP/WWM9",
    "https://imgs.search.brave.com/aV18zJbqIHQDy9Gp727t9X3vMG-cR5n4R8qWDQdQ3Y0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDk0/NTk5NzM3L3Bob3Rv/L2NhbmR5LXNob3Au/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWU3Wlh5aXgwT25u/eGwwTU5FMjFSaUZB/b1JnaV9TY1I5OURB/UjNCLTZ3V3c9",
    "https://images.unsplash.com/photo-1589119908995-c6837fa14848?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
];



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const { setAuth } = useStore();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % loginImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // ... handleSubmit ...
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/login', { email, password });
            const { access_token, role, user_name } = response.data;
            const user: User = {
                email,
                role,
                full_name: user_name,
                id: 0,
                is_active: true
            };
            setAuth(user, access_token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImageIndex}
                        src={loginImages[currentImageIndex]}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full object-cover"
                        alt="Sweet Background"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            {/* Login Container */}
            <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden bg-white/90 backdrop-blur-md mx-4">

                {/* Visual Side (Quotes) */}
                <div className="hidden md:flex w-1/2 relative overflow-hidden bg-primary">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImageIndex}
                            src={currentImageIndex % 2 === 0 ? "/quotes/quote1.png" : "/quotes/quote2.png"}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="Sweet Quote"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
                        <h2 className="text-3xl font-bold text-white font-serif mb-2">Daily Dose of Sweetness</h2>
                        <p className="text-white/90">Incubyte Sweets</p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="w-full md:w-1/2 p-10 bg-white">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                        Sign in
                    </h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg"
                            >
                                {error}
                            </motion.div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all transform active:scale-95 hover:shadow-lg"
                        >
                            Sign in
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
