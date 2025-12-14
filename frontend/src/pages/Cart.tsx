import { Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

// ... other imports

export default function Cart() {
    // ... hooks ...
    const { cart, removeFromCart, updateQuantity, clearCart, user } = useStore();
    const navigate = useNavigate();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setIsCheckingOut(true);
        try {
            const orderItems = cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            }));
            await api.post('/orders', { items: orderItems });
            clearCart();
            setOrderSuccess(true);
        } catch (error) {
            // Error handled by global interceptor now
            console.error("Checkout logic error", error);
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (orderSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto px-4 py-16 text-center"
            >
                <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-8">Thank you for ordering with Incubyte Sweets. Your delicious treats will be with you shortly.</p>
                <Link to="/" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-900 transition shadow-lg">
                    Continue Shopping
                </Link>
            </motion.div>
        );
    }

    if (cart.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-7xl mx-auto px-4 py-16 text-center"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added any sweets yet.</p>
                <Link to="/shop" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-900 transition shadow-md">
                    Browse Sweets
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence>
                        {cart.map(item => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-center"
                            >
                                <img src={item.image_url} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                                    <p className="text-gray-500">₹{item.price}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="px-2 py-1 hover:bg-gray-100 transition"
                                        >-</button>
                                        <span className="px-3 py-1">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                                            className="px-2 py-1 hover:bg-gray-100 transition"
                                        >+</button>
                                    </div>
                                </div>

                                <div className="text-right min-w-[80px]">
                                    <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 text-sm hover:underline flex items-center justify-end gap-1 mt-1 transition"
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="lg:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-6 rounded-xl shadow-md sticky top-24"
                    >
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="border-t my-4"></div>
                        <div className="flex justify-between mb-6 text-xl font-bold">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-yellow-500 transition flex justify-center disabled:opacity-50 shadow-lg hover:shadow-xl transform active:scale-95"
                        >
                            {isCheckingOut ? 'Processing...' : 'Checkout'}
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
