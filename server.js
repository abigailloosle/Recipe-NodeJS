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


app.post('/addRecipe', c_rec.addRecipe);

app.get('/allRecipes', c_rec.getAllRecipes);
app.get('/randomizer', c_rand.randomRec);
app.get('/searchRecipe', c_rand.searchRec);
app.post('/login', c_account.login)
app.post('/logout', c_account.logout)
app.post('/register', c_account.register)

app.get('/decider', function(req, res) {
    console.log("arriving");
    res.render("deciderr");
})

app.listen(port, function () {
    console.log("Server listening on port:" + port)
});

// "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
// i don't know if i should keep the {} or not
// "https://api.edamam.com/search?q=MYPARAM&app_id=c7d5a404&app_key=ad75f5528370554626b2478f58584991&from=0&to=3&calories=591-722&health=alcohol-free"