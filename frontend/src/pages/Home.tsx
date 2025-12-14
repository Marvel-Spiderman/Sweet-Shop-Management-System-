import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1599599810769-bcde5a1645f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
                        Authentic <span className="text-secondary">Indian Sweets</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
                        Experience the rich tradition of handcrafted mithai. Pure ingredients, timeless recipes, and the taste of celebration.
                    </p>
                    <Link to="/shop" className="inline-flex items-center px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-yellow-500 transition transform hover:scale-105">
                        Order Now <ArrowRight className="ml-2" />
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                        <h3 className="text-xl font-bold mb-3 text-primary">Handcrafted Daily</h3>
                        <p className="text-gray-600">Made fresh every morning using traditional methods.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                        <h3 className="text-xl font-bold mb-3 text-primary">Premium Ingredients</h3>
                        <p className="text-gray-600">We use only the finest ghee, saffron, and nuts.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                        <h3 className="text-xl font-bold mb-3 text-primary">Festive Specials</h3>
                        <p className="text-gray-600">Curated boxes for Diwali, Holi, and your special occasions.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
