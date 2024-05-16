const express = require('express')
const app = express();
const cep ={
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP",
    "ibge": "3550308",
    "gia": "1004",
    "ddd": "11",
    "siafi": "7107"
  }
const usuario=[
    {nome:'carlos', idade:'20',peso:'100'},
    {nome:'pedro', idade:'30'},
    {nome: 'joao', idade: '18', peso: '75', cep: '77807060'}
]
app.use("/todos",(req, res, next)=>{
    res.send(usuario)
})
app.use("/nome",(req, res, next)=>{
    res.send(usuario[1].nome)
})
app.use("/cep",(req, res, next)=>{
    res.send(cep)
})
app.use("/soma",(req, res, next)=>{
    let total=0;
    
   for(i=0;   i<usuario.length;   i++)
   {
     total=total+parseInt(usuario[i].idade)
   }
    res.send("Soma total: "+total);
})
module.exports = app