import { Router } from 'express';
import { clueRouter } from './clueRouter.js';
import { riddleRouter } from './riddleRouter.js';
import { userRouter } from './userRouter.js';
import { actionRouter } from './actionRouter.js';
import { authRouter } from './authRouter.js';

export const router = Router();

router.get('/', (req, res) => {
  res.send('Je te vois...');
});

router.use('/clue', clueRouter);
router.use('/riddle', riddleRouter);
router.use('/user', userRouter);
router.use('/action', actionRouter);
router.use('/auth', authRouter);

