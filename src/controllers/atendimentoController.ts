import { Request, Response } from 'express';

import pool from '../database';

class AtendimentoController {

    public async get(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT chamadoatual, setoratual, nome, unidade FROM colaboradores');
        res.json(games);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE colaboradores set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Cadastro atualizado" });
    }

}

export const atendimentoController = new AtendimentoController;