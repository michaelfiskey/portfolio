import { Router } from 'express';
import { supabase } from '../database/supabase.js';

const spotifyRouter = Router();

spotifyRouter.get('/track-ids', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('spotify_tracks')
            .select('*');
        
        if (error) throw error;
        console.log(data)
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default spotifyRouter;