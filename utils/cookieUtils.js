
 
export const setAuthCookie = (res, token) => {
    res.cookie('token', token, {
      httpOnly: true,   // Empêche l'accès via JavaScript (protège contre XSS)
      secure: true,     // Active uniquement en HTTPS
      sameSite: 'Strict', // Empêche les fuites CSRF
      maxAge: 60 * 60 * 1000, // Expire dans 60 minutes
    });
  };
  

  export const clearAuthCookie = (res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });
  };
  