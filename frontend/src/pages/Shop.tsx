import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import api from '../api/axios';
import type { Product } from '../types';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState<string[]>(['All']);
    const { addToCart } = useStore();

    // Typewriter effect state
    const [placeholderText, setPlaceholderText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const searchPhrases = ["Search for Rasgulla...", "Search for Kaju Katli...", "Search for Ladoo...", "Search for Sweetness..."];

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % searchPhrases.length;
            const fullText = searchPhrases[i];

            setPlaceholderText(isDeleting
                ? fullText.substring(0, placeholderText.length - 1)
                : fullText.substring(0, placeholderText.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && placeholderText === fullText) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && placeholderText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [placeholderText, isDeleting, loopNum, typingSpeed]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);

            // Extract unique categories
            const cats = ['All', ...new Set(response.data.map((p: Product) => p.category))];
            setCategories(cats as string[]);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[url('/sweet-pattern.png')] bg-repeat bg-opacity-10">
            <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
                <h1 className="text-3xl font-bold mb-8 text-primary">Our Sweets Collection</h1>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
                    <div className="relative group">
                        <Search className="absolute left-4 top-[40%] transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors z-10" size={20} />
                        <input
                            type="text"
                            placeholder={placeholderText}
                            className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full w-full md:w-80 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide">
                        {categories.map(cat => (
                            <motion.button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2.5 rounded-full whitespace-nowrap text-sm font-bold shadow-sm transition-all duration-300 border ${selectedCategory === cat
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border-transparent shadow-blue-200 shadow-lg ring-2 ring-blue-300 ring-offset-2'
                                    : 'bg-white/80 backdrop-blur-sm text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-lg hover:bg-white/50 hover:backdrop-blur-xl'
                                    }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProducts.map(product => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={product.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group"
                        >
                            <div className="h-64 overflow-hidden relative p-4 bg-pink-50">
                                {/* Product Image (Inside Frame) */}
                                <div className="w-full h-full flex items-end justify-center overflow-hidden rounded-lg">
                                    <img
                                        src={product.name.toLowerCase().includes('kaju') ? "/kaju-new.png?v=1" : product.image_url }
                                        alt={product.name}
                                        className="w-[80%] h-[70%] object-cover mb-2 rounded-md shadow-sm z-0 relative"
                                    />
                                </div>

                                {/* Frame Image (Overlay) */}
                                <img
                                    src="/shop-frame.png"
                                    alt="Shop Frame"
                                    className="absolute inset-0 z-10 w-full h-full object-fill pointer-events-none"
                                />

                                {!product.is_available && (
                                    <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center text-white font-bold text-xl uppercase tracking-widest backdrop-blur-sm">
                                        Sold Out
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-3">
                                    <h2 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors">{product.name}</h2>
                                    <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
                                        ₹{product.price}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-6 flex-1 line-clamp-2 leading-relaxed">{product.description}</p>

                                <div className="mt-auto flex gap-3">
                                    <button
                                        onClick={() => addToCart(product)}
                                        disabled={!product.is_available}
                                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 hover:shadow-lg transition flex items-center justify-center gap-2 transform active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
                                    >
                                        <ShoppingCart size={20} /> Add to Cart
                                    </button>
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-primary hover:text-primary transition font-medium"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No sweets found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
}
