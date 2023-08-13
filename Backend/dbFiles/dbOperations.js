var config=require('./dbConfig');
const sql=require('mssql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));


const getLoginDetails= async()=> {
    try{
        let pool =await sql.connect(config);
        let user = pool.request().query('Select * from Client')
        console.log(user);
        return user;
    }catch(error){
        console.log(error);
    }
}

const editUs = async (Client_id) => {
    try {
      let pool = await sql.connect(config);
      let user = await pool
        .request()
        .query(`SELECT * FROM Client WHERE Client_id = ${Client_id.Client_id}`);
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };


const updateUser = async (Client_id,name, surname,email,phone) => {
    try {
    //   console.log(AdminID + ' ' + Email + ' ' + AdminRoli);
      let pool = await sql.connect(config);
      let adminet = await pool
        .request()
        .query(
          `UPDATE Client SET name = '${name}' , surname = '${surname}'  ,email = '${email}', phone=${phone} WHERE Client_id = ${Client_id}`
        );

      console.log(adminet);
      return adminet;
    } catch (error) {
      console.log(error);
    }
  };

  
const delUser= async(Client_id)=> {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
          .input('Client_id', sql.VarChar, Client_id)
          .query('DELETE FROM Client WHERE Client_id = @Client_id');
        return result;
      } catch (error) {
        console.error(error);
      }
}



module.exports={
    getLoginDetails,
    updateUser,
    delUser,
    editUs
}