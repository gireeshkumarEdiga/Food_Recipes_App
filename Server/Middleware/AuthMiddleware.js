const jwt = require("jsonwebtoken");

module.exports = async (req,res,next) => {

    try{

        const authMiddleware = req.headers.authorization;
        console.log("authMiddleware : ",authMiddleware);

        if(!authMiddleware){
            return res.send({
                Message : "Authorization Header is Missing",
                Success : false
            })
        }

        const token = authMiddleware.split(" ")[1];

        if(!token){
            return res.send({
                Message : "JWT Token is Missing",
                Success : false
            })
        }

        const decodedToken = jwt.verify(token,process.env.SECRETE_KEYS);
        console.log("decodedToken : ",decodedToken);

        req.body.userId = decodedToken.userId;

        next();

    }catch(error){
        res.send({
            Message : error.Message,
            Success : false
        })
    }
}