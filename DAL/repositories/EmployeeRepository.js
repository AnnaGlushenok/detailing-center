import {Repository} from "./Repository.js";
import {models} from "../db.js";

export class EmployeeRepository extends Repository {
    constructor() {
        super(models.Employee);
    }
}