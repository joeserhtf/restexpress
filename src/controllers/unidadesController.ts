import { Request, Response } from 'express';


import pool from '../database';

class unidadesController {

    public async get(req: Request, res: Response): Promise<void> {
        const col = await pool.query(`SELECT id, unidade, DATE_FORMAT(cxatu, '%Y-%m-%d') as cxatu, lstatus 
                                      FROM unidade;`);
        res.json(col);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE unidade set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Situação Atualizada" });
    }

}

const UnidadesController = new unidadesController;
export default UnidadesController;