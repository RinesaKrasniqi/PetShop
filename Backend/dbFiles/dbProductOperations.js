var config=require('./dbConfig');
const sql=require('mssql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


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

const getFleasAndTicks= async()=> {
  try{
      let pool =await sql.connect(config);
      let product = await pool.request().query('SELECT * FROM Products WHERE Category like \'%fleas%\'');
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


const cart = async (req) => {
  try {
    let pool = await sql.connect(config);
    const userId = req.cookies.Client_id;

    let user = await pool.request().query(`SELECT * FROM Cart WHERE Client_id = ${userId}`);
    // console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

 
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

  const editShop = async (Product_id) => {
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

  

  const countProducts = async (Product_id) => {
    try {
      let pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('Product_id', sql.Int, Product_id) // Use parameterized query
        .query('SELECT COUNT(*) AS ProductCount FROM Products WHERE Product_id = @Product_id');
  
      const productCount = result.recordset[0].ProductCount;
      console.log('Product Count:', productCount);
      return productCount;
    } catch (error) {
      console.log(error);
    }
  };
  

  const countCart = async (req) => {
    try {
      let pool = await sql.connect(config);
      const userId = req.params.Client_id;
      const query = `
        SELECT COUNT(*) AS ProductCount
        FROM Cart C 
        WHERE client_id = @userId`;
          
      let request = pool.request();
      request.input('userId', userId);
  
      let result = await request.query(query);
  
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  const totalPrice= async(req)=>{
    try{
      let pool = await sql.connect(config);
      const userId = req.params.Client_id;
      const query = `
      select sum(c.price* c.quantity) as TotalPrice
      from Cart c inner join Products p
      on c.Product_id=p.Product_id
      WHERE Client_id = @userId`;
          
      let request = pool.request();
      request.input('userId', userId);
  
      let result = await request.query(query);
      console.log("Total price",result);
  
      return result;


    }catch(error){
      console.log(error);
      throw error;
    }
  }
  



  const updateProduct = async (Product_id, Description, Name, Price, nr_in_stock, nr_of_stars, Price_before_discount, Category) => {
    try {
      let pool = await sql.connect(config);
      let adminet = await pool
        .request()
        .input('Description', sql.NVarChar, Description)
        .input('Name', sql.NVarChar, Name)
        .input('Price', sql.Decimal, Price)
        .input('nr_in_stock', sql.Int, nr_in_stock)
        .input('nr_of_stars', sql.Decimal, nr_of_stars)
        .input('Price_before_discount', sql.Decimal, Price_before_discount)
        .input('Category', sql.NVarChar, Category)
        .input('Product_id', sql.Int, Product_id)
        .query(
          `UPDATE Products 
           SET Description = @Description, 
               Name = @Name, 
               Price = @Price, 
               nr_in_stock = @nr_in_stock, 
               nr_of_stars = @nr_of_stars, 
               Price_before_discount = @Price_before_discount, 
               Category = @Category 
           WHERE Product_id = @Product_id`
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
    delCart,
    delProduct,
    editProduct,
    updateProduct,
    getFleasAndTicks,
    cart,
    editShop,
    countCart,
    totalPrice
}