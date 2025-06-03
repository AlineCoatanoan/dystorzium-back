export const errorMiddleware = (err, req, res, next) => {
    console.error(err); // Log de l'erreur
  
    const statusCode = err.status || 500; // Par défaut, erreur serveur (500)
    const message = err.message || 'Erreur interne du serveur';
  
    // En mode développement, on envoie aussi la stack pour debug
    res.status(statusCode).json({
      message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  };
  
  // error 400 : mauvaise requête
export const badRequestResponse = (res, message = "Bad request") => {
  return res.status(400).json({
    success: false,
    message: message || "Bad request",
  });
};