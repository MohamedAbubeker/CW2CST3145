const express = require("express");
const cors = require("cors");

const app = express();

const port = 4000;
const lessons =  [
    {"topic": "IT", "location": "Hendon", "price" : 100},
    {"topic": "math", "location": "Colindale", "price" : 80},
    {"topic": "math", "location": "Brent Cross", "price" : 90},
    {"topic": "math", "location": "Golders Green", "price" : 120},
];
app.get("/", (req, res) => {
    res.send("express server main route");
});
app.get("/lessons", (req, res) => {
    res.json(lessons);
});
app.listen(port, () => {
    console.log("server is running on port: " + port);
});