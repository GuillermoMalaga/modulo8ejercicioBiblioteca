const {Pool}=require('pg');
require('dotenv').config();

const configuracion={
    user:process.env.PGUSER,
    host:process.env.PGHOST,
    database:process.env.PGDATABASE,
    password:process.env.PASSWORD
}

const conexion=new Pool(configuracion);

module.exports={conexion};