import {get} from './api.js';

export const employeeService = {
    getAll: () => get('/employees')
};