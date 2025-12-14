import { useEffect, useState } from 'react';
import { DollarSign, ShoppingBag, Package, AlertTriangle } from 'lucide-react';
import api from '../api/axios';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

interface AdminStats {
    total_revenue: number;
    total_orders: number;
    total_products: number;
    low_stock_products: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const { user } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchStats();
    }, [user, navigate]);

    const fetchStats = async () => {
        try {
            const response = await api.get('/admin/stats');
            setStats(response.data);
        } catch (error) {
            console.error("Failed to fetch admin stats", error);
        }
    };

    if (!stats) return <div className="p-8 text-center">Loading Dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">Total Revenue</p>
                            <p className="text-2xl font-bold">₹{stats.total_revenue}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full text-green-600">
                            <DollarSign size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">Total Orders</p>
                            <p className="text-2xl font-bold">{stats.total_orders}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <ShoppingBag size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">Total Products</p>
                            <p className="text-2xl font-bold">{stats.total_products}</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                            <Package size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">Low Stock Alerts</p>
                            <p className="text-2xl font-bold">{stats.low_stock_products}</p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-full text-red-600">
                            <AlertTriangle size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white p-8 rounded-xl shadow-md text-center">
                <p className="text-gray-500">More detailed analytics and management features coming soon.</p>
            </div>
        </div>
    );
}
