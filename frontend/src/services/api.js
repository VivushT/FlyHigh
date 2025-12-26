import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me')
};

// Flight APIs
export const flightAPI = {
    search: (params) => api.get('/flights/search', { params }),
    getById: (id) => api.get(`/flights/${id}`),
    getAirports: () => api.get('/flights/airports'),
    searchAirports: (query) => api.get('/flights/airports/search', { params: { query } }),
    getCheapestDates: (from, to) => api.get('/flights/cheapest-dates', { params: { from, to } })
};

// Booking APIs
export const bookingAPI = {
    create: (data) => api.post('/bookings', data),
    getUserBookings: () => api.get('/bookings'),
    getById: (id) => api.get(`/bookings/${id}`),
    cancel: (id) => api.patch(`/bookings/${id}/cancel`),
    reschedule: (id, data) => api.patch(`/bookings/${id}/reschedule`, data)
};

// User APIs
export const userAPI = {
    updateProfile: (data) => api.patch('/users/profile', data),
    getTravelers: () => api.get('/users/travelers'),
    addTraveler: (data) => api.post('/users/travelers', data),
    deleteTraveler: (id) => api.delete(`/users/travelers/${id}`)
};

// Service APIs
export const serviceAPI = {
    bookLounge: (data) => api.post('/services/lounge', data),
    orderBaggage: (data) => api.post('/services/baggage', data),
    preorderMeal: (data) => api.post('/services/meals', data),
    buyInsurance: (data) => api.post('/services/insurance', data),
    bookTransport: (data) => api.post('/services/transport', data),
    getUserServices: () => api.get('/services/my-services')
};

// Admin APIs
export const adminAPI = {
    getStats: () => api.get('/admin/dashboard/stats'),
    getAllBookings: () => api.get('/admin/bookings'),
    getAllUsers: () => api.get('/admin/users'),
    updateUser: (id, data) => api.patch(`/admin/users/${id}`, data),
    getAirlines: () => api.get('/admin/airlines'),
    updateAirline: (id, data) => api.patch(`/admin/airlines/${id}`, data)
};

export default api;
