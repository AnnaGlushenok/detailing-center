import {Repository} from "./Repository.js";
import {models} from "../db.js";

export class OrderRepository extends Repository {
    constructor() {
        super(models.Order);
    }
}