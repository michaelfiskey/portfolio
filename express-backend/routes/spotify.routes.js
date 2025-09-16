import { Router } from 'express';
import { pool } from '../database/railwaydb.js';
import { getSpotifyAccessToken } from '../services/spotifyService.js';
import { authenticateToken, requireRole } from './auth.routes.js';

const spotifyRouter = Router();

spotifyRouter.get('/track-ids', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM spotify_tracks');
        
        const tracks = result.rows;

        res.json(tracks);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

spotifyRouter.delete('/track/:track_id', authenticateToken, requireRole('owner'), async (req, res) => {
    try {
        const { track_id } = req.params;

        const deleteRequest = await pool.query(
            'DELETE FROM spotify_tracks WHERE track_id = $1 RETURNING track_id, track_name, album_id, artist_id, artist_name, release_year, track_category, created_at',
            [track_id]
        );

        if (deleteRequest.rows.length === 0 ) {
            return res.status(404).json({ error: 'Track not found' });
        }

        res.json({message: 'Successfully deleted track!', track: deleteRequest.rows[0]})

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

spotifyRouter.delete('/album/:album_id', authenticateToken, requireRole('owner'), async (req, res) => {
    try {
        const { album_id } = req.params;

        const deleteRequest = await pool.query(
            'DELETE FROM spotify_tracks WHERE album_id = $1 RETURNING track_id, track_name, album_id, artist_id, artist_name, release_year, track_category, created_at',
            [album_id]
        );

        if (deleteRequest.rows.length === 0 ) {
            return res.status(404).json({ error: 'Track(s) with associated album not found' });
        }

        res.json({message: 'Successfully deleted track(s) with associated album!', tracks: deleteRequest.rows})

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
        
        const checkTrackId = await pool.query(
            'SELECT * FROM spotify_tracks WHERE track_id = $1',
            [track_id]
        );

        if (checkTrackId.rows.length !== 0 ) {
            return res.status(400).json({ error: 'Track already exists!' });
        }
        
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

        const result = await pool.query(
            'INSERT INTO spotify_tracks (track_id, track_name, album_id, album_name, artist_id, artist_name, release_year, track_category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING track_id, track_name, album_id, album_name, artist_id, artist_name, release_year, track_category',
            [track_id, track_name, album_id, album_name, artist_id, artist_name, release_year, track_category]
        );

        res.json({ message: 'Track added successfully!', track: result.rows[0]});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default spotifyRouter;