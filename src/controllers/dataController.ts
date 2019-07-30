import { Request, Response } from 'express';


import pool from '../database';

class DataController {

    public async listimp(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM impressoras;');
        res.json(games);
    }

    public async getramal(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM ramal');
        res.json(games);
    }

    public async createimp(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO impressoras set ?', [req.body]);
        res.json({ message: 'Salvo' });
    }

    public async updateimp(req: Request, res: Response): Promise<void> {
        const imp = req.body;
        await pool.query(`UPDATE impressoras set ip = '${imp.ip}', unidade = '${imp.unidade}', setor = '${imp.setor}', modelo = '${imp.modelo}' WHERE id = ${imp.id}`);
        res.json({ message: "Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM impressoras WHERE id = ?', [id]);
        res.json({ message: "Deletado" });
    }
}

export const dataController = new DataController;