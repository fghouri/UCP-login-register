const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

const bcrypt = require('bcrypt');

// database
const db = require("./db_connection.js");

// User validation
const userValidation = require("./user/validation.js");

// Define a route for GET requests to the root URL
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login-page.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/login', userValidation, (req, res) => {
    const name = req.body.username;
    const pw = req.body.pw;

    sql = "SELECT * FROM users WHERE name = ?";

    const values = [name];

    db.query(sql, values, (err, result) => {
        if(err) throw err;
        
        if(result.length > 0) {
            bcrypt.compare(pw, result[0].password, (err, success) => {
                if(err) throw err;

                if(success) {
                    res.send("Logged in");
                } else {
                    res.send("Incorrect user or password.");
                }
            });
        }
        else { // doesn't exist, prompt an error.
            res.send("Incorrect user or password.");
        }
    });

});

app.post('/register', userValidation, (req, res) => {
    const name = req.body.username;
    let pw = req.body.pw;

    // encrypt password
    bcrypt.hash(pw, 10, (err, hash) => {
        if(err) throw err;
        pw = hash; // hashed successfully

        const sql = "INSERT INTO users (name, password) VALUES (?)";
        const values = [name, pw];
        db.query(sql, [values], (req, result) => {
            res.send("Account Registered!");
        });
    });
});
