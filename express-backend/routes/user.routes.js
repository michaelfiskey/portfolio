import { Router } from 'express';
import { supabase } from '../database/supabase.js';

const userRouter = Router();

// GET all users
userRouter.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*');
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE new user
userRouter.post('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .insert(req.body)
            .select();
        
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET user by ID
userRouter.get('/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', req.params.id)
            .single();
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: 'User not found' });
    }
});

// UPDATE user
userRouter.put('/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .update(req.body)
            .eq('id', req.params.id)
            .select();
        
        if (error) throw error;
        res.json(data[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE user
userRouter.delete('/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', req.params.id);
        
        if (error) throw error;
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default userRouter;