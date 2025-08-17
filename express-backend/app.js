import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the API!')
})

app.listen(PORT, () => {console.log(`API is running on http://localhost:${PORT}`)})
console.log('Server Running')