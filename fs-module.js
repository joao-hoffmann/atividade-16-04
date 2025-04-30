// const fs = require('fs')

// //ler arquivo 
// console.log('antes')
// try{
// const data = fs.readFile('path/to/file.txt', 'utf8')
//     console.log(data)
// }catch (e) {
//     console.log(e)
// }
// console.log('depois')
const texto = 'teste 12354'

FileSystem.witeFile('testo.txt', texto,(err) => {
    console.log(err)
})