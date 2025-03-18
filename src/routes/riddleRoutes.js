import { Router } from 'express';
import * as RiddleController from '../controllers/riddleController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const riddleRouter = Router();

riddleRouter.get('/:id', ctrlWrapper(RiddleController.getRiddleById));
riddleRouter.post('/:id', ctrlWrapper(RiddleController.createRiddle));
riddleRouter.delete('/:id', ctrlWrapper(RiddleController.deleteRiddle));