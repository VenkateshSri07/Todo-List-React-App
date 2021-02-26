const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3003;
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log("server is running on port:", PORT));

app.get("/", (req, res) => {
    res.send("app is working")
})

mongoose.connect(process.env.MDB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) return console.log(err);
        console.log("connected to MongoDB")

    });

app.use("/API", require("./Controllers/todoList"));
