
import Joi from 'joi';

// Middleware pour valider les mises à jour de l'utilisateur

export const validateUserUpdate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().messages({
      'string.email': 'format email invalide',
    }),
    password: Joi.string().min(6).messages({
      'string.min': 'Le mot de passe doit comporter au moins 6 caractères',
    }),
    role: Joi.string().valid('user', 'admin'),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(new Error(error.details[0].message));
  }

  next();
};
