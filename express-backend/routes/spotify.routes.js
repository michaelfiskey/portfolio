import { Router } from 'express';
import { supabase } from '../database/supabase.js';
import { getSpotifyAccessToken } from '../services/spotifyService.js';
import { authenticateToken, requireRole } from './auth.routes.js';

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

spotifyRouter.delete('/track/:track_id', authenticateToken, requireRole('owner'), async (req, res) => {
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

spotifyRouter.delete('/album/:album_id', authenticateToken, requireRole('owner'), async (req, res) => {
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

spotifyRouter.post('/add-track', authenticateToken, requireRole('owner'), async (req, res) => {
    const { track_id, track_category } = req.body;
    if (!track_id) {
        return res.status(400).json({ error: 'track id is required' });
    }
    try {
        const accessToken = await getSpotifyAccessToken();

        const response = await fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch track from Spotify');
        }
        const trackData = await response.json();

        const track_name = trackData.name;
        const album_id = trackData.album?.id;
        const album_name = trackData.album?.name;
        const artist_id = trackData.artists?.[0]?.id;
        const artist_name = trackData.artists?.[0]?.name;
        const release_year = trackData.album?.release_date?.slice(0, 4);

        const { data, error } = await supabase
            .from('spotify_tracks')
            .insert([
                { track_id, track_name, album_id, album_name, artist_id, artist_name, release_year, track_category }
            ])
            .select();
        if (error) throw error;
        res.json({ message: 'Track added successfully', track: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default spotifyRouter;