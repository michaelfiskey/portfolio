import { Router } from 'express';
import { supabase } from '../database/supabase.js';

const projectRouter = Router();

projectRouter.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('dev_and_data_projects')
            .select('*');
        
        if (error) throw error;
        
        console.log(data)
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});


export default projectRouter;