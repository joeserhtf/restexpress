import { Request, Response } from 'express';


import pool from '../database';

class LoginController {

    public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM colaboradores');
        res.json(games);
    }

    public async login(req: Request, res: Response): Promise<void> {
        //const { email } = req.body;
        const  email  = 'joeser.fermiano@carajas.net.br';
        const { password } = req.body;
        console.log(password);
        console.log(email);
        const games = await pool.query(`SELECT * FROM colaboradores
                                        WHERE email = '${email}'
                                        AND password = '${password}';`);
        res.json(games);
    }


    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO colaboradores set ?', [req.body]);
        res.json({ message: 'Salvo' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE colaboradores set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM colaboradores WHERE id = ?', [id]);
        res.json({ message: "Deletado" });
    }
}

const loginController = new LoginController;
export default loginController;