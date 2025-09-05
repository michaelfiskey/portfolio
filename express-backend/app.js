import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRouter, { authenticateToken, requireRole } from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import projectRouter from './routes/projects.routes.js';
import spotifyRouter from './routes/spotify.routes.js';
import contactRouter from './routes/contact.routes.js';
const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, 
    message: {
        error: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, 
    message: {
        error: 'Too many login attempts, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, 
    message: {
        error: 'Too many contact form submissions, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

dotenv.config();

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'", "https://api.spotify.com"]
        }
    }
}));

app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}));

app.use('/auth', authLimiter, authRouter)
app.use('/contact', contactLimiter, contactRouter)
app.use('/users', authenticateToken, requireRole('owner'), userRouter)
app.use('/spotify', spotifyRouter)
app.use('/projects', projectRouter)

app.get('/', (req, res) => {
    res.send('Express backend up and running!')
})

app.listen(process.env.PORT, () => {console.log(`API is running on http://localhost:${process.env.PORT}`)})
console.log('Server Running')