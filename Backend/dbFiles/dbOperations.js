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


////////////////////////////////////////////////////////////



const getNdertesaDetails= async()=> {
  try{
      let pool =await sql.connect(config);
      let Ndertesa = pool.request().query('Select * from Ndertesa58700')
      console.log(Ndertesa);
      return Ndertesa;
  }catch(error){
      console.log(error);
  }
}

const editNdertesa = async (crud1_id) => {
  try {
    let pool = await sql.connect(config);
    let Ndertesa = await pool
      .request()
      .query(`SELECT * FROM Ndertesa58700 WHERE ndertesa_id = ${Ndertesa.ndertesa_id}`);
    console.log(Ndertesa);
    return Ndertesa;
  } catch (error) {
    console.log(error);
  }
};


const updateNdertesa = async (ndertesa_id, emertimi58700, dataPT) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input('emertimi58700', sql.NVarChar, emertimi58700)
      .input('dataPT', sql.Date, dataPT)
      .input('ndertesa_id', sql.Int, ndertesa_id)
      .query(
        'UPDATE Ndertesa58700 SET emertimi58700 = @emertimi58700, dataPT = @dataPT WHERE ndertesa_id = @ndertesa_id'
      );

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};


const delNdertesa= async(ndertesa_id)=> {
  try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('ndertesa_id', sql.VarChar, ndertesa_id)
        .query('DELETE FROM Ndertesa58700 WHERE ndertesa_id = @ndertesa_id');
      return result;
    } catch (error) {
      console.error(error);
    }
}


//CRUD 2

const getAshensoriDetails= async()=> {
  try{
      let pool =await sql.connect(config);
      let Ashensori = pool.request().query('Select * from Ashensori58700')
      console.log(Ashensori);
      return Ashensori;
  }catch(error){
      console.log(error);
  }
}

const editAshensori = async (ashensori_id) => {
  try {
    let pool = await sql.connect(config);
    let Ashensori = await pool
      .request()
      .query(`SELECT * FROM Ashensori58700 WHERE ashensori_id = ${Ashensori.ashensori_id}`);
    console.log(Ashensori);
    return Ashensori;
  } catch (error) {
    console.log(error);
  }
};


const updateAshensori = async (ashensori_id, emertimi58700, ndertesa_id) => {
  try {
    let pool = await sql.connect(config);
    const request = pool.request();
    request.input('ashensori_id', sql.Int, ashensori_id);
    request.input('emertimi58700', sql.VarChar, emertimi58700);
    request.input('ndertesa_id', sql.Int, ndertesa_id);

    const query = `
      UPDATE Ashensori58700
      SET emertimi58700 = @emertimi58700, ndertesa_id = @ndertesa_id
      WHERE ashensori_id = @ashensori_id
    `;

    const result = await request.query(query);
    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error for proper error handling
  }
};



const delAshensori= async(ashensori_id)=> {
  try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('ashensori_id', sql.VarChar, ashensori_id)
        .query('DELETE FROM Ashensori58700 WHERE ashensori_id = @ashensori_id');
      return result;
    } catch (error) {
      console.error(error);
    }
}



module.exports={
    getLoginDetails,
    updateUser,
    delUser,
    editUs,
    countClient,
    getUser,
    getStatus0,
    getStatus1,


    getNdertesaDetails,
    updateNdertesa,
    editNdertesa,
    delNdertesa,
    getAshensoriDetails,
    updateAshensori,
    editAshensori,
    delAshensori

    
}