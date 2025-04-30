const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8000;
app.use(express.json());

const DB_FILE = 'bancoDeDados.json';

function lerBanco(callback) {
    fs.readFile(DB_FILE, 'utf-8', (err, data) => {
        if (err) return callback([]);
        try {
            callback(JSON.parse(data));
        } catch {
            callback([]);
        }
    });
}

function salvarBanco(aulas, res, callback) {
    fs.writeFile(DB_FILE, JSON.stringify(aulas, null, 2), err => {
        if (err) return res.status(500).json({ error: 'Erro ao salvar o banco de dados' });
        if (callback) callback();
    });
}

app.get('/aulas', (req, res) => {
    lerBanco(aulas => res.status(200).json(aulas));
});

app.get('/aulas/:id', (req, res) => {
    lerBanco(aulas => {
        const aula = aulas.find(a => a.id == req.params.id);
        if (aula) return res.status(200).json(aula);
        res.status(404).json({ error: 'Aula não encontrada' });
    });
});

app.post('/aulas', (req, res) => {
    lerBanco(aulas => {
        const novaAula = { ...req.body, id: aulas.length ? aulas[aulas.length - 1].id + 1 : 1 };
        aulas.push(novaAula);
        salvarBanco(aulas, res, () => res.status(201).json(novaAula));
    });
});

app.put('/aulas/:id', (req, res) => {
    lerBanco(aulas => {
        const idx = aulas.findIndex(a => a.id == req.params.id);
        if (idx === -1) return res.status(404).json({ error: 'Aula não encontrada' });
        aulas[idx] = { ...aulas[idx], ...req.body, id: aulas[idx].id };
        salvarBanco(aulas, res, () => res.status(200).json(aulas[idx]));
    });
});

app.delete('/aulas/:id', (req, res) => {
    lerBanco(aulas => {
        const idx = aulas.findIndex(a => a.id == req.params.id);
        if (idx === -1) return res.status(404).json({ error: 'Aula não encontrada' });
        aulas.splice(idx, 1);
        salvarBanco(aulas, res, () => res.status(204).send());
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ativo em: http://localhost:${PORT}`);
});




// const express = require('express');
// const fs = require('fs');

// const app = express();
// const PORT = 8000;
// app.use(express.json());

// const bancoDeDados =[]

// app.get('/aulas', (req, res) => {
//     fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
//         if(err){
//             res.status(500).json({error: 'Erro ao ler o banco de dados'});
//         }
//         res.status(200).json(JSON.parse(data));
//     });
// });

// app.get('/aulas/:id', (req, res) => {
//     const id = req.params.id;
//     fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
//         if(err){
//             res.status(500).json({error: 'Erro ao ler o banco de dados'});
//         }
//         const aulas = JSON.parse(data);
//         const aula = aulas.find(aula => aula.id == id);
//         if(aula){
//             res.status(200).json(aula);
//         }
//         res.status(404).json({error: 'Usuário não encontrado'});
//     });
// })

// app.post('/aulas', (req, res) => {
//     fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
//         if(err){
//             res.status(500).json({error: 'Erro ao ler o banco de dados'});
//         }
//         const aulas = JSON.parse(data);
//         dados['id'] = aulas.length + 1; // Mudar o método de criar IDs
//         aulas.push(dados);
//         fs.writeFile('bancoDeDados.json', aulas, (err) => {
//             if(err){
//                 res.status(500).json({error: 'Erro ao salvar o banco de dados'});
//             }
//         });
//         res.status(200).json(JSON.parse(data));
//     });
// });

// app.put('/aulas/:id', (req, res) => {
//     const id = req.params.id;
//     fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
//         if(err){
//             res.status(500).json({error: 'Erro ao ler o banco de dados'});
//         }
//         const aulas = JSON.parse(data);
//         const aulaIndex = aulas.findIndex(aula => aula.id == id);
//         if(aulaIndex !== -1){
//             const dados = req.body;
//             for(const key in dados){
//                 aulas[aulaIndex][key] = dados[key];
//             }
//             fs.writeFile('bancoDeDados.json', JSON.stringify(aulas), (err) => {
//                 if(err){
//                     res.status(500).json({error: 'Erro ao salvar o banco de dados'});
//                 }
//             });
//             res.status(200).json(aulas[aulaIndex]);
//         } else {
//             res.status(404).json({error: 'Aula não encontrado'});
//         }
//     })
// })

// app.delete('/aulas/:id', (req, res) => {
//     fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
//         if(err){
//             res.status(500).json({error: 'Erro ao ler o banco de dados'});
//         }});
//     const usuario = bancoDeDados.findIndex(aula => aula.id == id);
//     if(usuario === -1){
//         res.status(404).json({error: 'Usuário não encontrado'});
//     }
//     bancoDeDados.splice(usuario, 1);
//     res.status(204).send();
// });

// app.listen(PORT, () => {console.log(`Servidor ativo em: http://localhost:${PORT}`)});