const express =require('express') //importar modulo express do npm

const app = express() //inicializa o servidor express e salva ma variavel app 
const PORT = 8000//separa uma porta para rodar o servidor

const bancoDeDados = [
    {
        id: 1,
        titulo: "desenvolvimento de sistemas",
        curso:"tecnico em desenvolvimento",
        turma: "3b",
        professor: "Ramon",
    }
]
// criar as minhas rotas 
app.get('/aulas', (req, res) => {
    res.status(200).send(bancoDeDados)
    }) 

app.get('/aulas/:id', (req,res) =>{
    console.log(req.params.id)
    //fazer uma busca no arrey bancoDeDados,pelo id recebido
    res.send('qualquercoisa')
})

app.post('/aulas', (req,res) => {
        const dados =req.body
        dados['id'] = bancoDeDados.length +1
        bancoDeDados.push(dados)
        res.status(201).send(dados)
    })

app.listen(PORT, () => {console.log('servidor online')}) //botar o servidor para ouvir 

app.get('/aulas', (req,res) => {res.send('aulas de desenvolvimento da 3b')})
app.post('/aulas', (req,res) => {res.send('criando uma aula')})


app.listen(PORT, () => {console.log('servidor online')}) //bota o servidor para ouvir requisitos