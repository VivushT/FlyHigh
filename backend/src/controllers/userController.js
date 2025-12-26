import { users } from './authController.js';
import { ApiError } from '../middleware/errorHandler.js';

export const updateProfile = (req, res, next) => {
    try {
        const userId = req.user.id;
        const { name, phone, passport } = req.body;

        const user = users.find(u => u.id === userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (passport) user.passport = passport;

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                passport: user.passport
            }
        });
    } catch (error) {
        next(error);
    }
};

export const addTraveler = (req, res, next) => {
    try {
        const userId = req.user.id;
        const { name, dateOfBirth, passportNumber, nationality } = req.body;

        const user = users.find(u => u.id === userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        if (!user.travelers) user.travelers = [];

        const traveler = {
            id: Date.now().toString(),
            name,
            dateOfBirth,
            passportNumber,
            nationality
        };

        user.travelers.push(traveler);

        res.status(201).json({
            success: true,
            message: 'Traveler added successfully',
            traveler
        });
    } catch (error) {
        next(error);
    }
};

export const getTravelers = (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = users.find(u => u.id === userId);

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        res.json({
            success: true,
            travelers: user.travelers || []
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTraveler = (req, res, next) => {
    try {
        const userId = req.user.id;
        const { travelerId } = req.params;

        const user = users.find(u => u.id === userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        user.travelers = user.travelers.filter(t => t.id !== travelerId);

        res.json({
            success: true,
            message: 'Traveler removed successfully'
        });
    } catch (error) {
        next(error);
    }
};
