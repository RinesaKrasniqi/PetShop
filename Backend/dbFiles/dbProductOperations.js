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

const delProduct= async(Product_id)=> {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
          .input('Product_id', sql.VarChar, Product_id)
          .query('DELETE FROM Products WHERE Product_id = @Product_id');
        return result;
      } catch (error) {
        console.error(error);
      }
  }
  
  const editProduct = async (Product_id) => {
    try {
      let pool = await sql.connect(config);
      let product = await pool
        .request()
        .query(`SELECT * FROM Products WHERE Product_id = ${Product_id.Product_id}`);
      console.log(product);
      return product;
    } catch (error) {
      console.log(error);
    }
  };


const updateProduct = async (Product_id,Description,Name,Price, nr_in_stock,  nr_of_stars,Price_before_discount,Category) => {
    try {
    //   console.log(AdminID + ' ' + Email + ' ' + AdminRoli);
      let pool = await sql.connect(config);
      let adminet = await pool
        .request()
        .query(
          `UPDATE Products SET Description = '${Description}' , Name = '${Name}'  ,Price = '${Price}',  nr_in_stock=${ nr_in_stock}, nr_of_stars=${nr_of_stars},Price_before_discount=${Price_before_discount},Category=${Category}
          WHERE Product_id = ${Product_id}`
        );

      console.log(adminet);
      return adminet;
    } catch (error) {
      console.log(error);
    }
  };

module.exports={
    getProduct,
    getDog,
    getCat,
    getFish,
    getPony,
    getCart,
    delCart,
    delProduct,
    editProduct,
    updateProduct
}