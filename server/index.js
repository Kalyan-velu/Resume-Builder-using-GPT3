//@ts-check
const express = require('express')
const cors = require('cors')
const path = require('path')
const cloudinary = require("cloudinary").v2

const app = express()

app.use(cors()) //enable cors
app.use(express.json({ limit: "30mb" }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

cloudinary.config({
    cloud_name: 'dhxxb8jpz',
    api_key: '861478288591641',
    api_secret: 'N0BkxRZ8Wie9zho8wwrN0u29nFA',
    secure: true
})

const __dirname1 = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, 'client/dist')))

    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"))
    })
} else {
    app.get("/", (request, response) => {
        response.json({ message: "Server is Up" })
    })
}

app.use('/api/resume', require('./routes/create.route'))

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})