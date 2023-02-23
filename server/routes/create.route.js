const express = require("express");
const {Prompts} = require("../config/GPTFunc");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;


const router = express.Router();

// store the file in the uploads folder
const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.fieldname + "-" + Date.now());
    }
})
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});
router.post("/create", async (req, res) => {
    try{
        const {details}=req.body; //convert string to JSON
        console.log(details)
        let myCloud = await cloudinary.uploader.upload(req.body.image,{
                folder: "resume_images",
                quality: "50",
        });
        console.log(req.body.image)
        if(req.body.work_experience){
            const {experience}=req.body; //convert string to JSON

            const newEntry = {
                fullName: details?.fullName,
                image_url:myCloud?.secure_url,
                currentPosition: details.currentPosition,
                currentExperience: details.currentExperience,
                currentTechnologies: details.currentTechnologies,
                workExperience: experience,
            }
            function remainderText() {
                let stringText = "";
                for (let i = 0; i < experience.length; i++) {
                    stringText += `In ${experience[i]?.companyName} as a ${experience[i]?.companyPosition}.`;
                }
                return stringText;
            }
            const chatGPT=await Prompts(newEntry, remainderText)
            const data={...newEntry,...chatGPT}

            return res.status(200).json({
                message:"Request Successful",
                data
            })
        }else{
            const newEntry = {
                fullName: details.fullName,
                image_url:myCloud?.secure_url,
                currentPosition: details.currentPosition,
                currentExperience: details.currentExperience,
                currentTechnologies: details.currentTechnologies,
            }
            const chatGPT=await Prompts(newEntry)
            const data={...newEntry,...chatGPT}

            return res.status(200).json({
                message:"Request Successful",
                data
            })
        }
    }catch (e) {
        console.log(e)
        res.status(408).json({
            success:false,
            message:e.message,
        })
    }

})

module.exports = router;