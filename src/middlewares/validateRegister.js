import Joi from "joi";



export const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required().messages({
      "string.empty": "Prénom requis",
    }),
    lastName: Joi.string().required().messages({
      "string.empty": "Nom requis",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "email format invalide",
      "string.empty": "Email requis",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Le mot de passe doit comporter au moins 6 caractères",
      "string.empty": "Mot de passe requis",
    }),
    role: Joi.string().valid("user", "admin").optional(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });


  if (error) {
    return next(new Error(error.details[0].message));

  }

  next();
};