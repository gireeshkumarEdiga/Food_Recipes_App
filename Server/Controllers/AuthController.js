const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../Models/Users");

const authController = async (req,res) => {

    const MEASURE = req.body.MEASURE;
    const FIRSTNAME = req.body.FIRSTNAME;
    const LASTNAME = req.body.LASTNAME;
    const EMAIL = req.body.EMAIL;
    const MOBILE = req.body.MOBILE;
    const PASSWORD = req.body.PASSWORD;
    const CONFIRMPASSWORD = req.body.CONFIRMPASSWORD

    if(MEASURE == "SIGN_UP"){

        try{

            // 1. if the user already exists
            const isUserExists = await Users.findOne({email : EMAIL});
            console.log("isUserExists : ",isUserExists);

            // 2. user existed, send an error
            if(isUserExists){
                res.send({
                    Message : "User Already Exists",
                    Success : false
                });

            }else{

                // 3. encrypt the password
                const hashedPassword = await bcrypt.hash(PASSWORD,10);
                req.body.PASSWORD = hashedPassword;

                const hashedConfirmPassword = await bcrypt.hash(CONFIRMPASSWORD,10);
                req.body.CONFIRMPASSWORD = hashedConfirmPassword;

                // 4. Creates a new user, save in DB
                const isUser = await Users.create({
                    firstname : FIRSTNAME,
                    lastname : LASTNAME,
                    email : EMAIL,
                    mobile : MOBILE,
                    password : PASSWORD,
                    confirmPassword : CONFIRMPASSWORD
                })

                // 5. Check if the user is saved or not
                const isUserSignedup = await Users.findOne({email : EMAIL});
                if(isUserSignedup){
                    res.send({
                        Message : "User Signed up Successfully",
                        Success : false
                    });
                }else{
                    res.send({
                        Message : "User Not Signed up Successfully",
                        Success : false
                    });
                }

            }


        }catch(error){
            res.send({
                Message : error.message,
                Success : false
            });
        }

    }

    if(MEASURE == "LOGGED_IN"){

        try{

            // 1. check if the email is there are not in DB
            const isEmail = await Users.findOne({email : EMAIL});

            // 2. check if passwords are matching or not
            const isMatch = bcrypt.compare(isEmail.password,PASSWORD);

            if(isEmail && isMatch){

                    const token = jwt.sign(
                        {   userId : isEmail._id    },
                        process.env.SECRETE_KEY,
                        {   expiresIn : "1d"    } 
                    );

                res.send({
                    Message : "LoggedIn Successfully",
                    Success : true,
                    user : isEmail,
                    token : token
                });

            }else{
                res.send({
                    Message : "Email or Password are Incorrect!",
                    Success : false
                });
            }

        }catch(error){

            res.send({
                Message : error.message,
                Success : false
            })

        }

    }

    if(MEASURE == "GET_USERS_LIST"){

        const isUsersList = await Users.find();

        if(isUsersList){
            res.send({
                Message : "Users List",
                Success : true,
                Data : isUsersList
            });
        }else{
            res.send({
                Message : "Users List Not Found",
                Success : false
            });
        }

    }


}

module.exports = {
    authController
}