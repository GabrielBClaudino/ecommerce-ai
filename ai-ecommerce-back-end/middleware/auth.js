require('dotenv').config();
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET;

const WithAuth = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    
    if (!token) return res.status(401).json({ error: 'Sem token, acesso negado' });

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido' });

        req.email = decoded.email;
        next();
    });
};

module.exports = WithAuth;