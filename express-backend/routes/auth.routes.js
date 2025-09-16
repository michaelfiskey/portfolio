import { Router } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../database/railwaydb.js';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
const authRouter = Router();

const generateToken = (user) => {
    return jwt.sign(
        {
            userId: user.id,
            username: user.username,
            role: user.role
        }, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: '1h'})
}

const authenticateToken = (req, res, next) => {
    try {
        const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
        const jwtSecretKey = process.env.JWT_SECRET_KEY;

        const authHeader = req.header(tokenHeaderKey);
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        
        if (!token) { return res.status(401).json({error: 'Access denied. No token provided.'}) }

        const verified = jwt.verify(token, jwtSecretKey);
        
        req.user = verified;
        next();

    } catch (error) {
        return res.status(401).send(error);
    }
}

const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (req.user.role !== role) {
            return res.status(403).json({error: `Access denied. '${role}' role required.` });
        }

        next();
    };
};

const validateSignUp = [
    body('username')
        .isLength({ min: 1, max: 30 })
        .withMessage('Username must be >1 and <30 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers, and underscores'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)')
];

const validateLogin = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .trim()
        .escape(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};

authRouter.get('/validate-token', authenticateToken, (req, res) => {
    res.json({
        message: 'Token is valid',
        user: {
            userId: req.user.userId,
            username: req.user.username,
            role: req.user.role
        }
    });
});

authRouter.post('/sign-up', validateSignUp, handleValidationErrors, async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const usernameCheck = await pool.query(
            'SELECT username FROM users WHERE username = $1', 
            [username]
        );

        if (usernameCheck.rows.length > 0) {
            return res.status(409).json({error: 'Username is already taken'});
        }

        const emailCheck = await pool.query(
            'SELECT email FROM users WHERE email = $1', 
            [email]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(409).json({error: 'Email is already registered'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await pool.query(
            'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, role, created_at',
            [email, username, hashedPassword]
        );
        
        const user = result.rows[0];

        const token = generateToken(user);

        res.status(201).json({
            message: 'Login success!',
            token: token,
            user: {
                username: user.username,
                role: user.role
            }
        });
    }
    catch (error) {
        res.status(400).json({error: error.message});
    };

});

authRouter.post('/login', validateLogin, handleValidationErrors, async (req, res) => {
    try {    
        const { username, password } = req.body;
        
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1', 
            [username]
        );
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Username not found!"});
        }
        
        const user = result.rows[0];
        
        const isValidPassword = await bcrypt.compare(password, user.password_hash)
        if (!isValidPassword) {return res.status(401).json({error: 'Invalid password!'})}

        const {password_hash, ...userNoPassword} = user;
        const token = generateToken(userNoPassword);

        res.json({
            message: 'Login success!',
            token: token,
            user: {
                username: user.username,
                role: user.role
            }
        })
    } catch(error) {
        res.status(500).json({error: error.message});
    };
});

authRouter.post('/logout', (req, res) => res.send({title: 'Logout'}));

export default authRouter;
export { authenticateToken, requireRole };