import { Router } from 'express';

const authRouter = Router();

authRouter.get('/sign-up', (req, res) => res.send({title: 'Sign up'}))

authRouter.post('/login', (req, res) => res.send({title: 'Login'}))

authRouter.post('/logout', (req, res) => res.send({title: 'Logout'}))

export default authRouter;