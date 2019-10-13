import { Request, Response } from 'express';


import pool from '../database';

class unidadesController {

    public async get(req: Request, res: Response): Promise<void> {
        const col = await pool.query(`SELECT id, unidade, DATE_FORMAT(cxatu, '%Y-%m-%dT%H:%i') as cxatu, lstatus 
                                      FROM unidade;`);
        res.json(col);
    }

    public async getS(req: Request, res: Response): Promise<void> {
        const col = await pool.query(`SELECT id, lstatus 
                                      FROM unidade;`);
        res.json(col);
    }

    public async getcx() {
        const execFile = require('child_process').execFile;
        return(execFile('Z:\\joeser.bat'))
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE unidade set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Situação Atualizada" });
    }

    public async updateS(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE unidade set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Situação Atualizada" });
    }

    public async updateAll(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query(`UPDATE unidade set cxatu = "${req.body.cxatu}"`);
        res.json({ message: "Situação Atualizada" });
    }

}

const UnidadesController = new unidadesController;
export default UnidadesController;