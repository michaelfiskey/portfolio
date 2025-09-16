import { Router } from 'express';
import { pool } from '../database/railwaydb.js';
import bcrypt from 'bcrypt';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        const users = result.rows;
        
        res.json(users);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.post('/', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const userRole = role ? role : 'user';

        const usernameCheck = await pool.query(
            'SELECT * FROM users WHERE username = $1', 
            [username]
        );

        if (usernameCheck.rows.length > 0) {
            return res.status(409).json({error: 'Username is already taken'});
        };

        const emailCheck = await pool.query(
            'SELECT * from users WHERE email = $1',
            [email]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(409).json({error: 'Email is already taken'});
        };

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const result = await pool.query(
            'INSERT INTO users (email, username, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, created_at',
            [email, username, hashedPassword, userRole]
        );

        res.status(201).json({message: 'Successfully posted user!', user: result.rows[0]});

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

userRouter.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


userRouter.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, role } = req.body;
        
        const currentUserResult = await pool.query(
            'SELECT username, email, role FROM users WHERE id = $1',
            [userId]
        );
        
        if (currentUserResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const currentUser = currentUserResult.rows[0];
        
        const updatedUsername = username ? username : currentUser.username;
        const updatedEmail = email ? email : currentUser.email;
        const updatedRole = role ? role : currentUser.role;
        
        const updateResult = await pool.query(
            'UPDATE users SET username = $1, email = $2, role = $3 WHERE id = $4 RETURNING id, username, email, role, created_at',
            [updatedUsername, updatedEmail, updatedRole, userId]
        );
        
        res.json({message: 'Successfully updated user!', user: updateResult.rows[0]});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

userRouter.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        
        const deleteResult = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING id, username, email, role, created_at',
            [userId]
        );

        if (deleteResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({message: 'Successfully deleted user!', user: deleteResult.rows[0]});

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default userRouter;