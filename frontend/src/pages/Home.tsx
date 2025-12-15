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
    "/hero/hero5.png", // Uploaded Kaju Katli
    "https://images.unsplash.com/photo-1589119908995-c6837fa14848?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Gulab Jamun (Classic)
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Samosa/Jalebi Mix
    "https://images.unsplash.com/photo-1552596827-0c75c8846c4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Barfi Box
    "https://images.unsplash.com/photo-1528198622811-0842b4e50787?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Jalebi (Close up)
    "https://images.unsplash.com/photo-1616031268499-281b67277743?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Rasgulla
    "https://images.unsplash.com/photo-1517244683847-7456b63c5969?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"  // Motichoor Ladoo
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
                        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"
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
                    variants={staggerContainer}
                    className="relative z-10 text-center px-4 max-w-4xl mx-auto"
                >
                    <motion.div variants={fadeInUp}>
                        <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                            Authentic <br className="md:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-sm">
                                Indian Sweets
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.03, delayChildren: 1 } }
                        }}
                        className="text-xl md:text-3xl text-white/90 mb-10 font-bold drop-shadow-md leading-relaxed min-h-[4rem]"
                    >
                        {Array.from("Experience the rich tradition of handcrafted mithai.").map((char, index) => (
                            <motion.span key={index} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                                {char}
                            </motion.span>
                        ))}
                        <br className="hidden md:block" />
                        {Array.from("Pure ingredients, timeless recipes, and the taste of celebration.").map((char, index) => (
                            <motion.span key={index} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                                {char}
                            </motion.span>
                        ))}
                    </motion.div>

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
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">{feature.desc}</p>
                            <Link
                                to="/shop"
                                className="inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Browse Sweets
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
}

const images = [
    "/sweet-1.png", // Uploaded Gulab Jamun
    "/sweet-2.png", // Uploaded Kaju Katli
    "/sweet-3.png", // Uploaded Jalebi
    "/sweet-4.png", // Uploaded Gulab Jamun 2
    "/sweet-5.png", // Uploaded Chocolate Barfi
    "/sweet-6.jpg", // Uploaded Mix Sweets
    "/sweet-7.png", // Uploaded Halwa
    "/sweet-8.png", // Uploaded Ladoo
    "/sweet-9.png", // Uploaded Motichoor
];
