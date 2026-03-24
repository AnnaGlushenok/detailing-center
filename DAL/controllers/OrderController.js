import {OrderRepository} from "../repositories/OrderRepository.js";
import {EmployeeRepository} from "../repositories/EmployeeRepository.js";
import {ClientRepository} from "../repositories/ClientRepository.js";
import {ServiceRepository} from "../repositories/ServiceRepository.js";

export class OrderController {
    async getAll(req, res) {
        try {
            const orders = await new OrderRepository().getAll();
            const clients = await new ClientRepository().getAll();
            const employees = await new EmployeeRepository().getAll();
            const services = await new ServiceRepository().getAll();

            let items = []
            for (const order of orders) {
                let client = clients.find(c => c.id === order.client_id)
                items.push({
                    id: order.id,
                    client: {
                        name: client.full_name,
                        phone: client.phone
                    },
                    service: services.find(s => s.id === order.service_id).name,
                    employee: employees.find(e => e.id === order.employee_id).full_name,
                    date: order.date,
                    price: order.price,
                    status: order.status
                });
            }
            res.json(items);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async getById(req, res) {
        try {
            const item = await this.repository.getById(req.params.id);
            if (!item) return res.status(404).json({error: 'Not found'});
            res.json(item);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async create(req, res) {
        try {
            const newItem = await this.repository.create(req.body);
            res.status(201).json(newItem);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async update(req, res) {
        try {
            const updatedItem = await this.repository.update(req.params.id, req.body);
            if (!updatedItem) return res.status(404).json({error: 'Not found'});
            res.json(updatedItem);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async delete(req, res) {
        try {
            const result = await this.repository.delete(req.params.id);
            if (!result) return res.status(404).json({error: 'Not found'});
            res.json({message: 'Deleted'});
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }
}