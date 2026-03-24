import express from 'express';

import {ClientRepository} from './repositories/ClientRepository.js';
import {EmployeeRepository} from './repositories/EmployeeRepository.js';
import {RoleRepository} from './repositories/RoleRepository.js';
import {ServiceRepository} from './repositories/ServiceRepository.js';
import {OrderRepository} from './repositories/OrderRepository.js';

import {ClientController} from './controllers/ClientController.js';
import {EmployeeController} from './controllers/EmployeeController.js';
import {RoleController} from './controllers/RoleController.js';
import {ServiceController} from './controllers/ServiceController.js';
import {OrderController} from './controllers/OrderController.js';

const router = express.Router();

const clientCtrl = new ClientController(new ClientRepository());
const employeeCtrl = new EmployeeController(new EmployeeRepository());
const roleCtrl = new RoleController(new RoleRepository());
const serviceCtrl = new ServiceController(new ServiceRepository());
const orderCtrl = new OrderController(new OrderRepository());

router.get('/clients', clientCtrl.getAll.bind(clientCtrl));
router.get('/clients/:id', clientCtrl.getById.bind(clientCtrl));
router.post('/clients', clientCtrl.create.bind(clientCtrl));
router.put('/clients/:id', clientCtrl.update.bind(clientCtrl));
router.delete('/clients/:id', clientCtrl.delete.bind(clientCtrl));

router.get('/employees', employeeCtrl.getAll.bind(employeeCtrl));
router.get('/employees/:id', employeeCtrl.getById.bind(employeeCtrl));
router.post('/employees', employeeCtrl.create.bind(employeeCtrl));
router.put('/employees/:id', employeeCtrl.update.bind(employeeCtrl));
router.delete('/employees/:id', employeeCtrl.delete.bind(employeeCtrl));

router.get('/roles', roleCtrl.getAll.bind(roleCtrl));
router.get('/roles/:id', roleCtrl.getById.bind(roleCtrl));
router.post('/roles', roleCtrl.create.bind(roleCtrl));
router.put('/roles/:id', roleCtrl.update.bind(roleCtrl));
router.delete('/roles/:id', roleCtrl.delete.bind(roleCtrl));

router.get('/services', serviceCtrl.getAll.bind(serviceCtrl));
router.get('/services/:id', serviceCtrl.getById.bind(serviceCtrl));
router.post('/services', serviceCtrl.create.bind(serviceCtrl));
router.put('/services/:id', serviceCtrl.update.bind(serviceCtrl));
router.delete('/services/:id', serviceCtrl.delete.bind(serviceCtrl));

router.get('/orders', orderCtrl.getAll.bind(orderCtrl));
router.get('/orders/:id', orderCtrl.getById.bind(orderCtrl));
router.post('/orders', orderCtrl.create.bind(orderCtrl));
router.put('/orders/:id', orderCtrl.update.bind(orderCtrl));
router.delete('/orders/:id', orderCtrl.delete.bind(orderCtrl));

export default router;