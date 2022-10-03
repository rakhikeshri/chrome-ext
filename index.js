const express = require('express')
const app = express()
const multer = require("multer")
const path = require("path")

const port = process.env.PORT || 3000

const apiData = require("./data.json")

// storage engine 

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
}) 

const upload = multer({
    storage: storage,
})

app.use('/profile', express.static('upload/images'));

app.post("/upload", upload.single('profile'), (req, res) => {
    res.json({
        success: 1,
        profile_url: `http://localhost:${port}/profile/${req.file.filename}`
    })
})


app.get('/', (req, res) => {
    res.send("Hellow World")
})

app.get("/snippets", (req, res) => {
    res.send(apiData)
})

app.listen(port, () => {
    console.log(`I am Live at port ${port}`)
})