const express=require('express');
const { conexion } = require('./bd');
const app=new express();
const fs=require('fs');
//const {coexion}=require("./db");

app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views",__dirname+"/views");


app.get('/', (req, res) => {
  res.render('index');
})


app.get('/galeria', async (req, res) => {
  let consulta= 'select l."Id", l."Nombre" AS "Libro",a."Nombre" as "Autor",l."Edicion" from "Libros" l'
  consulta += ' JOIN "Autores" a ON l."IdAutor"=a."Id" '
  let resultado;
  try{
    resultado = await conexion.query(consulta);
  }catch(err){
    console.log("Error em consulta:" + err.message);
    res.status(500);
    res.json({mensaje:"Error al buscar datos"})
  }  
  //revisar si existe una foto asociada a cada libro, si no lo hay asociados la foto noimg
  let libros=resultado.rows;
  const listaArchivos=fs.readdirSync("public/img");
  //console.log(listaArchivos);
   libros.forEach(async l => {
      let archivo=listaArchivos.filter(a=>
        a.split(".")[0]==l.Id
      )

      if(archivo.length==0){
        l.ruta="img/noimg.jpg";
      }else{
        l.ruta="img/"+archivo[0];
      }
   });

    console.log(libros);
  res.render('galeria',{libros:libros});
});


app.get('/contacto', (req, res) => {
  res.render('contacto');
})


module.exports={app}