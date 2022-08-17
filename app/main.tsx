import express from "express"
import path from "path"

var app = express()
app.use(express.static(path.join(__dirname,"/build")));

app.listen(3000)
console.log("app listening on port 3000")