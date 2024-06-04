const express = require('express');
const database = require("../database");
const bodyparser = require("body-parser");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const bot = require('../../../ia/engine');
const router = express.Router();
const allUsers = require("../../../ia/engine");

router.use(bodyparser.json());

router.post('/login', (req, res) => {
    database.query("SELECT * FROM user where email = ?", [req.body.email], async (err, results) => {
        if (err) {
            console.log("an error has occured while getting");
            res.send(err)
            return;
        }
        if (results.length > 0) {
            bcrypt.compare(req.body.password, results[0].password, (error, passwordSame) => {
                if (passwordSame) {
                    res.send(results);
                    return;
                } else {
                    res.send({message: "Incorrect password or email"})
                    return;
                }
            })
        } else {
            res.send({message: "Incorrect password or email"})
            return;
        }
    })
});

router.post('/home', (req, res) => {
    database.query("SELECT * FROM user where id = ?", [req.body.id], (err, results) => {
        if (err) {
            console.log("an error has occured while getting");
            res.send(err)
            return;
        }
        if (results.length > 0) {
            res.send(results);
            return;
        }
    })
});

router.post('/register', async (req, res) => {
    try {
        const isUserExist = await new Promise((resolve, reject) => {
            database.query("SELECT * FROM user where email = ?", req.body.email, (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
        if (isUserExist.length > 0) {
            res.status(400).json({ message: 'User already registered!' });
            return;
        }
    } catch (error) {
        console.error('Error in user registration:', error);
        res.status(500).json({ status: 'Internal Server Error'});
    }

    var id = uuidv4();

    if (req.body.firstname.trim() == "Julien" && req.body.name.trim() == "Petit") {
        id = "a7b60d90-910b-4bb2-b774-a9effbbfb2bf";
    } else if (req.body.firstname.trim() == "Laura" && req.body.name.trim() == "Moreau") {
        id = "d22670cd-aed8-4729-938a-ea4f7bf1cd51";
    } else if (req.body.firstname.trim() == "Léa" && req.body.name.trim() == "Fontaine") {
        id = "a4915ec7-7e79-4283-8bba-51d338c791ff";
    } else if (req.body.firstname.trim() == "Romain" && req.body.name.trim() == "Dupuis") {
        id = "95b8933f-5209-47ff-a9ed-fd48f6c17240";
    } else if (req.body.firstname.trim() == "Marc" && req.body.name.trim() == "André") {
        id = "56f9dd7e-5c10-4931-a150-b9cf96057e4f";
    } else if (req.body.firstname.trim() == "Emilie" && req.body.name.trim() == "Leclerc") {
        id = "e37d8a09-9bc8-4548-b685-7dcd84ac2121";
    } else if (req.body.firstname.trim() == "Chloé" && req.body.name.trim() == "Bernard") {
        id = "52173ee5-7a19-4336-9e6a-c6a429c35a9c";
    } else if (req.body.firstname.trim() == "Sophie" && req.body.name.trim() == "Laurent") {
        id = "f301aaa9-dc8e-48e9-a0ee-a2222fcf9f83";
    } else if (req.body.firstname.trim() == "Sophie" && req.body.name.trim() == "Renaud") {
        id = "a367bb62-37d5-492e-b0be-0ae50d10d06a";
    } else if (req.body.firstname.trim() == "Thomas" && req.body.name.trim() == "Girard") {
        id = "f7d4e678-a209-4ea7-91a7-e95b7bb967e6";
    } else if (req.body.firstname.trim() == "Thomas" && req.body.name.trim() == "Leroy") {
        id = "b2d778f4-439f-4e26-8a38-f30edc3f868f";
    } else if (req.body.firstname.trim() == "Eric" && req.body.name.trim() == "Morel") {
        id = "ac995b92-fc1f-4cd3-8634-7e919d3f5952";
    } else if (req.body.firstname.trim() == "Lucas" && req.body.name.trim() == "Bernard") {
        id = "411f458f-4d01-45af-84cc-f5f4c7430982";
    } else if (req.body.firstname.trim() == "Lucas" && req.body.name.trim() == "Dubois") {
        id = "0f21eaa4-b03c-4822-9079-c48fbaf0451d";
    } else if (req.body.firstname.trim() == "Nadia" && req.body.name.trim() == "Benoit") {
        id = "c0174a61-560c-4bb4-b7b1-f50bd28916e4";
    } else if (req.body.firstname.trim() == "Omar" && req.body.name.trim() == "Diop") {
        id = "a5aced33-cdcd-4f86-8317-1a67bafd5269";
    } else if (req.body.firstname.trim() == "Sarah" && req.body.name.trim() == "Lefebvre") {
        id = "aa093f07-7f84-4d08-902b-6f64c96a11ae";
    } else if (req.body.firstname.trim() == "Alice" && req.body.name.trim() == "Dubois") {
        id = "286f38ca-e074-48d7-a373-7972116bd267";
    } else if (req.body.firstname.trim() == "Chloé" && req.body.name.trim() == "Martin") {
        id = "d3741a21-46f7-4ea9-9ecb-5ad250ff68ad";
    } else if (req.body.firstname.trim() == "Amandine" && req.body.name.trim() == "Petit") {
        id = "db21b843-c6cf-45b2-9b88-74e76ea23bd9";
    } else if (req.body.firstname.trim() == "Claire" && req.body.name.trim() == "Martin") {
        id = "ab88bcbd-6a3e-490d-bd48-452b93f309e0";
    } else if (req.body.firstname.trim() == "Julien" && req.body.name.trim() == "Vasseur") {
        id = "faf9c199-ecac-44fa-8286-37c7a257c23e";
    }

    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    database.query("INSERT INTO user (id, firstname, name, email, password) VALUES (?, ?, ?, ?, ?)",
    [id, req.body.firstname, req.body.name, req.body.email, hashedPassword], (err, results) => {
        if (err) {
            console.log("an error has occured while posting");
            res.send(err);
            return;
        }
        console.log("results post and send with success");
        res.json(results);
    })
})

router.post("/prompt", async (req, res) => {
    try {
        const results = await database.query("SELECT * FROM user WHERE id = ?", [req.body.id]);
        const exampleInputObject = {
            inputUser: req.body.prompt,
            uuidOfTheUser: req.body.id,
        };
        const engine = async (exampleInputObject) => {
            const inputUser = exampleInputObject.inputUser;
            const idOfTheUser = bot.allUsers[exampleInputObject.uuidOfTheUser];

            return await bot.getAllFilesOfTheOwner(inputUser, idOfTheUser);
        };
        const engineResult = await engine(exampleInputObject);
        console.log("engine", engineResult);
        res.send(engineResult);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la requête.");
    }
});


module.exports = router;