import { Router } from 'express';
import * as UserController from '../controllers/userController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateUserUpdate } from '../middlewares/validateUserUpdate.js';
import { validateRegister } from '../middlewares/validateRegister.js';
import { authenticate } from '../middlewares/authenticate.js';

export const userRouter = Router();

// Route pour récupérer tous les utilisateurs
userRouter.get('/', ctrlWrapper(UserController.getUsers));

// Route pour récupérer un utilisateur par ID
userRouter.get('/:id', ctrlWrapper(UserController.getUser));

// Route pour créer un nouvel utilisateur
userRouter.post('/register', validateRegister, ctrlWrapper(UserController.createUser));

// Route pour mettre à jour un utilisateur
userRouter.put('/:id', authenticate, validateUserUpdate, ctrlWrapper(UserController.updateUser));

// Route pour supprimer un utilisateur
userRouter.delete('/:id', ctrlWrapper(UserController.deleteUser));


