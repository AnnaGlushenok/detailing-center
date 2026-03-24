import {Repository} from "./Repository.js";
import {models} from "../db.js";

export class RoleRepository extends Repository {
    constructor() {
        super(models.Role);
    }
}