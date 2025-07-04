const jwt = require('jsonwebtoken')

const  auth = (req , res , next) =>{
    const token = req.header('Authrization')

    if(!token) return res.status(401).json({Error:"Access denied"} )
        try {
            const decode = jwt.verify(token , process.env.JWT_SECRET)
            req.user = decode.id
            next()
        } catch (error) {
            res.status(400).json({ error: "Invalid token" });
        }
}

module.exports = auth;