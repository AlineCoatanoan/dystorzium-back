import Joi from 'joi';

export const validateResponse = Joi.object({
  userId: Joi.number().required().messages({
    'number.base': 'L\'ID de l\'utilisateur doit être un nombre.',
    'any.required': 'L\'ID de l\'utilisateur est requis.',
  }),
  riddleId: Joi.number().required().messages({
    'number.base': 'L\'ID de l\'énigme doit être un nombre.',
    'any.required': 'L\'ID de l\'énigme est requis.',
  }),
  // Liste des actions à valider
  actions: Joi.array().items(
    Joi.object({
      actionId: Joi.number().required().messages({
        'number.base': 'L\'ID de l\'action doit être un nombre.',
        'any.required': 'L\'ID de l\'action est requis.',
      }),
      response: Joi.alternatives().try(
        Joi.string().trim().required().messages({
          'string.base': 'La réponse doit être une chaîne de caractères.',
          'string.empty': 'La réponse ne peut pas être vide.',
          'any.required': 'La réponse est requise.',
        }),
        Joi.number().required().messages({
          'number.base': 'La réponse doit être un nombre.',
          'any.required': 'La réponse est requise.',
        })
      ).required().messages({
        'any.required': 'La réponse à l\'action est requise.',
      }),
    })
  ).required().messages({
    'array.base': 'Les actions doivent être sous forme de tableau.',
    'any.required': 'Les actions sont requises.',
  })
});
