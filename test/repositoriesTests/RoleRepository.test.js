import {describe, test, expect, beforeAll, afterAll} from 'vitest';
import {setupTestDB} from '../db.js';
import {Repository} from '../../app/DAL/repositories/Repository.js';

describe('RoleController', () => {
    let repo;
    let sequelize;
    let models;

    beforeAll(async () => {
        const db = await setupTestDB();
        sequelize = db.sequelize;
        models = db.models;

        repo = new Repository(models.Role);
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('getAll returns empty array initially', async () => {
        const roles = await repo.getAll();
        expect(Array.isArray(roles)).toBe(true);
        expect(roles.length).toBe(0);
    });

    test('getAll returns created roles', async () => {
        await repo.create({name: 'Admin'});
        await repo.create({name: 'Worker'});

        const roles = await repo.getAll();
        expect(Array.isArray(roles)).toBe(true);
        expect(roles.length).toBe(2);
        expect(roles[0]).toHaveProperty('name');
        expect(roles[1].name).toBe('Worker');
    });
});