import { Router } from 'express';
import * as UserController from '../controllers/userController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';  // Si tu as des middlewares pour la vérification d'auth

export const userRouter = Router();

// Route pour récupérer tous les utilisateurs
userRouter.get('/', authMiddleware, ctrlWrapper(UserController.getUsers));

// Route pour récupérer un utilisateur par ID
userRouter.get('/:id', authMiddleware, ctrlWrapper(UserController.getUser));

// Route pour créer un nouvel utilisateur
userRouter.post('/register', authMiddleware, ctrlWrapper(UserController.createUser));

// Route pour mettre à jour un utilisateur
userRouter.put('/:id', authMiddleware, ctrlWrapper(UserController.updateUser));

// Route pour supprimer un utilisateur
userRouter.delete('/:id', authMiddleware, ctrlWrapper(UserController.deleteUser));


