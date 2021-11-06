const express = require('express');
const app = express();
const mysql = require('mysql');
const BodyParser = require('body-parser');
const cors = require('cors');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "banco",
})

app.use(BodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());



app.post("/login", (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    db.query("SELECT * FROM adm WHERE admLogin = ? AND admPassword = ?",
        [login, password],
        (err, result) => {
            if (err) {
                req.send(err);
            } if (result.length > 0) {
                const token = jwt.sign({ Name: login }, SECRET, { expiresIn: 300 });
                return res.json(token);
            }
            else {
                res.send({ msg: 'dados incorretos!' })
            }
        })
})

app.get("/dadosAltera", (req, res) => {
    db.query("SELECT * FROM alterardado",
        (err, result) => {
            if (err) {
                res.send(err).end();
            }
            if (result) {
                db.query("SELECT * FROM clientes WHERE idclientes = ?", [result[0].idclientes], (err, result) => {
                    if (err) {
                        res.send(err).end();
                    }
                    res.send(result).end()

                })
            }
        }
    );

})
app.post("/altera", (req, res) => {
    const id = req.body.idclientes;

    db.query("INSERT INTO alterardado (idclientes) VALUES (?)", [id])
})

app.post("/apaga", (req, res) => {
    const where = req.body.where;

    db.query("DELETE FROM clientes WHERE idclientes = ?", [where]);
})

app.post("/apagaatt", (req, res) => {
    db.query("DELETE FROM alterardado ", (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result);
    })

})

app.post("/registraatt", (req, res) => {
    const idclientes = req.body.idclientes;
    const usercliente = req.body.usercliente;
    const usinaid = req.body.usinaid;
    const perctParticipacao = req.body.perctParticipacao;

    
    if (idclientes != null) {
        console.log("id", idclientes)
        console.log("diferença", idclientes != null)
        db.query("UPDATE clientes SET userclientes = ?, usinaid = ?, perctparticipacao = ? WHERE idclientes = ?", [usercliente, usinaid, perctParticipacao, idclientes], (err, result) => {
            if(err) {
                res.send(err)
            } 
            res.send(result).end();
        })
    }

})
app.post("/register", (req, res) => {
    const usercliente = req.body.usercliente;
    const usinaid = req.body.usinaid;
    const perctParticipacao = req.body.perctParticipacao;

    db.query("SELECT * FROM clientes WHERE userclientes = ?", [usercliente],
        (err, result) => {
            if (err) {
                res.send('erro 1', err);
            }
            if (result.length == 0) {


                db.query("INSERT INTO clientes (userclientes, usinaid, perctparticipacao) VALUES (?,?,?)", [usercliente, usinaid, perctParticipacao],
                    (err, result) => {
                        if (err) {
                            res.send(err)
                        }
                        res.send({ msg: "cadastro realizado com sucesso" })
                    }
                );
            }
        })

});


app.get("/dados", (req, res) => {
    db.connect(function (err) {
         if(err) {
            console.log(err)
         };
        console.log("Conectou!");
        var sql = "SELECT * FROM clientes ";
        db.query(sql, (err, result) => {
            if(err) {
                console.log(err)
            };
            res.send(result)

        })
    })
})


app.listen(3001, () => {
    console.log('servidor rodando na porta 3001....')
})