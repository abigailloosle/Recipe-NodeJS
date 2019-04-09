const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

function dbErr(err) {
    if (err) {
        console.log("Error connection to DB: ");
        console.log(err);
    } else {
        console.log("Successfully connected to DB");
    }
}

function randomRec (req, res) {
    console.log("randomly")
    const client = new pg.Client(connectionString);
    client.connect(dbErr);
    client.query(`SELECT r.recipe_name, r.recipe_url, r.recipe_img, r.serving
                    FROM Recipe r
                    ORDER BY random()
                    LIMIT 1;`, (err, result) => {
            if (err) {
                console.log(err.stack)
            } else {
                res.json(result.rows)
            }
        });
}


function searchRec (req, res) {
    var param = "%" + req.query.i + "%";
    console.log(param)

    console.log("ingredient")
    const client = new pg.Client(connectionString);
    client.connect(dbErr);
    const query = {
        text: `SELECT DISTINCT r.recipe_name, r.recipe_url, r.recipe_img, r.serving
                FROM Recipe r
                JOIN Ingredient_Rec ir
                ON r.recipe_id = ir.recipe_id
                JOIN Ingredient i
                ON ir.ingredient_id = i.ingredient_id
                WHERE r.recipe_name LIKE $1 OR i.ingredient_name LIKE $1
                GROUP BY r.recipe_name, r.recipe_url, r.recipe_img, r.serving`,
        values: [param]
    }
    console.log("I've queried")
    client.query(query, (err, result) => {
            if (err) {
                console.log(err.stack)
            } else {
                res.json(result.rows)
            }
        });
}

function searchTime (req, res) {

}
module.exports = {
    //what they call it: function name
    randomRec: randomRec,
    searchRec: searchRec,
    searchTime: searchTime
}