import {describe, test, expect, beforeAll, afterAll} from 'vitest';
import {setupTestDB} from '../db.js';
import {Repository} from '../../app/DAL/repositories/Repository.js';

describe('ClientController', () => {
    let repo;
    let sequelize;
    let models;

    beforeAll(async () => {
        const db = await setupTestDB();
        sequelize = db.sequelize;
        models = db.models;

        repo = new Repository(models.Client);
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('create client', async () => {
        const client = await repo.create({
            full_name: 'Тест',
            phone: '123'
        });

        expect(client.full_name).toBe('Тест');
    });

    test('getAll', async () => {
        const clients = await repo.getAll();
        expect(Array.isArray(clients)).toBe(true);
    });

    test('update', async () => {
        const client = await repo.create({
            full_name: 'Old',
            phone: '111'
        });

        const updated = await repo.update(client.id, {
            full_name: 'New'
        });

        expect(updated.full_name).toBe('New');
    });

    test('delete', async () => {
        const client = await repo.create({
            full_name: 'Delete',
            phone: '000'
        });

        await repo.delete(client.id);

        const found = await repo.getById(client.id);
        expect(found).toBeNull();
    });
});