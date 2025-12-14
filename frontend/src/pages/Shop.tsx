import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import api from '../api/axios';
import type { Product } from '../types';
import { useStore } from '../store/useStore';

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState<string[]>(['All']);
    const { addToCart } = useStore();

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
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">Our Sweets Collection</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search sweets..."
                        className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === cat
                                ? 'bg-primary text-white'
                                : 'bg-white border text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
                        <div className="h-56 overflow-hidden">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover transition transform hover:scale-110 duration-500"
                            />
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                                    ₹{product.price}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">{product.description}</p>

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => addToCart(product)}
                                    className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-blue-900 transition flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={18} /> Add to Cart
                                </button>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No sweets found matching your criteria.
                </div>
            )}
        </div>
    );
}
