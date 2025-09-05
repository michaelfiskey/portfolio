import { Router } from 'express';
import bcrypt from 'bcrypt';
import { supabase } from '../database/supabase.js';
import jwt from 'jsonwebtoken';
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

authRouter.post('/sign-up', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const { data: existingUsername, error: usernameError } = await supabase
            .from('users')
            .select('username')
            .eq('username', username)
            .single();

        if (existingUsername) {
            return res.status(409).json({error: 'Username is already taken'});
        };

        const { data: existingEmail, error: emailError } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();

        if (existingEmail) {
            return res.status(409).json({error: 'Email is already registered'});
        };

        const hashedPassword = await bcrypt.hash(password, 12);

        const { data, error } = await supabase
            .from('users')
            .insert({email, username, password_hash: hashedPassword})
            .select();
        if (error) throw error;

        const {password_hash, ...userNoPassword} = data[0];

        const token = generateToken(userNoPassword);

        res.status(201).json({
            message: 'Login success!',
            token: token,
            user: {
                username: userNoPassword.username,
                role: userNoPassword.role
            }
        });
    }
    catch (error) {
        res.status(400).json({error: error.message});
    };

});

authRouter.post('/login', async (req, res) => {
    try {    
        const { username, password } = req.body;
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username).single();
        if (!user) {return res.status(401).json({ error: "Username not found!"});}
        
        const isValidPassword = await bcrypt.compare(password, user.password_hash)
        if (!isValidPassword) {return res.status(401).json({error: 'Invalid password!'})}

        if (error) {return res.status(401).json({error: "An error has occured."})}

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