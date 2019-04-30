import { Request, Response } from 'express';


import pool from '../database';

class CustofixoController {

    public async get(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM contratos');
        res.json(games);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO contratos set ?', [req.body]);
        res.json({ message: 'Contrato Cadastrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE contratos set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Contrato Atualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM contratos WHERE id = ?', [id]);
        res.json({ message: "Contrato Finalizado" });
    }
}

const custofixoController = new CustofixoController;
export default custofixoController;