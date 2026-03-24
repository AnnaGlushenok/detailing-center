import { get, post, put, del } from './api.js';

export const serviceService = {
    getAll: () => get('/services'),
    create: (data) => post('/services', data),
    update: (id, data) => put(`/services/${id}`, data),
    delete: (id) => del(`/services/${id}`)
};