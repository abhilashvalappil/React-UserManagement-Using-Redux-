const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    console.log("0000000000000000000000000000000");
    
    
    const token = req.header('Authorization')?.replace('Bearer',"")
    console.log(token);
    
        console.log("111111111111111111111111111");
        
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }
    console.log("222222222222222222222222222222222222");
    
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        console.log("decoded",decoded);
        
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateJWT;