import {Sequelize} from 'sequelize';
import {initModels} from './models.js';

export const sequelize = new Sequelize({
    dialect: 'sqlite', storage: './detailing.db', logging: false
});

export const models = initModels(sequelize);
