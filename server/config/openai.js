//@ts-check
const OpenAIApi = require("openai")
require("dotenv/config")
const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY
})

module.exports = { openai }