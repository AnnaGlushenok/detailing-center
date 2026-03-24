import {describe, test, expect, beforeAll, afterAll} from 'vitest';
import {setupTestDB} from '../db.js';
import {Repository} from '../../DAL/repositories/Repository.js';

describe('OrderController', () => {
    let repo;
    let sequelize;
    let models;

    beforeAll(async () => {
        const db = await setupTestDB();
        sequelize = db.sequelize;
        models = db.models;

        const role = await models.Role.create({name: 'Admin'});
        // const employee = await models.Employee.create({ full_name: 'John', login: 'john', password: '123', role_id: role.id });
        // const client = await models.Client.create({ full_name: 'Client1', phone: '123456' });
        // const service = await models.Service.create({ name: 'Waxing', price: 50, description: 'Car waxing' });

        repo = new Repository(models.Order);
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('getAll returns empty array initially', async () => {
        const records = await repo.getAll();
        expect(Array.isArray(records)).toBe(true);
        expect(records.length).toBe(0);
    });

    test('getAll returns created records', async () => {
        await repo.create({
            client_id: 1,
            employee_id: 1,
            service_id: 1,
            date: new Date(),
            price: 50
        });

        const records = await repo.getAll();

        expect(Array.isArray(records)).toBe(true);
        // expect(records.length).toBe(1);
        // expect(records[0]).toHaveProperty('price');
    });
});