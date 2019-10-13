import { Request, Response } from 'express';


import pool from '../database';

class cxController {

    public async get() {
        console.log("sadas");
        const execFile = require('child_process').execFile;
        return(execFile('Z:\\joeser.bat'));
    }
}

const CxController = new cxController;
export default CxController;