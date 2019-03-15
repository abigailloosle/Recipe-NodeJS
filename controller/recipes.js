const pg = require('pg');
const connectionString = process.env.DATABASE_URL;


function getAllRecipes(req, res) {
    console.log('I am getting recipes');

    const client = new pg.Client(connectionString);
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

module.exports = {
    //what they call it: function name
    getAllRecipes: getAllRecipes
}