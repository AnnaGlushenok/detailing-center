import {get} from './api.js';

export const orderService = {
    getAll: () => get('/orders')
};