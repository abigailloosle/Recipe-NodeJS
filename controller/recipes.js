const pg = require('pg');
const connectionString = process.env.DATABASE_URL;


function getAllRecipes(req, res) {
    console.log('I am getting recipes');

    const client = new pg.Client(connectionString);
    client.connect(dbErr);
    client.query(`SELECT * FROM Recipe r 
    JOIN Ingredient_Rec ir 
        ON r.recipe_id = ir.recipe_id 
    JOIN Ingredient i 
        ON ir.ingredient_id = i.ingredient_id;`, (err, result) => {
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


module.exports = {
    //what they call it: function name
    getAllRecipes: getAllRecipes
}