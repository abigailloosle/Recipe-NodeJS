require('dotenv').config();

const express = require("express");
const app = express();

const controller = require("./controller/recipes.js");

const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
app.post('/addRecipe', controller.addRecipe);

app.get('/allRecipes', controller.getAllRecipes);

app.listen(port, function () {
    console.log("Server listening on port:" + port)
});
