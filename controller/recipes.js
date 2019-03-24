//import { url } from 'inspector';

const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

// `SELECT r.recipe_name, r.recipe_url, r.recipe_img, r.serving, i.ingredient_name, ir.quantity, ir.unit
//     FROM Recipe r 
//     JOIN Ingredient_Rec ir 
//         ON r.recipe_id = ir.recipe_id 
//     JOIN Ingredient i 
//         ON ir.ingredient_id = i.ingredient_id;`


function getAllRecipes(req, res) {
    console.log('I am getting recipes');

    const client = new pg.Client(connectionString);
    client.connect(dbErr);
    client.query(`SELECT DISTINCT r.recipe_name, r.recipe_url, r.recipe_img, r.serving
                    FROM Recipe r
                    LIMIT 2;`, (err, result) => {
            if (err) {
                console.log(err.stack)
            } else {
                res.json(result.rows)
            }
        });
}

function dbErr (err) {
    if(err) {
        console.log("Error connection to DB: ");
        console.log(err);
    } else {
        console.log("Successfully connected to DB");
    }
}

function addRecipe(req, res) {
    console.log(req)
    var name = req.body.name;
    var url = req.body.url;
    var image = req.body.img;
    //var time = req.body.time;
    var serve = req.body.serve;
    var ingredients = JSON.parse(req.body.ingredients);

    console.log('I am adding recipes');

    const client = new pg.Client(connectionString);
    client.connect(dbErr);
    const query = {
        text: `INSERT INTO Recipe VALUES(DEFAULT, $1, $2, $3, $4);`,
        values: [name, url, image, serve]
    }
    client.query(query, (err, result) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0])
            }
        });
}

// function addIngredient(req, res) {
//     for (i = 0; i < ingredients.length; i++) {
//         var ing_name = ingredients.name;
//     }
// }

module.exports = {
    //what they call it: function name
    getAllRecipes: getAllRecipes,
    addRecipe: addRecipe
}