import { Controller } from './Controller.js';

export class EmployeeController extends Controller {
    constructor(employeeRepository) {
        super(employeeRepository);
    }
}