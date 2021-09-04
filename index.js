const http = require('http');
const path = require('path');
const fs = require('fs');

const serwer = http.createServer((req, res) => {
  // if (req.url=="/"){
  //   fs.readFile(path.join(__dirname,"publiczny",'index.html'),(err,content)=>{
  //   if (err) throw err
  //   res.writeHead(200,{'Content-Type':'text/html'})
  //   res.end(content)
  // })
  // }
  // if (req.url=="/abaut"){
  //   fs.readFile(path.join(__dirname,"publiczny",'abaut.html'),(err,content)=>{
  //   if (err) throw err
  //   res.writeHead(200,{'Content-Type':'text/html'})
  //   res.end(content)
  // })  
  // }
  // if (req.url =='/api/user'){
  //   const user=[
  //     {name:"Piter Jak", age:40},
  //     {name:"Anna Jak", age:35}
  //   ]
  //   res.writeHead(200,{'Content-Type':'application/json'})
  //   res.end(JSON.stringify(user))
  //   }


  // budowa ściezki 
  let filePath = path.join(__dirname, "publiczny", req.url === '/' ? "index.html" : req.url)

  // jaki to plik
  let extname = path.extname(filePath)


  // pierwotny  kontent
  let contentType = 'text/html'

  //sprawdzic ext i ustawić kontent
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = '.image/jpg';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {

        //strona znie znaleziona
        fs.readFile(path.join(__dirname, "publiczny", '404.html'), (err, content) => {
          if (err) throw err
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(content, 'utf8')
        })
      }
      else {
        if (err) throw err
        res.writeHead(500)
        res.end(`Serwer error : ${err.code}`)
      }
    }
    else {
      if (err) throw err
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content, 'utf8')
    }


  });
})

const PORT = process.env.PORT 

serwer.listen(PORT, () => console.log(`Serwer używa  port ${PORT}`))