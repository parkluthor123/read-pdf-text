const fs = require("fs");
const pdfParse = require("pdf-parse");
const express = require("express");
const fileUpload = require("express-fileupload")

const app = express();
const port = 3334;

app.use(express.json());

app.use(fileUpload({
    createParentPath: true
}))

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
});

app.post('/upload', async (req, res) => {
    const data = req.files;
    const arrData = []

    if(!data) {
        res.status(400).json({message: 'No file uploaded!'});
    }

    pdfParse(data.file)
        .then(result => {
            const resData = result.text
            return res.json({
                text: result.text,
                pages: result.numpages
            })
        }).catch((err) => {
            return res.status(400).json({message: err.message})
        })
});

app.listen(port, () => {
    console.log(`Port ${port} is listening!`);
});