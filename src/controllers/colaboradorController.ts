import { Request, Response } from 'express';


import pool from '../database';

class ColaboradorController {

    public async get(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT unidade, setor, cargo, nome, email FROM colaboradores');
        res.json(games);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO colaboradores set ?', [req.body]);
        res.json({ message: 'Colaborador Cadastrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE colaboradores set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Cadastro atualizado" });
    }

}

const colaboradorController = new ColaboradorController;
export default colaboradorController;