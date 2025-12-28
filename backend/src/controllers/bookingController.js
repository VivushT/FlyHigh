import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../middleware/errorHandler.js';
import flightsData from '../data/flights.js';

// In-memory bookings storage
const bookings = [];

export const createBooking = (req, res, next) => {
    try {
        const { flightId, passengers, fareClass, seats, services } = req.body;
        const userId = req.user.id;

        // Validate flight
        const flight = flightsData.find(f => f.id === flightId);
        if (!flight) {
            throw new ApiError(404, 'Flight not found');
        }

        // Check seat availability
        if (flight.availableSeats[fareClass] < passengers.length) {
            throw new ApiError(400, 'Not enough seats available');
        }

        // Calculate total price
        const flightPrice = flight.pricing[fareClass] * passengers.length;
        let servicesPrice = 0;

        if (services) {
            if (services.baggage) servicesPrice += services.baggage * 50;
            if (services.meals) servicesPrice += services.meals * 25;
            if (services.lounge) servicesPrice += services.lounge * 40;
            if (services.insurance) servicesPrice += 30;
        }

        const totalPrice = flightPrice + servicesPrice;

        // Create booking
        const booking = {
            id: uuidv4(),
            userId,
            flightId,
            flight: {
                flightNumber: flight.flightNumber,
                airline: flight.airline,
                from: flight.from,
                fromCity: flight.fromCity,
                to: flight.to,
                toCity: flight.toCity,
                departure: flight.departure,
                arrival: flight.arrival,
                duration: flight.duration
            },
            passengers,
            fareClass,
            seats: seats || passengers.map(() => null),
            services: services || {},
            pricing: {
                flightPrice,
                servicesPrice,
                totalPrice
            },
            status: 'confirmed',
            bookingReference: `FH${Date.now().toString().slice(-8)}`,
            createdAt: new Date().toISOString(),
            paymentStatus: 'completed'
        };

        bookings.push(booking);

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking
        });
    } catch (error) {
        next(error);
    }
};

export const getUserBookings = (req, res, next) => {
    try {
        const userId = req.user.id;
        const userBookings = bookings.filter(b => b.userId === userId);

        res.json({
            success: true,
            count: userBookings.length,
            bookings: userBookings
        });
    } catch (error) {
        next(error);
    }
};

export const getBookingById = (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = bookings.find(b => b.id === id);

        if (!booking) {
            throw new ApiError(404, 'Booking not found');
        }

        // Check if booking belongs to user or user is admin
        if (booking.userId !== req.user.id && req.user.role !== 'admin') {
            throw new ApiError(403, 'Access denied');
        }

        res.json({
            success: true,
            booking
        });
    } catch (error) {
        next(error);
    }
};

export const cancelBooking = (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = bookings.find(b => b.id === id);

        if (!booking) {
            throw new ApiError(404, 'Booking not found');
        }

        if (booking.userId !== req.user.id) {
            throw new ApiError(403, 'Access denied');
        }

        if (booking.status === 'cancelled') {
            throw new ApiError(400, 'Booking already cancelled');
        }

        booking.status = 'cancelled';
        booking.cancelledAt = new Date().toISOString();
        booking.refundStatus = 'processing';

        res.json({
            success: true,
            message: 'Booking cancelled successfully',
            booking
        });
    } catch (error) {
        next(error);
    }
};

export const rescheduleBooking = (req, res, next) => {
    try {
        const { id } = req.params;
        const { newFlightId } = req.body;

        const booking = bookings.find(b => b.id === id);
        if (!booking) {
            throw new ApiError(404, 'Booking not found');
        }

        if (booking.userId !== req.user.id) {
            throw new ApiError(403, 'Access denied');
        }

        const newFlight = flightsData.find(f => f.id === newFlightId);
        if (!newFlight) {
            throw new ApiError(404, 'New flight not found');
        }

        // Update booking with new flight
        booking.flightId = newFlightId;
        booking.flight = {
            flightNumber: newFlight.flightNumber,
            airline: newFlight.airline,
            from: newFlight.from,
            fromCity: newFlight.fromCity,
            to: newFlight.to,
            toCity: newFlight.toCity,
            departure: newFlight.departure,
            arrival: newFlight.arrival,
            duration: newFlight.duration
        };
        booking.rescheduledAt = new Date().toISOString();

        res.json({
            success: true,
            message: 'Booking rescheduled successfully',
            booking
        });
    } catch (error) {
        next(error);
    }
};

// Export bookings for admin access
export { bookings };
