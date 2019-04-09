//import { url } from 'inspector';

const pg = require('pg');
const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg');

// Connect to database
function dbErr(err) {
    if (err) {
        console.log("Error connection to DB: ");
        console.log(err);
    } else {
        console.log("Successfully connected to DB");
    }
}

// `SELECT r.recipe_name, r.recipe_url, r.recipe_img, r.serving, i.ingredient_name, ir.quantity, ir.unit
//     FROM Recipe r 
//     JOIN Ingredient_Rec ir 
//         ON r.recipe_id = ir.recipe_id 
//     JOIN Ingredient i 
//         ON ir.ingredient_id = i.ingredient_id;`


// On home page load two recipes to populate the bottom
function getAllRecipes(req, res) {
    console.log('I am getting recipes');

    const client = new pg.Client(connectionString);
    client.connect(dbErr);
    client.query(`SELECT DISTINCT r.recipe_id, r.recipe_name, r.recipe_url, r.recipe_img, r.serving
                    FROM Recipe r
                    LIMIT 2;`, (err, result) => {
            if (err) {
                console.log(err.stack)
            } else {
                res.json(result.rows)
            }
        });
}

// On view page load all recipes to populate
function moreRecipes(req, res) {
    console.log('I am getting recipes');

    const client = new pg.Client(connectionString);
    client.connect(dbErr);
    client.query(`SELECT DISTINCT r.recipe_id, r.recipe_name, r.recipe_url, r.recipe_img, r.serving
                    FROM Recipe r
                    LIMIT 10`, (err, result) => {
            if (err) {
                console.log(err.stack)
            } else {
                res.json(result.rows)
            }
        });
}

// write recipe add funciton
async function addRecipe (req, res) {
    var name = req.body.name;
    var url = req.body.url;
    var image = req.body.img;
    var time = req.body.time;
    var direction = req.body.direction;
    var serve = req.body.serve;
    var ingredients = JSON.parse(req.body.ingredients);
    var rec_id;

    console.log('I am adding recipes');
    console.log("I Name" + ingredients[0].ing_name)

    const pool = new Pool({ connectionString: connectionString });

    pool.query(`INSERT INTO Recipe VALUES(DEFAULT, $1, $2, $3, $4, $5, $6) returning recipe_id;`, [name, url, image, serve, time, direction])
        .then((res) => {
            console.log("inserted a recipe" + name)
            rec_id = result.rows[0].recipe_id})
        .catch(err => console.log(err.stack)
        );

    var ings = {}

    //check if ing exsists
    for (i = 0; i < ingredients.length; i++) {
        var iname = ingredients[i].ing_name;
        var iamount = ingredients[i].ing_amount;
        var iunit = ingredients[i].ing_unit;

        console.log(iname)

        const query = {
            text: `SELECT ingredient_id, ingredient_name FROM Ingredient WHERE ingredient_name = lower($1);`,
            values: [iname]
        }
        client.query(query, await((err, result) => {
            if (err) {
                console.log(err.stack)
            } else {
                if (result.rows.length == 0) {
                    console.log("not yet created" + iname)
                    ings[iname] = null
                } else {
                    console.log("ingredient exists" + iname)
                    let i_id = result.rows[0].ingredient_id
                    ings[iname] = i_id
                }
            }
        }))
    }


    // //look for ing that need to be added
    // for(i = 0; i < ings.length; i++) {

    //     if (ings[iname] == null) {
    //         const query = {
    //             text: `INSERT INTO Ingredient VALUES(DEFAULT, $1) returning ingredient_id;`,
    //             values: [iname]
    //         }
    //         client.query(query, await ((err, result) => {
    //             if (err) {
    //                 console.log(err.stack)
    //             } else {
    //                 console.log("inserted new ing" + iname)
    //                 let i_id = result.rows[0].ingredient_id
    //                 ings[iname] = i_id
    //             }
    //         }))
    //     }
    // }


    // // insert into associative table
    // for (i = 0; i < ingredients.length; i++) {

    //     const query = {
    //         text: `INSERT INTO Ingredient_Rec VALUES (DEFAULT, $1, $2, $3, $4) returning ingredient_id;`,
    //         values: [rec_id, ings[ingredients[i].ing_name], ingredients[i].ing_amount, ingredients[i].ing_unit]
    //     }
    //     client.query(query, await ((err, result) => {
    //         if (err) {
    //             console.log(err.stack)
    //         } else {
    //             let i_id = result.rows[0].ingredient_id
    //             console.log("inserted new" + i_id)
    //         }
    //     }))
    // }
}


