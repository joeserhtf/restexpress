import { Request, Response } from 'express';


import pool from '../database';

class TimesheetController {

    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM timesheet WHERE userid = ?', [id]);
        res.json(games);
    }

    public async listmy(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { data } = req.params;
        const games = await pool.query(`SELECT * FROM timesheet WHERE userid = ? AND datat LIKE "${data}%" `, [id] );
        res.json(games);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO timesheet set ?', [req.body]);
        res.json({ message: 'Salvo' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE timesheet set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM timesheet WHERE id = ?', [id]);
        res.json({ message: "Deletado" });
    }
}

export const timesheetController = new TimesheetController;