const {openai} = require("./openai");

const GPTFunction = async (text) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0.6,
        max_tokens: 250,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    });
    return response.data.choices[0].text;
};

const Prompts=async (newEntry,remainderText)=>{

//👇🏻 The job description prompt
    const prompt1 = `Prompt1: I am writing a resume, my details are \n name: ${newEntry.fullName} \n role: ${newEntry.currentPosition} (${newEntry.currentExperience} years). \n I write in the technologies: ${newEntry.currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;
//👇🏻 The job responsibilities prompt
    const prompt2 = `Prompt2: I am writing a resume, my details are \n name: ${newEntry.fullName} \n role: ${newEntry.currentPosition} (${newEntry.currentExperience} years). \n I write in the technologies: ${newEntry.currentTechnologies}. Can you write 10 points for a resume on what I am good at?`;
    //
    // console.log(prompt2)
    // console.log(prompt1)
    const objective = await GPTFunction(prompt1);
    const points = await GPTFunction(prompt2)
    // const objective=prompt1
    // const points=prompt2
    //👇🏻 The job achievements prompt

    if(newEntry?.workExperience){
        const prompt3 = `Prompt 3:I am writing a resume, my details are \n name: ${newEntry.fullName} \n role: ${newEntry.currentPosition} (${newEntry.currentExperience} years). \n During my years I worked at ${
            newEntry.workExperience.length
        } companies. ${remainderText()} \n Can you write me 50 words for each company seperated in numbers of my succession in the company (in first person)?`;
         const jobResponsibilities= await GPTFunction(prompt3);

         //put into an object
         return {objective,points,jobResponsibilities}
    }else{
        //👇🏻 put them into an object
        return  { objective,points };
    }

}
module.exports={GPTFunction,Prompts}