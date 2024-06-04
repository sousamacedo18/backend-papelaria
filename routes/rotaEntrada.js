const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
db.run(`CREATE TABLE IF NOT EXISTS 
         entrada (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            id_produto int, 
            quantidade Real, 
            valor_unitario Real,
            data_entrada Date
            )
            `, (createTableError) => {
    if (createTableError) {
        return res.status(500).send({
            error: createTableError.message
        });
    }
});


//consultar todos os dados
router.get("/",(req,res,next)=>{
db.all('SELECT * FROM entrada', (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está a lista de todass as Entradas",
            produtos: rows
        });
    });
})

//consultar apenas uma entrada pelo id
router.get("/:id",(req,res,next)=>{
    const {id} = req.params;
    db.get('SELECT * FROM entrada where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        res.status(200).send({
            mensagem: "Aqui está o cadastro da Entrada",
            produto: rows
        });
    });
})

// aqui salvamos dados da entrada
router.post("/",(req,res,next)=>{
    const { id_produto, quantidade, valor_unitario, data_entrada }
     = req.body;
   db.serialize(() => {
        const insertEntrada = db.prepare(`
        INSERT INTO entrada(id_produto, quantidade, valor_unitario,data_entrada) 
        VALUES(?,?,?,?)`);
        insertEntrada.run(id_produto, quantidade, valor_unitario,data_entrada);
        insertEntrada.finalize();
    });
    process.on("SIGINT", () => {
        db.close((err) => {
            if (err) {
                return res.status(304).send(err.message);
            }
        });
    });

    res.status(200)
    .send({ mensagem: "Entrada salvo com sucesso!" });
});

// aqui podemos alterar dados da entrada
router.put("/",(req,res,next)=>{
    const {id,id_produto, quantidade, valor_unitario,data_entrada} = req.body;
                db.run(`UPDATE entrada SET 
                            id_produto=?,
                            quantidade=?,
                            valor_unitario=?,
                            data_entrada=?  
            where id=?`,[id_produto,quantidade,valor_unitario,data_entrada,id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }
        res.status(200).send(
            { mensagem: "Dados da Entrada salvos com sucesso!" 
            });
    });
});
 // Aqui podemos deletar o cadastro de um usuário por meio do id
router.delete("/:id",(req,res,next)=>{
    const {id} = req.params
    db.run('DELETE FROM entrada where id=?',[id], (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }
        res.status(200).send(
            { mensagem: "Entrada deletada com sucesso!" 
            });
    });


});
module.exports = router;