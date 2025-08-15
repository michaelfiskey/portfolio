import { Router } from 'express';
import bcrypt from 'bcrypt';
import { supabase } from '../database/supabase.js';

const authRouter = Router();

authRouter.post('/sign-up', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        const { data, error } = await supabase
            .from('users')
            .insert({email, username, password_hash: hashedPassword})
            .select();
        if (error) throw error;

        const {password_hash, ...noPassword} = data[0];

        res.status(201).json(noPassword);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }

});

authRouter.post('/login', async (req, res) => {
    try {    
        const {username, password} = req.body;
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username).single();

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid username' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash)

        if (!isValidPassword) {
            return res.status(401).json({error: 'Invalid password!'})
        }

        const { password_hash, ...noPassword} = user;
        res.json({
            message: 'Login success!',
            user: noPassword
        })
    } catch(error) {
        res.status(500).json({error: error.message});
    }



});

authRouter.post('/logout', (req, res) => res.send({title: 'Logout'}));

export default authRouter;