import {Sequelize} from 'sequelize';
import {initModels} from '../DAL/models.js';

export async function setupTestDB() {
    // const sequelize = new Sequelize('sqlite:memory:', {logging: false});
    const sequelize = new Sequelize({
        dialect: 'sqlite', storage: ':memory:', logging: false
    });
    const models = initModels(sequelize);
    await sequelize.sync();
    return {sequelize, models};
}