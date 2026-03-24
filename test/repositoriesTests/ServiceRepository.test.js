import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { setupTestDB } from '../db.js';
import { Repository } from '../../DAL/repositories/Repository.js';

describe('ServiceController', () => {
    let repo;
    let sequelize;
    let models;

    beforeAll(async () => {
        const db = await setupTestDB();
        sequelize = db.sequelize;
        models = db.models;

        repo = new Repository(models.Service);
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('getAll returns empty array initially', async () => {
        const services = await repo.getAll();
        expect(Array.isArray(services)).toBe(true);
        expect(services.length).toBe(0);
    });

    test('getAll returns created services', async () => {
        await repo.create({ name: 'Waxing', price: 50, description: 'Car waxing' });
        await repo.create({ name: 'Polishing', price: 70, description: 'Car polishing' });

        const services = await repo.getAll();
        expect(Array.isArray(services)).toBe(true);
        expect(services.length).toBe(2);
        expect(services[0]).toHaveProperty('name');
        expect(services[1].description).toBe('Car polishing');
    });
});