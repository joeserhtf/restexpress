import { Request, Response } from 'express';


import pool from '../database';

class ColaboradorController {

    public async get(req: Request, res: Response): Promise<void> {
        const col = await pool.query(`SELECT C.id, S.setor, C.unidade , K.cargo, nome, email, ramal 
                                      FROM colaboradores as C
                                      INNER JOIN setor as S 
                                      ON C.setor = S.id
                                      INNER JOIN cargos as K
                                      ON C.cargo = K.id 
                                      ORDER BY C.id;`);
        res.json(col);
    }

    public async getU(req: Request, res: Response): Promise<void> {
        const uni = await pool.query('SELECT id ,unidade FROM unidade ORDER BY id;');
        res.json(uni);
    }

    public async getC(req: Request, res: Response): Promise<void> {
        const carg = await pool.query('SELECT id ,cargo FROM cargos ORDER BY id;');
        res.json(carg);
    }

    public async getS(req: Request, res: Response): Promise<void> {
        const se = await pool.query('SELECT id ,setor FROM setor ORDER BY id;');
        res.json(se);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO colaboradores set ?', [req.body]);
        res.json({ message: 'Colaborador Cadastrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE colaboradores set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Cadastro atualizado" });
    }

}

const colaboradorController = new ColaboradorController;
export default colaboradorController;