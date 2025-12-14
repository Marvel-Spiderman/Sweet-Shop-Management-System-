import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1599599810769-bcde5a1645f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>
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
