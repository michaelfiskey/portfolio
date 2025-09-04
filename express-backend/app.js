import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter, { authenticateToken, requireRole } from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import projectRouter from './routes/projects.routes.js';
import spotifyRouter from './routes/spotify.routes.js';

const app = express();

dotenv.config();

app.use(express.json())

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}));



app.use('/auth', authRouter)
app.use('/users', authenticateToken, requireRole('owner'), userRouter)
app.use('/spotify', spotifyRouter)
app.use('/projects', projectRouter)

app.get('/', (req, res) => {
    res.send('Express backend up and running!')
})

app.listen(process.env.PORT, () => {console.log(`API is running on http://localhost:${process.env.PORT}`)})
console.log('Server Running')