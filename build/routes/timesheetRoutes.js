"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import controller querys
const timesheetController_1 = require("../controllers/timesheetController");
class TimesheetRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', timesheetController_1.timesheetController.list);
        this.router.get('/my/:id/:data', timesheetController_1.timesheetController.listmy);
        this.router.put('/:id', timesheetController_1.timesheetController.update);
    }
}
const timesheetRoutes = new TimesheetRoutes();
exports.default = timesheetRoutes.router;