// // Start to add recipe
// function addRecipe(req, res) {
//     var name = req.body.name;
//     var url = req.body.url;
//     var image = req.body.img;
//     var time = req.body.time;
//     var direction = req.body.direction;
//     var serve = req.body.serve;
//     var ingredients = JSON.parse(req.body.ingredients);
//     console.log("Body" + req.body.ingredients)

//     console.log('I am adding recipes');
//     console.log("I Name" + ingredients[0].ing_name)

//     const client = new pg.Client(connectionString);
//     client.connect(dbErr);
//     const query = {
//         text: `INSERT INTO Recipe VALUES(DEFAULT, $1, $2, $3, $4, $5, $6) returning recipe_id;`,
//         values: [name, url, image, serve, time, direction]
//     }
//     client.query(query, (err, result) => {
//             if (err) {
//                 console.log(err.stack)
//             } else {
//                 console.log("inserted a recipe" + name)
//                 let rec_id = result.rows[0].recipe_id
//                 ingredientExist(rec_id, ingredients, req, res)
//             }
//         client.end();
//         })
        
// }

// function ingredientExist(rec_id, ingredients, req, res) {
//     console.log(ingredients.length + " ingredient length")


//     for (i = 0; i < ingredients.length; i++) {
//         var iname = ingredients[i].ing_name;
//         var iamount = ingredients[i].ing_amount;
//         var iunit = ingredients[i].ing_unit;

//         console.log(iname)

//         const client = new pg.Client(connectionString);
//         client.connect(dbErr);
//         const query = {
//             text: `SELECT ingredient_id, ingredient_name FROM Ingredient WHERE ingredient_name = lower($1);`,
//             values: [iname]
//         }
//         client.query(query, (err, result) => {
//             if (err) {
//                 console.log(err.stack)
//             } else {
//                 if (result.rows.length == 0) {
//                     console.log("not yet created" + iname)
//                     addIngredient(rec_id, iname, iamount, iunit, req, res);
//                 } else {
//                     console.log("ingredient exists" + iname)
//                     let i_id = result.rows[0].ingredient_id
//                     addRecAs(rec_id, i_id, iamount, iunit, req, res)
//                 }
//             }
//         })
//     }
// }

// function addIngredient(rec_id, iname, iamount, iunit, req, res) {

//     const client = new pg.Client(connectionString);
//     client.connect(dbErr);
//     const query = {
//         text: `INSERT INTO Ingredient VALUES(DEFAULT, $1) returning ingredient_id;`,
//         values: [iname]
//     }
//     client.query(query, (err, result) => {
//         if (err) {
//             console.log(err.stack)
//         } else {
//             console.log("inserted new ing" + iname)
//             let i_id = result.rows[0].ingredient_id
//             addRecAs(rec_id, i_id, iamount, iunit, req, res)
//         }
//     })
// }

// // add to asscoiated table
// function addRecAs(rec_id, i_id, iamount, iunit, req, res) {

//     const client = new pg.Client(connectionString);
//     client.connect(dbErr);
//     const query = {
//         text: `INSERT INTO Ingredient_Rec VALUES (DEFAULT, $1, $2, $3, $4);`,
//         values: [rec_id, i_id, iamount, iunit]
//     }
//     client.query(query, (err, result) => {
//         if (err) {
//             console.log(err.stack)
//         } else {
//             console.log("inserted new" + i_id)
//         }
//     })
    
// }

function getDetails(req, res) {
    let id = req.params.id;
    const client = new pg.Client(connectionString);
    console.log("Getting details: " + id)
    client.connect(dbErr);
    const query = {
        text: `select *
from recipe r join ingredient_rec ir on r.recipe_id = ir.recipe_id
join ingredient i on i.ingredient_id = ir.ingredient_id WHERE r.recipe_id = $1;`,
        values: [id]
    }
    console.log("I've queried")
    client.query(query, (err, result) => {
            if (err) {
                console.log(err.stack)
            } else {
                let recipe = result.rows;
                let params = {recipe: recipe}
                console.log(result.rows)
                res.render("details", params)
            }
        });
}

function editRecipe (req, res) {

}

function deleteRecipe(req, res) {
    let id = req.params.id;

    const client = new pg.Client(connectionString);
    console.log("Getting details: " + id)
    client.connect(dbErr);
    const query = {
        text: `DELETE FROM Recipes WHERE recipe_id = $1 CASCADE;`,
        values: [id]
    }
    console.log("I've queried")
    client.query(query, (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            let recipe = result.rows;
            let params = { recipe: recipe }
            console.log(result.rows)
            res.render("details", params)
        }
    });
}

module.exports = {
    //what they call it: function name
    getAllRecipes: getAllRecipes,
    moreRecipes: moreRecipes,
    addRecipe: addRecipe,
    getDetails: getDetails,
    editRecipe: editRecipe,
    deleteRecipe: deleteRecipe
}