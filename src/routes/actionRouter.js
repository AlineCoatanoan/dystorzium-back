import { Router } from 'express';
import * as ActionController from '../controllers/actionController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const actionRouter = Router();

actionRouter.get('/', ctrlWrapper(ActionController.getActionsForRiddle));

