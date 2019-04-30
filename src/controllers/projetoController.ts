import { Request, Response } from 'express';


import pool from '../database';

class ProjetoController {

    public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM projeto');
        res.json(games);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO projeto set ?', [req.body]);
        res.json({ message: 'Savlo' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE projeto set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM projeto WHERE id = ?', [id]);
        res.json({ message: "Deletado" });
    }
}

export const projetoController = new ProjetoController;