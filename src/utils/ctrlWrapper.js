export const ctrlWrapper = (ctrl) => {
    return async (req, res, next) => {
      try {
        await ctrl(req, res, next);
      } catch (error) {
        next(error); // Passer l'erreur au middleware de gestion des erreurs
      }
    };
  };