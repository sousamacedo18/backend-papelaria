const express = require("express");
const router = express.Router();
const usuarios=["joao", "pedro"]
const usuario=[
{
    id:1,
    nome:"Joao"
},
{
    id:2,
    nome:"pedro"
},
]
//consultar todos os dados
router.get("/",(req,res,next)=>{
 const resultado =    
            {
                mensagem:"lista de usuários",
                usuarios:usuario
            }
//quero apresentar o nome do joão
res.send()
})

// aqui salvamos dados do usuário
router.post("/",(req,res,next)=>{

 
});

// aqui podemos alterar dados do usuário
router.put("/",(req,res,next)=>{

});
 // Aqui podemos deletar o cadastro de um usuário por meio do id
router.delete("/:id",(req,res,next)=>{

});
module.exports = router;