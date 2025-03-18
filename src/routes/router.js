import { Router } from 'express';
import { clueRouter } from './clueRoutes.js';
import { riddleRouter } from './riddleRoutes.js';
import { userRouter } from './userRoutes.js';
import { actionRouter } from './actionRoutes.js';
import { authRouter } from './authRoutes.js';

export const router = Router();

router.get('/', (req, res) => {
  res.send('Je te vois...');
});

router.use('/clue', clueRouter);
router.use('/riddle', riddleRouter);
router.use('/user', userRouter);
router.use('/action', actionRouter);
router.use('/auth', authRouter);

