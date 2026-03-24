import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { setupTestDB } from '../db.js';
import { Repository } from '../../app/DAL/repositories/Repository.js';

describe('EmployeeController', () => {
    let repo;
    let sequelize;
    let models;

    beforeAll(async () => {
        const db = await setupTestDB();
        sequelize = db.sequelize;
        models = db.models;

        // создаем роль для FK
        await models.Role.create({ name: 'Admin' });

        repo = new Repository(models.Employee);
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('getAll returns empty array initially', async () => {
        const employees = await repo.getAll();
        expect(Array.isArray(employees)).toBe(true);
        expect(employees.length).toBe(0);
    });

    test('getAll returns created employees', async () => {
        await repo.create({ full_name: 'John Doe', login: 'jdoe', password: '123', role_id: 1 });
        await repo.create({ full_name: 'Jane Smith', login: 'jsmith', password: '456', role_id: 1 });

        const employees = await repo.getAll();
        expect(Array.isArray(employees)).toBe(true);
        expect(employees.length).toBe(2);
        expect(employees[0]).toHaveProperty('full_name');
        expect(employees[1].login).toBe('jsmith');
    });
});