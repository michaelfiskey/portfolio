import { Router } from 'express';
import bcrypt from 'bcrypt';
import { supabase } from '../database/supabase.js';

const authRouter = Router();

authRouter.post('/sign-up', async (req, res) => {
    try {
        const {username, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 12)

        const { data, error } = await supabase
            .from('users')
            .insert({email, username, password_hash: hashedPassword})
            .select();
        if (error) throw error;

        const {password_hash, ...noPassword} = data[0]

        res.status(201).json(noPassword)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }




});

authRouter.post('/login', (req, res) => res.send({title: 'Login'}))

authRouter.post('/logout', (req, res) => res.send({title: 'Logout'}))

export default authRouter;