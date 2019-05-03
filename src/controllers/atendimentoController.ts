import { Request, Response } from 'express';

import pool from '../database';

class AtendimentoController {

    public async get(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT nome, A.id, B.setor, chamadoatual FROM colaboradores AS A INNER JOIN setor AS B ON A.setor = B.id ORDER BY A.id');
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