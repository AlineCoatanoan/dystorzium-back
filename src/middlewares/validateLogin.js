import Joi from "joi";

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "format email invalide",
      "string.empty": "Email requis",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Le mot de passe doit comporter au moins 6 caractères",
      "string.empty": "Mot de passe requis",
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new Error(error.details[0].message));

  }

  next();
};