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


spotifyRouter.delete('/track/:track_id', async (req, res) => {
    try {
        const { track_id } = req.params;

        const { data, error } = await supabase
            .from('spotify_tracks')
            .delete()
            .eq('track_id', track_id)
            .select();

        if (error) throw error;
            
        if (data.length === 0) {
            return res.status(404).json({ error: 'Track not found' });
        }
        
        console.log('Deleted track:', data);
        res.json({ message: 'Track deleted successfully', deletedTrack: data[0] });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

spotifyRouter.delete('/album/:album_id', async (req, res) => {
    try {
        const { album_id } = req.params;

        const { data, error } = await supabase
            .from('spotify_tracks')
            .delete()
            .eq('album_id', album_id)
            .select();

        if (error) throw error;
            
        if (data.length === 0) {
            return res.status(404).json({ error: 'Album not found' });
        }
        
        console.log('Deleted album and tracks pertaining to album:', data);
        res.json({ message: 'Album and tracks deleted successfully', deletedTracks: data[0] });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default spotifyRouter;