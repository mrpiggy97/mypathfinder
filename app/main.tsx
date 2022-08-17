import express from "express"
import path from "path"

var app = express()
app.use(express.static(path.join(__dirname,"/build")));

const PORT = process.env.REACT_APP_PORT
app.listen(PORT)
console.log(`app listening on port 3000 ${PORT}`)