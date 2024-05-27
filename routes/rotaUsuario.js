const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
db.run(`CREATE TABLE IF NOT EXISTS 
         usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            nome TEXT, 
            email TEXT, 
            senha TEXT)
            `, (createTableError) => {
    if (createTableError) {
        return res.status(500).send({
            error: createTableError.message
        });
    }
});


//consultar todos os dados
router.get("/",(req,res,next)=>{
    db.all('SELECT * FROM usuario', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está a lista de todos os Usuarios",
            usuarios: rows
        });
    });
})
router.get("/login",(req,res,next)=>{
    const {email,senha} = req.body;
    db.get('SELECT * FROM usuario where email=? and senha=?',[email,senha], (error, rows) => {
        if (error) {
            return res.status(500).send(
                {
                error: error.message,
                
                }
            );
        }

        res.status(200).send(
            {
            mensagem: "Usuário logado com sucesso!!!",
            usuarios: rows
        }
        );
    });
})
//consultar apenas um usuario pelo id
router.get("/:id",(req,res,next)=>{
    const {id} = req.params;
    db.get('SELECT * FROM usuario where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está o cadastro do Usuario",
            usuario: rows
        });
    });
})

// aqui salvamos dados do usuário
router.post("/",(req,res,next)=>{
    const { nome, email, senha } = req.body;
   db.serialize(() => {
        const insertUsuario = db.prepare(`
        INSERT INTO usuario(nome, email, senha) VALUES(?,?,?)`);
        insertUsuario.run(nome, email, senha);
        insertUsuario.finalize();
    });
    process.on("SIGINT", () => {
        db.close((err) => {
            if (err) {
                return res.status(304).send(err.message);
            }
        });
    });

    res.status(200)
    .send({ mensagem: "Usuário salvo com sucesso!" });
});

// aqui podemos alterar dados do usuário
router.put("/",(req,res,next)=>{
    const {id,nome,email,senha} = req.body;
                db.run(`UPDATE usuario SET 
                            nome=?,
                            email=?,
                            senha=?  
            where id=?`,[nome,email,senha,id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }
        res.status(200).send(
            { mensagem: "Usuário de id: "+id+" dados alterados com sucesso!" 
            });
    });
});
 // Aqui podemos deletar o cadastro de um usuário por meio do id
router.delete("/:id",(req,res,next)=>{
    const {id} = req.params
    db.run('DELETE FROM usuario where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }
        res.status(200).send(
            { mensagem: "Usuário de id: "+id+" deletado com sucesso!" 
            });
    });


});
module.exports = router;