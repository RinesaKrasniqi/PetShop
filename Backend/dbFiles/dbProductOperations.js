var config=require('./dbConfig');
const sql=require('mssql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));


const getProduct= async()=> {
    try{
        let pool =await sql.connect(config);
        let product = pool.request().query('Select * from Products')
        console.log(product);
        return product;
    }catch(error){
        console.log(error);
    }
}

const getDog= async()=> {
    try{
        let pool =await sql.connect(config);
        let product = await pool.request().query('SELECT * FROM Products WHERE Category like \'%Dog%\'');
        console.log(product);
        return product;
    }catch(error){
        console.log(error);
    }
}

const getCat= async()=> {
    try{
        let pool =await sql.connect(config);
        let product = await pool.request().query('SELECT * FROM Products WHERE Category like \'%Cat%\'');
        console.log(product);
        return product;
    }catch(error){
        console.log(error);
    }
}

const getFish= async()=> {
    try{
        let pool =await sql.connect(config);
        let product = await pool.request().query('SELECT * FROM Products WHERE Category like \'%Fish%\'');
        console.log(product);
        return product;
    }catch(error){
        console.log(error);
    }
}

const getPony= async()=> {
    try{
        let pool =await sql.connect(config);
        let product = await pool.request().query('SELECT * FROM Products WHERE Category like \'%Pony%\'');
        console.log(product);
        return product;
    }catch(error){
        console.log(error);
    }
}

const getCart= async()=> {
    try{
        let pool =await sql.connect(config);
        let product = pool.request().query('Select * from Cart')
        console.log(product);
        return product;
    }catch(error){
        console.log(error);
    }
}

 
const delCart= async(Cart_Id)=> {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
          .input('Cart_Id', sql.VarChar, Cart_Id)
          .query('DELETE FROM Cart WHERE Cart_Id = @Cart_Id');
        return result;
      } catch (error) {
        console.error(error);
      }
}


module.exports={
    getProduct,
    getDog,
    getCat,
    getFish,
    getPony,
    getCart,
    delCart
}