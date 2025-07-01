import { Router } from 'express';
import * as AuthController from '../controllers/AuthController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateLogin } from '../middlewares/validateLogin.js';

export const authRouter = Router();

// Route login — pas besoin de middleware ici, c'est la connexion
authRouter.post('/login', validateLogin, ctrlWrapper(AuthController.loginUser));

// Route logout — nécessite d'être authentifié
authRouter.post('/logout', ctrlWrapper(AuthController.logoutUser));

