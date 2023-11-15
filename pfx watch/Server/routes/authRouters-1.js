const express = require("express");
const PerfexUsersData = require("../models/perfexUsers")
const jwtAuth = require("../middleware/jwtAuth");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");


// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const jwtAuth = require("../middleware/jwtAuth");

// const JobbyUsersData = require("../model/jobbyUsers")


// const router = express.Router(); 







router.get("/", (req, res) => {
    res.send("This is Authentication Router Page")
});


router.post("/signup", async (req, res) => {
    // try{
        //         const {name,email,phoneNumber,gender,password}=req.body;
        //         const isUserExist = await JobbyUsersData.findOne({email:email});
        //         if(!isUserExist){
        
        //             const hashedPassword =await bcrypt.hash(password,10);
        //             console.log(hashedPassword);
        
    try {
        const isUserExist = await PerfexUsersData.findOne({ email: req.body.email })
        console.log(isUserExist)
        if (!isUserExist) {
            const hashedPassword =await bcrypt.hash(password,10);
                        console.log(hashedPassword);
                        //             const hashedPassword =await bcrypt.hash(password,10);
//             console.log(hashedPassword);


//             //adding  a user to 
            
//             const user = new JobbyUsersData({
//                 name:name,
//                 email:email,
//                 phoneNumber:phoneNumber,
//                 gender:gender,
//                 password:hashedPassword
//             });
            const newUser = {
                "name": req.body.name,
                "email": req.body.email,
                "phoneNumber": req.body.phoneNumber,
                "gender": req.body.gender,
                "password": req.body.password,
                "confirmPasword": req.body.confirmPasword
            };
            const userDetails = await PerfexUsersData.create(newUser)   //  POSTING TO COLLECTION OR MODEL
            console.log(userDetails)

            res.status(200).send("user created successfully")

        } else {

            // if user mail id is founded send below response
            res.status(400).json("user already registered")

        }
        //             user.save();
//             return res.status(201).json({message:"Registratiom Success"})

//         }else{
//             //send response to clint the user is already exist
//             return res.status(400).json({message:"User already Registere with this email Id"})
//         };
    } catch (e) {
        console.log(e.message)
        return res.status(500).json("message: e.message")

    }
});





// router.post("/signup",async(req,res)=>{   

//     try{
//         const {name,email,phoneNumber,gender,password}=req.body;
//         const isUserExist = await JobbyUsersData.findOne({email:email});
//         if(!isUserExist){

//             const hashedPassword =await bcrypt.hash(password,10);
//             console.log(hashedPassword);


//             //adding  a user to 
            
//             const user = new JobbyUsersData({
//                 name:name,
//                 email:email,
//                 phoneNumber:phoneNumber,
//                 gender:gender,
//                 password:hashedPassword
//             });
//             user.save();
//             return res.status(201).json({message:"Registratiom Success"})

//         }else{
//             //send response to clint the user is already exist
//             return res.status(400).json({message:"User already Registere with this email Id"})
//         };



//     }catch(e){
//         console.log(e);
//         return res.status(500).json({message:"Internal Server Error"});
//     }
   
// })

























router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email

        const isUserExist = await PerfexUsersData.findOne({ email });

        if (!isUserExist) {
            return res.status(401).send('User not found');
        }
        const payload = {
            user: isUserExist.id,
        };
        jwt.sign(
            payload,
            'jwtpassword',
            { expiresIn: 3600 }, // 3600 seconds = 1 hour
            (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal server error');
                }
                return res.json({ token });
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;