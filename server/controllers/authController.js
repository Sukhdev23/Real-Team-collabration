const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async ( req , res)=>{
    const {name , email , password} = req.body
    try {
        const hashed = await bcrypt.hash(password ,10 )
        const user = await User.create({name , email , password:hashed})
        res.status(201).json({user})
        
    } catch (error) {
 res.status(500).json({ error: "User already exists" });
    }


}


exports.login = async (req, res) => {
    const {email , password} = req.body;
    const user = await User.findOne({email})
    if(!user) return res.status(400).json({Error:"Invalid Credentials"})
    
    const isMatch = await  bcrypt.compare(password , user.password)
    if (!isMatch) return res.status(400).json({Error:"Invalid Credentials"})

    const token  = jwt.sign({id:user.id }, process.env.JWT_SECRET ,{
        expiresIn:"1d"
    })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
}