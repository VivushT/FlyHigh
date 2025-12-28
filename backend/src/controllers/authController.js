import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../middleware/errorHandler.js';

// In-memory user storage (replace with database in production)
const users = [
    {
        id: '1',
        email: 'admin@flyhigh.com',
        password: await bcrypt.hash('admin123', 10),
        name: 'Admin User',
        role: 'admin',
        phone: '+1234567890'
    },
    {
        id: '2',
        email: 'user@flyhigh.com',
        password: await bcrypt.hash('user123', 10),
        name: 'John Doe',
        role: 'user',
        phone: '+1987654321'
    }
];

export const register = async (req, res, next) => {
    try {
        const { email, password, name, phone } = req.body;

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            throw new ApiError(400, 'User already exists with this email');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = {
            id: uuidv4(),
            email,
            password: hashedPassword,
            name,
            phone,
            role: 'user',
            travelers: [],
            createdAt: new Date().toISOString()
        };

        users.push(newUser);

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role
            }
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
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

export const getMe = (req, res, next) => {
    try {
        const user = users.find(u => u.id === req.user.id);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                role: user.role,
                travelers: user.travelers || []
            }
        });
    } catch (error) {
        next(error);
    }
};

// Export users array for use in other controllers
export { users };
