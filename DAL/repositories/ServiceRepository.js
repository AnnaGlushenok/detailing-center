import {Repository} from "./Repository.js";
import {models} from "../db.js";

export class ServiceRepository extends Repository {
    constructor() {
        super(models.Service);
    }
}