import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import api from '../api/axios';
import { Product } from '../types';
import { useStore } from '../store/useStore';

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!product) return <div className="p-8 text-center">Product not found.</div>;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        // Maybe show a toast notification here
        navigate('/cart');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-6 hover:text-primary">
                <ArrowLeft size={20} className="mr-2" /> Back
            </button>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div className="h-96 md:h-auto">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                </div>

                <div className="p-8 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                        <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                    </div>

                    <div className="flex items-center mb-6 text-yellow-400">
                        <Star fill="currentColor" size={20} />
                        <Star fill="currentColor" size={20} />
                        <Star fill="currentColor" size={20} />
                        <Star fill="currentColor" size={20} />
                        <Star fill="currentColor" size={20} />
                        <span className="text-gray-400 text-sm ml-2">(24 reviews)</span>
                    </div>

                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-gray-700 font-medium">Quantity:</span>
                        <div className="flex items-center border rounded-md">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                            >-</button>
                            <span className="px-4 py-1">{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                            >+</button>
                        </div>
                        <span className="text-sm text-gray-500">
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="w-full md:w-auto bg-primary text-white py-3 px-8 rounded-lg font-bold text-lg hover:bg-blue-900 transition flex items-center justify-center gap-2 disabled:bg-gray-400"
                    >
                        <ShoppingCart /> {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
}
