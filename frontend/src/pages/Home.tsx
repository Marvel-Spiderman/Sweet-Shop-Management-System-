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
    "https://imgs.search.brave.com/y_HPViWxkvdw1VkTZD4u7Dx-fBQ8Rd41Ijo03rdXRMc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9taXgtbWl0/aGFpLTI2MG53LTMw/ODY3OTEwNy5qcGc", // Barfi Box
    "https://imgs.search.brave.com/b4WSaOoqyPHacYwrcb_nznO_XTQvh2W2WreXUwVjAZg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9pbmRpYW4tc3dl/ZXQtcmFzZ3VsbGEt/Y2xheS1wb3RfMTM2/MzU0LTYyNzYuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw", // Rasgulla
    "https://imgs.search.brave.com/HralMQXHKczGTZRYxLw53O3HJGXYroEjP4BhjD1VC44/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9pbmRp/YW4tc3dlZXQtbW90/aWNob29yLWxhZGRv/by1idW5kaS1sYWRk/dS1taXRhaGVlLWVu/aXBwdS1tb3RpY2h1/ci1zb2Z0LWRlbGlz/aC1tZWx0LW1vdXRo/LWxhZG9vLW1hZGUt/bWFpbmx5LWdyYW0t/MzM5NTc2NzA4Lmpw/Zw"  // Motichoor Ladoo
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
