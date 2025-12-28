import { bookings } from './bookingController.js';
import { users } from './authController.js';
import airlinesData from '../data/airlines.js';
import airportsData from '../data/airports.js';
import { ApiError } from '../middleware/errorHandler.js';

export const getDashboardStats = (req, res, next) => {
    try {
        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((sum, b) => sum + b.pricing.totalPrice, 0);
        const totalUsers = users.length;

        const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
        const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

        res.json({
            success: true,
            stats: {
                totalBookings,
                confirmedBookings,
                cancelledBookings,
                totalRevenue,
                totalUsers,
                averageBookingValue: totalBookings > 0 ? totalRevenue / totalBookings : 0
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getAllBookings = (req, res, next) => {
    try {
        res.json({
            success: true,
            count: bookings.length,
            bookings
        });
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = (req, res, next) => {
    try {
        const safeUsers = users.map(u => ({
            id: u.id,
            email: u.email,
            name: u.name,
            role: u.role,
            phone: u.phone,
            createdAt: u.createdAt
        }));

        res.json({
            success: true,
            count: safeUsers.length,
            users: safeUsers
        });
    } catch (error) {
        next(error);
    }
};

export const getAirlines = (req, res, next) => {
    try {
        res.json({
            success: true,
            count: airlinesData.length,
            airlines: airlinesData
        });
    } catch (error) {
        next(error);
    }
};

export const updateAirline = (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const airline = airlinesData.find(a => a.id === id);
        if (!airline) {
            throw new ApiError(404, 'Airline not found');
        }

        Object.assign(airline, updates);

        res.json({
            success: true,
            message: 'Airline updated successfully',
            airline
        });
    } catch (error) {
        next(error);
    }
};

export const getAllAirports = (req, res, next) => {
    try {
        res.json({
            success: true,
            count: airportsData.length,
            airports: airportsData
        });
    } catch (error) {
        next(error);
    }
};

export const updateUser = (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const user = users.find(u => u.id === id);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        if (role) {
            user.role = role;
        }

        res.json({
            success: true,
            message: 'User updated successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};
