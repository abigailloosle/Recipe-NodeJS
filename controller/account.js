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

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    const client = new pg.Client(connectionString);
    client.connect(dbErr);
    const query = {
        text: `SELECT user_id, username, password, group_id
                FROM Users
                WHERE username = $1`,
        values: [username]
    }
    client.query(query, (err, result) => {
            if (err) {
                console.log(err.stack)
            } else {
                if (result.rows[0].password == password) {
                    req.session.user = result.rows[0].user_id
                    req.session.group = result.rows[0].group_id
                    res.status(200).send()
                } else {
                    res.status(401).send()
                }
            }
        });
}

function logout(req, res) {
    delete req.session.destroy()
}

function register(req, res) {
    let name = req.body.name;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    addNewGroup(req, res, name, username, email, password)

}

function addNewGroup(req, res, name, username, email, password) {
    const client = new pg.Client(connectionString);
    client.connect(dbErr);
    
    client.query(`INSERT INTO Groups (group_id) VALUES (DEFAULT) returning group_id`, (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
           let newGroupId = result.rows[0].id
            addNewUser(req, res, name, username, email, password, newGroupId)
        }
    });
}

function addNewUser(req, res, name, username, email, password, newGroupId) {
    const client = new pg.Client(connectionString);
    client.connect(dbErr);
    const query = {
        text: `INSERT INTO Users VALUES (DEFAULT, $1, $2, $3, $4, $5) returning user_id, group_id`,
        values: [name, username, email, password, newGroupId]
    }
    client.query(query, (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            req.session.user = result.rows[0].user_id
            req.session.group = result.rows[0].group_id

            res.render("account.ejs")
        }
    });
}

module.exports = {
    //what they call it: function name
    login: login,
    logout: logout,
    register: register
}