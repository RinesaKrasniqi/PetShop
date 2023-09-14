const { reset } = require('nodemon');
const dboperations = require('./dbFiles/dbOperations');
const dbProductoperations = require('./dbFiles/dbProductOperations');
var config=require('./dbFiles/dbConfig');
var Db=require('./dbFiles/dbOperations');
const express = require('express');
var cors = require('cors');
const sql=require('mssql');
var config=require('./dbFiles/dbConfig');
const app= express();
app.use(express.json());
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const session = require('express-session');

// 466d631088eab19f8c58cfe86424e1e3

app.use(session({
  secret: '466d631088eab19f8c58cfe86424e1e3', 
  resave: false,
  saveUninitialized: false,
}));

var cors = require('cors')
app.use(cors())
const { connect } = require('http2');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


app.get('/user', (req, res) => {
  dboperations.getLoginDetails().then(result=>{
  res.send(result); 
  console.log(result);
  })
});

app.post("/signup", async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    const { name, surname, email, phone, password } = req.body;
    const sqlQuery = "INSERT INTO Client (name, surname, email, phone, password) VALUES (@name, @surname, @email, @phone, @password)";

    request.input('name', sql.NVarChar, name);
    request.input('surname', sql.NVarChar, surname);
    request.input('email', sql.NVarChar, email);
    request.input('phone', sql.NVarChar, phone);
    request.input('password', sql.NVarChar, password);

    const result = await request.query(sqlQuery);
    res.json(result);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ message: "An error occurred while executing the SQL query." });
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    await sql.connect(config);
    console.log("Connection is made");

    const request = new sql.Request();
    
    const { email, password } = req.body;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const query = 'SELECT * FROM Client WHERE email = @email AND password = @password';

    console.log("Email:", trimmedEmail);
    console.log("Password:", trimmedPassword);

    request.input('email', sql.VarChar, trimmedEmail);
    request.input('password', sql.VarChar, trimmedPassword);
    const result = await request.query(query);

    console.log("Result:", result);

    if (result!== undefined && result.length > 0) {
      req.session.user = { email };
      console.log("Login successful:", result);
      res.send(result);
    } else {
      console.log("*Wrong credentials!");
      res.send({ message: "*Wrong credentials!" });
    }
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ message: "An error occurred while executing the SQL query." });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Logout successful' });
  });
});


//insert for admin

app.post("/insert", async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    const { Description, Name, Price, nr_in_stock, nr_of_stars, Price_before_discount, Category, img_src } = req.body;
    const sqlQuery = "INSERT INTO Products(Description, Name, Price, nr_in_stock, nr_of_stars, Price_before_discount, Category, img_src) VALUES (@Description, @Name, @Price, @nr_in_stock, @nr_of_stars, @Price_before_discount, @Category, @img_src)";
    
    request.input('Description', sql.NVarChar, Description);
    request.input('Name', sql.NVarChar, Name);
    request.input('Price', sql.Int, Price);
    request.input('nr_in_stock', sql.Int, nr_in_stock);
    request.input('nr_of_stars', sql.Int, nr_of_stars);
    request.input('Price_before_discount', sql.Int, Price_before_discount);
    request.input('Category', sql.NVarChar, Category);
    request.input('img_src', sql.NVarChar, img_src);

    const result = await request.query(sqlQuery);
    res.json(result);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ message: "An error occurred while executing the SQL query." });
  }
});


app.get('/users/edit/:Client_id', (req, res) => {
  const Client_id  = req.params;
  console.log(Client_id);
  dboperations.editUs(Client_id).then(x=>{
  return res.json(x); 
  })
});


app.put('/users/update/:Client_id', async(req, res) => {
  const  {Client_id } = req.params;
  const { name, surname,email,phone } = req.body;
   await dboperations.updateUser( Client_id, name, surname,email,phone);
});



app.delete('/user/:Client_id', (req, res) => {
  const { Client_id } = req.params;
  dboperations.delUser(Client_id).then(result=>{
  res.send(result);
  }) 
});



app.get('/product', (req, res) => {
  dbProductoperations.getProduct().then(result=>{
  res.send(result); 
  console.log(result);
  })
});


app.get('/product/dog', (req, res) => {
  dbProductoperations.getDog().then(result=>{
  res.send(result); 
  console.log(result);
  })
});

app.get('/product/cat', (req, res) => {
  dbProductoperations.getCat().then(result=>{
  res.send(result); 
  console.log(result);
  })
});

app.get('/product/fish', (req, res) => {
  dbProductoperations.getFish().then(result=>{
  res.send(result); 
  console.log(result);
  })
});

app.get('/product/pony', (req, res) => {
  dbProductoperations.getPony().then(result=>{
  res.send(result); 
  console.log(result);
  })
});


app.post('/cart', async (req, res) => {
  try {
    const { Product_id, Description, Name, Price, nr_in_stock, nr_of_stars, Price_before_discount, Category } = req.body;

    await sql.connect(config);
    const request = new sql.Request();

    const sqlQuery = "INSERT INTO Cart (Product_id, Description, Name, Price, nr_in_stock, nr_of_stars, Price_before_discount, Category) VALUES (@Product_id, @Description, @Name, @Price, @nr_in_stock, @nr_of_stars, @Price_before_discount, @Category)";
    request.input('Description', sql.NVarChar, Description);
    request.input('Name', sql.NVarChar, Name);
    request.input('Price', sql.Int, Price);
    request.input('nr_in_stock', sql.Int, nr_in_stock);
    request.input('nr_of_stars', sql.Int, nr_of_stars);
    request.input('Price_before_discount', sql.Int, Price_before_discount);
    request.input('Category', sql.NVarChar, Category);
    request.input('Product_id', sql.Int, Product_id);

    const result = await request.query(sqlQuery);
    res.json(result);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ message: "An error occurred while executing the SQL query." });
  }
});

app.get('/cart', async (req, res) => {
  dbProductoperations.getCart().then(result=>{
    res.send(result); 
    console.log(result);
    })
});

app.delete('/cart/:Cart_Id', (req, res) => {
  const { Cart_Id } = req.params;
  dbProductoperations.delCart(Cart_Id).then(result=>{
  res.send(result);
  }) 
});


app.delete('/product/:Product_id', (req, res) => {
  const { Product_id } = req.params;
  dbProductoperations.delProduct(Product_id).then(result=>{
  res.send(result);
  }) 
});

app.get('/products/edit/:Product_id', (req, res) => {
  const Product_id  = req.params;
  console.log(Product_id);
  dbProductoperations.editProduct(Product_id).then(x=>{
  return res.json(x); 
  })
});

app.put('/products/update/:Product_id', async(req, res) => {
  const  {Product_id } = req.params;
  const { Description, Name,Price,nr_in_stock, nr_of_stars, Price_before_discount, Category} = req.body;
   await dbProductoperations.updateProduct( Product_id, Description, Name,Price,nr_in_stock, nr_of_stars, Price_before_discount, Category);
});

app.listen(5000, () => {
    console.log("API Server is running ...");
})
