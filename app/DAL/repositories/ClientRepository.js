import {Repository} from './Repository.js';
import {models} from "../db.js";

export class ClientRepository extends Repository {
    constructor() {
        super(models.Client);
    }
}