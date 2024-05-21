const express = require('express')
const app = express();
const cep =[
    {
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
  },
  {
    "cep": "77814-790",
    "logradouro": "Rua 20",
    "complemento": "",
    "bairro": "Loteamento Monte Sinai",
    "localidade": "Araguaína",
    "uf": "TO",
    "ibge": "1702109",
    "gia": "",
    "ddd": "63",
    "siafi": "9241"
  },
  {
    "cep": "77825-769",
    "logradouro": "Rua dos Avelos",
    "complemento": "",
    "bairro": "Residencial Topázio",
    "localidade": "Araguaína",
    "uf": "TO",
    "ibge": "1702109",
    "gia": "",
    "ddd": "63",
    "siafi": "9241"
  }
]
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
app.use("/cep/:valor",(req, res, next)=>{
    const valor=req.params.valor
    const cepfiltrado = cep.filter(linha=>{
       if(linha.cep===valor)
       { return linha}
    })
    res.send(cepfiltrado)
})
// https://viacep.com.br/ws/01001000/json/
    app.use("/viacep/:valor",(req, res, next)=>{
        const valor=req.params.valor;
    fetch("https://viacep.com.br/ws/"
                    +valor+"/json")
                    .then(resposta=>
                        
                            resposta.json()
                            //"cep,logradouro, localidade"                                
                    ).then(data=>{
                        const dados={
                            cep:data.cep,
                            logradouro:data.logradouro,
                            localidade:data.localidade
                        }
                        res.send(dados)
                    })
    })

const alunos=[
    "ana silva",
    "carlos silva"
]
alunos[1]
const mat={'idaluno':'1','idcurso':'3'}
const matricula=[
    {'idaluno':'1','idcurso':'3'},
    {"idaluno":'3', "idcurso:":"5"}
]

app.use("/soma",(req, res, next)=>{
    let total=0;
    
   for(i=0;   i<usuario.length;   i++)
   {
     total=total+parseInt(usuario[i].idade)
   }
    res.send("Soma total: "+total);
})
module.exports = app