var config=require('./dbConfig');
const sql=require('mssql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));


const getUser = async (req) => {
  try {
    let pool = await sql.connect(config);
    const userId = req.cookies.Client_id;

    let user = await pool.request().query(`SELECT name FROM Client WHERE Client_id = ${userId}`);
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}; 



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

const countClient = async (Client_id) => {
  try {
    await poolConnect;

    const result = await pool
      .request()
      .input('Client_id', sql.Int, Client_id)
      .query('SELECT COUNT(*) AS ClientCount FROM Client WHERE Client_id = @Client_id');

    const ClientCount = result.recordset[0].ClientCount;
    console.log('Client Count:', ClientCount);
    return ClientCount;
  } catch (error) {
    console.error('Error counting clients:', error.message);
    throw error;
  }
};
const getStatus1 = async (Client_id) => {
  try {
    let pool =await sql.connect(config);
    let cart1 = pool.request().query(`Select * from Cart where status=1 and Client_id=${Client_id}`)
    console.log(cart1);
    return cart1;
  } catch (error) {
    console.log(error);
  }
};

const getStatus0 = async (Client_id) => {
  try {
    let pool =await sql.connect(config);
    let cart0 = pool.request().query(`Select * from Cart where status=0 and Client_id=${Client_id}`)
    console.log(cart0);
    return cart0;
  } catch (error) {
    console.log(error);
  }
};


module.exports={
    getLoginDetails,
    updateUser,
    delUser,
    editUs,
    countClient,
    getUser,
    getStatus0,
    getStatus1

    
}