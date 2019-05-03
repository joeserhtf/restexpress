import express, { Router } from 'express';

//import controller querys
import { timesheetController } from '../controllers/timesheetController';

class TimesheetRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:id', timesheetController.list);
        this.router.get('/my/:id/:data', timesheetController.listmy);
        this.router.put('/:id', timesheetController.update);
    }

}

const timesheetRoutes = new TimesheetRoutes();
export default timesheetRoutes.router;