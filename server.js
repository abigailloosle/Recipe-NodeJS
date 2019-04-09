require('dotenv').config();

const express = require("express");
const app = express();
const session = require('express-session');

const c_rec = require("./controller/recipes.js");
const c_rand = require("./controller/randomizer.js");
const c_account = require("./controller/account.js");

const port = process.env.PORT || 3000;

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
app.use(session({
    name: 'server-session-cookie-id',
    secret: 'my express secret',
    saveUninitialized: true,
    reseave: true
}));

// account, could log in, but decided to focus on recipe/ingredient manipulation instead
app.post('/login', c_account.login)
app.post('/logout', c_account.logout)
app.post('/register', c_account.register)

// show recipes on home page
app.get('/allRecipes', c_rec.getAllRecipes)

// show recipes on view page
app.get('/moreRecipes', c_rec.moreRecipes)

// recipe specifics
app.get('/details/:id', c_rec.getDetails)
app.get('/editRecipe/:id', c_rec.editRecipe)
app.get('/deleteRecipe/:id', c_rec.deleteRecipe)

// add a new recipe
app.post('/addRecipe', c_rec.addRecipe)

// deciderr
app.get('/decider', function (req, res) {
    res.render("deciderr");
})
app.get('/randomizer', c_rand.randomRec)
app.get('/searchRecipe', c_rand.searchRec)


app.listen(port, function () {
    console.log("Server listening on port:" + port)
});

// "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
// i don't know if i should keep the {} or not
// "https://api.edamam.com/search?q=MYPARAM&app_id=c7d5a404&app_key=ad75f5528370554626b2478f58584991&from=0&to=3&calories=591-722&health=alcohol-free"