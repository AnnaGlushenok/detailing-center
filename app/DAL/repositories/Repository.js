export class Repository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async getAll() {
        return await this.model.findAll({raw: true});
    }

    async getById(id) {
        return await this.model.findByPk(id);
    }

    async update(id, data) {
        const item = await this.model.findByPk(id);
        if (!item) return null;
        return await item.update(data);
    }

    async delete(id) {
        const item = await this.model.findByPk(id);
        if (!item) return null;
        await item.destroy();
        return true;
    }
}