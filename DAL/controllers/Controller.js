export class Controller {
    constructor(repository) {
        this.repository = repository;
    }

    async getAll(req, res) {
        try {
            const items = await this.repository.getAll();
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