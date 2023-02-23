const express = require("express");

const {Prompts} = require("../config/GPTFunc");
const multer = require("multer");

const router = express.Router();

// store the file in the uploads folder
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});
router.post("/create", upload.single("headshotImage"), async (req, res) => {
    try{
        const details=JSON.parse(req.body.details); //convert string to JSON
        if(req.body.work_experience){
            const experience=JSON.parse(req.body.work_experience); //convert string to JSON

            const newEntry = {
                fullName: details.fullName,
                image_url:`http://localhost:8000/uploads/${req.file.filename}`,
                currentPosition: details.currentPosition,
                // currentTechnologies: details.currentTechnologies,
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
                image_url:`http://localhost:8000/uploads/${req.file.filename}`,
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
        res.status(408).json({
            success:false,
            message:e.message,
        })
    }

});

module.exports = router;