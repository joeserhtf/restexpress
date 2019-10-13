import { Request, Response } from 'express';


import pool from '../database';

class InventarioController {

    public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM inventario');
        res.json(games);
    }

    public async listM(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM mensagem');
        res.json(games);
    }
    
    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO inventario set ?', [req.body]);
        res.json({ message: 'Salvo' });
    }

    public async createM(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO inventario set ?', [req.body]);
        res.json({ message: 'Salvo' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE inventario set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM inventario WHERE id = ?', [id]);
        res.json({ message: "Deletado" });
    }
}

export const inventarioController = new InventarioController;