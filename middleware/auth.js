const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT en la cookie
function verificarToken(req, res, next) {
    // Obtener el token JWT de la cookie

    console.log(req.cookies);
    const token = req.cookies.token;
    // Verificar si el token está presente
    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    try {
        // Verificar el token JWT con la clave secreta
        const decoded = jwt.verify(token,'bb');

        // Guardar el usuario decodificado en el objeto de solicitud para su uso posterior
        req.usuario = decoded;
        next();
    } catch (error) {
        // Manejar errores de verificación del token
        return res.status(403).json({ mensaje: 'Token inválido' });
    }
}

module.exports = verificarToken;
