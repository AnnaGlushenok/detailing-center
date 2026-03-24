import {DataTypes} from 'sequelize';

export function initModels(sequelize) {
    const Employee = sequelize.define('employees', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        full_name: DataTypes.STRING,
        login: DataTypes.STRING,
        password: DataTypes.STRING
    }, {timestamps: false});

    const Client = sequelize.define('clients', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        full_name: DataTypes.STRING,
        phone: DataTypes.STRING
    }, {timestamps: false});

    const Service = sequelize.define('services', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 2),
        description: DataTypes.TEXT
    }, {timestamps: false});

    const Order = sequelize.define('orders', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        client_id: DataTypes.INTEGER,
        service_id: DataTypes.INTEGER,
        employee_id: DataTypes.INTEGER,
        date: DataTypes.DATE,
        price: DataTypes.DECIMAL(10, 2),
        status: DataTypes.STRING
    }, {timestamps: false});

    Order.belongsTo(Client, {foreignKey: 'client_id'});
    Client.hasMany(Order, {foreignKey: 'client_id'});

    Order.belongsTo(Service, {foreignKey: 'service_id'});
    Service.hasMany(Order, {foreignKey: 'service_id'});

    Order.belongsTo(Employee, {foreignKey: 'employee_id'});
    Employee.hasMany(Order, {foreignKey: 'employee_id'});

    return {Employee, Client, Service, Order};
}