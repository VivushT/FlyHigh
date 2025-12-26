import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../services/api';

const Dashboard = () => {
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            fetchBookings();
        }
    }, [isAuthenticated]);

    const fetchBookings = async () => {
        try {
            const { data } = await bookingAPI.getUserBookings();
            setBookings(data.bookings);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600"></div>
        </div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                    Welcome, {user?.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Manage your bookings and profile
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="text-3xl font-bold text-primary dark:text-sky-400">{bookings.length}</div>
                    <div className="text-gray-600 dark:text-gray-400 mt-1">Total Bookings</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="text-3xl font-bold text-green-600">{bookings.filter(b => b.status === 'confirmed').length}</div>
                    <div className="text-gray-600 dark:text-gray-400 mt-1">Active Trips</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="text-3xl font-bold text-gold-500">
                        ${bookings.reduce((sum, b) => sum + b.pricing.totalPrice, 0).toFixed(0)}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 mt-1">Total Spent</div>
                </div>
            </div>

            {/* Bookingsview_file List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Bookings</h2>
                </div>

                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                        <p>No bookings yet. Start exploring flights!</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {booking.status.toUpperCase()}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {booking.bookingReference}
                                            </span>
                                        </div>
                                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {booking.flight.fromCity} → {booking.flight.toCity}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {booking.flight.airline} • {booking.flight.flightNumber} • {booking.fareClass}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {booking.passengers.length} passenger{booking.passengers.length > 1 ? 's' : ''}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-primary dark:text-sky-400">
                                            ${booking.pricing.totalPrice}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
