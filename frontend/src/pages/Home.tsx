import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const heroImages = [
    "/hero/hero1.png",
    "/hero/hero2.png",
    "/hero/hero3.png",
    "/hero/hero4.png",
    "https://images.unsplash.com/photo-1589119908995-c6837fa14848?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Gulab Jamun
    "https://images.unsplash.com/photo-1552596827-0c75c8846c4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Kaju Katli / Barfi
    "https://images.unsplash.com/photo-1596541223844-3c870e28c4cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Jalebi
    "https://images.unsplash.com/photo-1616031268499-281b67277743?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"  // Rasgulla
];

export default function Home() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center bg-primary overflow-hidden">
                {/* Background Slideshow */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute inset-0 bg-black/40 z-10"
                    />
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImageIndex}
                            src={heroImages[currentImageIndex]}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 0.4, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="w-full h-full object-cover absolute inset-0"
                            alt="Sweet Background"
                        />
                    </AnimatePresence>
                </div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="relative z-10 text-center px-4"
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight"
                    >
                        Authentic <span className="text-secondary">Indian Sweets</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-xl md:text-3xl text-gray-200 mb-10 max-w-3xl mx-auto font-light"
                    >
                        Experience the rich tradition of handcrafted mithai. Pure ingredients, timeless recipes, and the taste of celebration.
                    </motion.p>
                    <motion.div variants={fadeInUp}>
                        <Link to="/shop" className="inline-flex items-center px-10 py-5 bg-accent text-white font-bold text-lg rounded-full hover:bg-yellow-500 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Order Now <ArrowRight className="ml-2" />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Moving Sweets Marquee */}
            <div className="py-12 bg-cream overflow-hidden">
                <div className="flex w-max relative">
                    <motion.div
                        className="flex gap-8 px-4"
                        animate={{ x: "-50%" }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 20
                        }}
                    >
                        {/* Duplicated list for seamless infinite scroll */}
                        {[...images, ...images].map((img, index) => (
                            <div key={index} className="w-64 h-48 flex-shrink-0 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                                <img src={img} alt="Delicious Sweet" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
                >
                    {[
                        { title: "Handcrafted Daily", desc: "Made fresh every morning using traditional methods." },
                        { title: "Premium Ingredients", desc: "We use only the finest ghee, saffron, and nuts." },
                        { title: "Festive Specials", desc: "Curated boxes for Diwali, Holi, and your special occasions." }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-primary">{feature.title}</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
}

const images = [
    "https://images.unsplash.com/photo-1596541223844-3c870e28c4cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Jalebi
    "https://images.unsplash.com/photo-1589119908995-c6837fa14848?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Gulab Jamun
    "https://images.unsplash.com/photo-1598516093188-75c6020bf6a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Ladoo
    "https://images.unsplash.com/photo-1616031268499-281b67277743?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Rasgulla
    "https://images.unsplash.com/photo-1621245366479-787eb9825b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Mixed Box
    "https://images.unsplash.com/photo-1552596827-0c75c8846c4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Barfi/Box
    "https://images.unsplash.com/photo-1589948197771-46487e91542f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Soan Papdi/Halwa
    "https://plus.unsplash.com/premium_photo-1675282710352-79354784080e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Mix Sweets
];
