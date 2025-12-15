import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, User, LogOut, Candy, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const { cart, user, logout: storeLogout } = useStore();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        storeLogout();
        navigate('/');
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/20 py-2'
                : location.pathname === '/' ? 'bg-black/10 backdrop-blur-sm py-4 border-b border-white/5' : 'bg-primary/80 backdrop-blur-md shadow-lg py-4 border-b border-white/10'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        {/* Removed outer layer bubble as requested */}
                        <div className="p-1 transition-transform group-hover:scale-110">
                            <motion.div
                                animate={{
                                    color: [
                                        "#ef4444", // Red
                                        "#f97316", // Orange
                                        "#eab308", // Yellow
                                        "#22c55e", // Green
                                        "#3b82f6", // Blue
                                        "#a855f7", // Purple
                                        "#ec4899", // Pink
                                        "#ef4444"  // Loop back to Red
                                    ],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                <Candy className="h-8 w-8 drop-shadow-sm" />
                            </motion.div>
                        </div>
                        <span className={`text-2xl font-extrabold tracking-tight drop-shadow-sm ${scrolled || location.pathname !== '/' ? 'text-primary' : 'text-white'
                            }`}>
                            Sweet<span className="text-accent">Shop</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-lg font-medium transition-colors hover:text-accent hover:scale-105 transform duration-200 ${location.pathname === link.path
                                    ? 'text-accent'
                                    : scrolled || location.pathname !== '/' ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* User Menu */}
                        {user ? (
                            <div className="relative group">
                                <button className={`flex items-center gap-2 font-medium py-2 transition hover:scale-105 ${scrolled || location.pathname !== '/' ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-accent'
                                    }`}>
                                    <User size={20} />
                                    <span>{user.full_name}</span>
                                </button>
                                <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block z-50">
                                    <div className="bg-white/95 backdrop-blur-md rounded-md shadow-lg py-1 border border-gray-100">
                                        {user.role === 'admin' && (
                                            <Link to="/admin" className="block px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 border-b border-gray-100">Admin</Link>
                                        )}
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-bold"
                                        >
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className={`font-medium hover:text-accent transition hover:scale-105 ${scrolled || location.pathname !== '/' ? 'text-gray-700' : 'text-white'
                                }`}>Login</Link>
                        )}

                        {/* Cart Icon */}
                        <Link to="/cart" className="relative group">
                            <motion.div
                                whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
                                transition={{ duration: 0.5 }}
                                className={`p-2 rounded-full transition-colors ${scrolled || location.pathname !== '/' ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/20 text-white'
                                    }`}
                            >
                                <ShoppingBag className="h-6 w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </motion.div>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={scrolled || location.pathname !== '/' ? 'text-gray-700' : 'text-white'}>
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Home</Link>
                        <Link to="/shop" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Shop</Link>
                        <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Cart ({cartCount})</Link>
                        {user ? (
                            <>
                                {user.role === 'admin' && <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Admin</Link>}
                                <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Logout</button>
                            </>
                        ) : (
                            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
