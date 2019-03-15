const express = require("express");
const app = express();

const controller = require("./controller/recipes.js");

const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get('/allRecipes', controller.getAllRecipes);

app.listen(port, function () {
    console.log("Server listening on port:" + port)
});
