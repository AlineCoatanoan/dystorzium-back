import { Router } from 'express';
import * as ClueController from '../controllers/clueController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const clueRouter = Router();

clueRouter.get('/:id', ctrlWrapper(ClueController.getClueById));
clueRouter.post('/:id', ctrlWrapper(ClueController.createClue));
clueRouter.delete('/:id', ctrlWrapper(ClueController.deleteClue));