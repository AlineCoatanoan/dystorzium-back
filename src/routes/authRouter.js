import { Router } from 'express';
import * as AuthController from '../controllers/AuthController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const authRouter = Router();

// Route login — pas besoin de middleware ici, c'est la connexion
authRouter.post('/login', ctrlWrapper(AuthController.loginUser));

// Route logout — nécessite d'être authentifié
authRouter.post('/logout', authMiddleware, ctrlWrapper(AuthController.logoutUser));
