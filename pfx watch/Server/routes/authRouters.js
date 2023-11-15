const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtAuth = require("../middleware/jwtAuth");
const PerfexUsersData = require("../models/perfexUsers")


const router = express.Router(); 

router.get("/",(req,res)=>{
    res.send("this is auth Routes Page")
});  

// Register API to user to db
// router.post("/signup",async(req,res)=>{   

//     try{
//         const {name,email,phoneNumber,gender,password}=req.body;
//         const isUserExist = await PerfexUsersData.findOne({email:email});
//         if(!isUserExist){

//             const hashedPassword =await bcrypt.hash(password,10);
//             console.log(hashedPassword);


//             //adding  a user to 
            
//             const user = new PerfexUsersData({
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
router.post("/signup", async(req, res) => {
    // res.send("signup Api")
     //console.log(req.body);
    try {
        const { name, email, phoneNumber, gender, password,confirmPassword } = req.body;

        const isUserExist = await PerfexUsersData.findOne({ email: email });
        //console.log(isUserExist)
        if (!isUserExist) {

            const hashedPassword = await bcrypt.hash(password, 10)
            const hashedconfirmPassword = await bcrypt.hash(confirmPassword, 10)
            // console.log(hashedPassword);
            const user = new PerfexUsersData({
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                gender: gender,
                password: hashedPassword,
                confirmPassword:hashedconfirmPassword
            })
            user.save()

            return res.status(201).json({ message: "registration succes" });
        } else {

            return res.status(400).json({ message: "user already registered with this email id" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
 });


//login API 
router.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;

        const isUserExist = await PerfexUsersData.findOne({email:email});
        if(isUserExist){
            const isPasswordMatched = await bcrypt.compare(password,isUserExist.password);
            if(isPasswordMatched){
                // creating payload and it is always in object form
                const payload ={
                    id:isUserExist._id
                }
                //create a token
                let token = jwt.sign(payload,'AVULA')  
                return res.status(200).json ({message:"Login Success", token: token})//it is usedfor frontend
            }else{
                return res.status(401).json({message:"Password Not Matched"})
            }

        }else{
            return res.status(400).json({message:"User Email Not Found"})
        }
    
    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }



   
});


//profile API
router.get("/user-profile", jwtAuth, async(req,res)=>{
    console.log(req.id);
    const user = await PerfexUsersData.findOne({_id:req.id})
    console.log(user);
    
    res.json({userDetails:user})
})

module.exports = router;