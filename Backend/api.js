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
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path=require('path');
const stripe=require('./dbFiles/stripe');

app.use(express.static('public'));
app.use('/stripe', stripe);
app.use(cookieParser());


app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000','http://localhost:5000/stripe/create-checkout-session'];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));



///////////////////////////////////////////
//User api calls
app.get('/user', (req, res) => {
  dboperations.getLoginDetails().then(result=>{
  res.send(result); 
  })
});

app.get('/userName', (req, res) => {
  dboperations.getUser(req).then(result=>{
  res.send(result); 
  })
});

app.post("/signup", async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    const { name, surname, email, phone, password } = req.body;
    const sqlQuery = "INSERT INTO Client (name, surname, email, phone, password, role_id) VALUES (@name, @surname, @email, @phone, @password, 3)";

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

    // Check if the recordset array contains at least one result
    if (result.recordset && result.recordset.length > 0) {
      
      const userId = result.recordset[0].Client_id;

      // Set cookies for authenticated user
      res.cookie('Client_id', userId, { httpOnly: true });
      res.cookie('user', 'authenticated', { httpOnly: true });

      console.log("Login successful:", result.recordset);
      res.send(result.recordset); // Send the user data back
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
  res.clearCookie('Client_id');

  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Logout successful' });
  });
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

 

app.get('/users/edit/:Client_id', (req, res) => {
  const Client_id  = req.params;
  console.log(Client_id);
  dboperations.editUs(Client_id).then(x=>{
  return res.json(x); 
  })
});

//Insert for admin
//Product apis

const multer = require('multer');
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES, 
  },
});

const fs = require('fs');

app.post('/insert', upload.single('foto'), async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    const { Description, Name, Price, nr_in_stock, nr_of_stars, Price_before_discount, category_id } = req.body;

    const imageFileName = `${Date.now()}${path.extname(req.file.originalname)}`;
    const imagePath = path.join(__dirname, '../my-app/public/Img', imageFileName);

    fs.writeFileSync(imagePath, req.file.buffer);

    const sqlQuery = "INSERT INTO Products(Description, Name, Price, nr_in_stock, nr_of_stars, Price_before_discount, foto, category_id) VALUES (@Description, @Name, @Price, @nr_in_stock, @nr_of_stars, @Price_before_discount, @foto, @category_id)";
    
    request.input('Description', sql.NVarChar, Description);
    request.input('Name', sql.NVarChar, Name);
    request.input('Price', sql.Int, Price);
    request.input('nr_in_stock', sql.Int, nr_in_stock);
    request.input('nr_of_stars', sql.Int, nr_of_stars);
    request.input('Price_before_discount', sql.Int, Price_before_discount);
    request.input('foto', sql.NVarChar, imageFileName);
    request.input('category_id', sql.INT, category_id);

    const result = await request.query(sqlQuery);
    res.json(result);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ message: "An error occurred while executing the SQL query." });
  }
});




app.get('/product', (req, res) => {
  dbProductoperations.getProduct().then(result=>{
  res.send(result); 
  console.log(result);
  })
});

app.get('/category', (req, res) => {
  dbProductoperations.getCategory()
      .then(result => {
          res.send(result);
          console.log(result);
      })
      .catch(error => {
          res.status(500).send('Error fetching categories');
          console.error(error);
      });
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

app.get('/product/fleasandticks', (req, res) => {
  dbProductoperations.getFleasAndTicks().then(result=>{
  res.send(result); 
  console.log(result);
  })
});

app.delete('/product/:Product_id', (req,res)=>{
  const {Product_id} =req.params;
  dbProductoperations.delProduct(Product_id).then(result=>{
    res.send(result);
  })

})

//product update

app.get('/products/edit/:Product_id', (req, res) => {
  const Product_id  = req.params;
  console.log(Product_id);
  dbProductoperations.editProduct(Product_id).then(x=>{
  return res.json(x); 
  })
});

app.get('/shop/:Product_id', (req, res) => {
  const Product_id  = req.params;
  console.log(Product_id);
  dbProductoperations.editShop(Product_id).then(x=>{
  return res.json(x); 
  })
});

//CART apis

app.post('/cart', async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    const { Product_id, Description, Name, Price, nr_in_stock, nr_of_stars, Price_before_discount, quantity, foto, Client_id } = req.body;

    if (quantity === null) {
      return res.status(400).json({ message: 'Quantity cannot be null.' });
    }

    const sqlQuery = 'INSERT INTO Cart (Product_id, Description, Name, Price, nr_in_stock, nr_of_stars, Price_before_discount, quantity, foto, status, delivery, Client_id) VALUES (@Product_id, @Description, @Name, @Price, @nr_in_stock, @nr_of_stars, @Price_before_discount, @quantity, @foto, 0, @delivery, @Client_id)';
    const deliveryStatus = 'On the way'; // Set the delivery status

    request.input('Product_id', sql.Int, Product_id);
    request.input('Description', sql.NVarChar, Description);
    request.input('Name', sql.NVarChar, Name);
    request.input('Price', sql.Int, Price);
    request.input('nr_in_stock', sql.Int, nr_in_stock);
    request.input('nr_of_stars', sql.Int, nr_of_stars);
    request.input('Price_before_discount', sql.Int, Price_before_discount);
    request.input('quantity', sql.Int, quantity);
    request.input('foto', sql.NVarChar, foto);
    request.input('delivery', sql.NVarChar, deliveryStatus); // Set the delivery status parameter
    request.input('Client_id', sql.Int, Client_id);
  
    const result = await request.query(sqlQuery);
    res.json(result);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ message: 'An error occurred while executing the SQL query.' });
  }
});



app.get('/carts', (req, res) => {
  dbProductoperations.cart(req).then(result => {
    res.send(result);
    // console.log(result);
  });
});

app.get('/status0/:Client_id', async (req, res) => {
  try {
    const { Client_id } = req.params;
    const cart0 = await dboperations.getStatus0(Client_id);
    res.json(cart0);
  } catch (error) {
    console.error('Error fetching status 0:', error);
    res.status(500).json({ error: 'An error occurred while fetching status 0' });
  }
});


app.get('/status1/:Client_id', async (req, res) => {
  try {
    const { Client_id } = req.params;
    const cart1 = await dboperations.getStatus1(Client_id);
    res.json(cart1);
  } catch (error) {
    console.error('Error fetching status 1:', error);
    res.status(500).json({ error: 'An error occurred while fetching status 1' });
  }
});

app.get('/purchaseProduct', async (req, res) => {
  try {
  const { Client_id } = req.query;
    console.log('Received UserId:', Client_id);

    const pool = await sql.connect(config);
    const Clientid = parseInt(Client_id, 10);
    const result = await pool.request()
      .input('Client_id', sql.Int, Clientid)
      .query(
        `UPDATE Cart
        SET status = 1
        WHERE Client_id = @Client_id`
      );

      res.redirect(`http://localhost:3000/user-purchased`);
  } catch (error) {
    console.error('Error handling success:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.delete('/cart/:Cart_Id', (req, res) => {
  const { Cart_Id } = req.params;
  dbProductoperations.delCart(Cart_Id).then(result=>{
  res.send(result);
  }) 
});  

app.get('/cartcount/:Client_id', async (req, res) => {
  try {
    const count = await dbProductoperations.countCart(req);
    res.json({ count }); // Return the count in a JSON object
  } catch (error) {
    console.error('API request failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/totalprice/:Client_id', async (req, res) => {
  try {
    const price = await dbProductoperations.totalPriceStatus0(req);
    res.json({ price }); 
  } catch (error) {
    console.error('API request failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/cart/edit/:Cart_id', async (req, res) => {
  const { Cart_id } = req.params;
  console.log(Cart_id);
  try {
    const cart = await dbProductoperations.editQuantity(Cart_id);
    return res.json(cart);
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve cart details for editing' });
  }
});



app.put('/cart/update/:Cart_id', async (req, res) => {
  const { Cart_id } = req.params;
  const { quantity } = req.body;
  
  try {
    await dbProductoperations.updateQuantity(quantity, Cart_id);
    return res.status(200).json({ message: 'Cart quantity updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update cart quantity' });
  }
});



app.put('/products/update/:Product_id', async(req, res) => {
  const  {Product_id } = req.params;
  const { Description, Name,Price,nr_in_stock, nr_of_stars, Price_before_discount, Category } = req.body;
   await dbProductoperations.updateProduct( Product_id, Description, Name, Price, nr_in_stock, nr_of_stars, Price_before_discount, Category );
});

app.delete('/cartpurchase/:Cart_Id', async (req, res) => {
  try {
    const { Cart_Id } = req.params; // Ensure the parameter name matches here
    const result = await dbProductoperations.delPurchase(Cart_Id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the purchase.' });
  }
});



//Purchase(Cart) operations

app.get('/purchased', (req, res) => {
  dbProductoperations.purchased(req).then(result => {
    console.log(result);
    res.send(result);
    // console.log(result); 
  });
}); 


app.get('/purchase/edit/:Cart_id', async (req, res) => {
  const { Cart_id } = req.params;
  console.log(Cart_id);
  try {
    const cart = await dbProductoperations.editPurchase(Cart_id);
    return res.json(cart);
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve cart details for editing' });
  }
});


app.put('/purchase/update/:Cart_id', async (req, res) => {
  const { Cart_id } = req.params;
  const { Description, Name, Price, quantity} = req.body;
  
  try {
    await dbProductoperations.updatePurchase(Cart_id, Description, Name, Price, quantity);
    return res.status(200).json({ message: 'Cart quantity updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update cart quantity' });
  }
});

app.put('/validate/:Cart_Id', async (req, res) => {
  try {
    const { Cart_Id } = req.params;
    console.log('Received Cart_Id:', Cart_Id);
    
    const pool = await sql.connect(config);
    const Cartid = parseInt(Cart_Id, 10);

    const result = await pool.request()
      .input('Cart_Id', sql.Int, Cartid)
      .input('Delivered', sql.Bit, 1) 
      .query(
        `UPDATE Cart
        SET delivered = @Delivered
        WHERE Cart_Id = @Cart_Id`
      );
    
    res.status(200).json({ message: 'Resource updated successfully' });
  } catch (error) {
    console.error('Error handling success:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


//


app.get('/adminDelivered', (req, res) => {
  dbProductoperations.adminDelivered().then(result=>{
  res.send(result); 
  console.log(result);
  })
});


//

app.get('/postmanDelivered', (req, res) => {
  dbProductoperations.postmanDelivered().then(result=>{
  res.send(result); 
  console.log(result);
  })
});

app.get('/delivery/edit/:Cart_id', async (req, res) => {
  const { Cart_id } = req.params;
  console.log(Cart_id);
  try {
    const cart = await dbProductoperations.editDelivery(Cart_id);
    return res.json(cart);
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve cart details for editing' });
  }
});


app.put('/delivery/update/:Cart_id', async (req, res) => {
  const { Cart_id } = req.params;
  const { delivery } = req.body;
  
  try {
    await dbProductoperations.updateDelivery(delivery, Cart_id);
    return res.status(200).json({ message: 'Cart quantity updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update cart quantity' });
  }
});

app.post("/insertNdertesa58700", async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    const { emertimi58700,dataPT } = req.body;
    const sqlQuery = "INSERT INTO Ndertesa58700 ( emertimi58700,dataPT) VALUES ( @emertimi58700,@dataPT)";

    request.input('emertimi58700', sql.NVarChar, emertimi58700);
    request.input('dataPT', sql.Date, dataPT);

    const result = await request.query(sqlQuery);
    res.json(result);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ message: "An error occurred while executing the SQL query." });
  }
});

////////////////////////////////



app.get('/Ndertesa58700', (req, res) => {
  dboperations.getNdertesaDetails().then(result=>{
  res.send(result); 
  console.log(result);
  })
});


// Server-side code
app.get('/Ndertesa58700/:ndertesa_id', (req, res) => {
  const ndertesa_id = req.params.ndertesa_id;
  // Use ndertesa_id to fetch the specific item from your data source
  // Replace the following line with your data retrieval logic
  const selectedNdertesa = fetchNdertesaById(ndertesa_id); // Implement this function

  if (selectedNdertesa) {
    res.json(selectedNdertesa);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});


// Edit Ndertesa route
app.get('/Ndertesa58700/edit/:ndertesa_id', (req, res) => {
  const ndertesa_id = req.params.ndertesa_id; // Correct parameter name
  console.log(ndertesa_id);
  dboperations.editNdertesa(ndertesa_id).then(x => {
    return res.json(x);
  });
});

// Update Ndertesa route
app.put('/Ndertesa58700/update/:ndertesa_id', async (req, res) => {
  const ndertesa_id = req.params.ndertesa_id; // Correct parameter name
  const { emertimi58700, dataPT } = req.body;
  await dboperations.updateNdertesa(ndertesa_id, emertimi58700, dataPT); // Include ndertesa_id
});




app.delete('/Ndertesa58700/:ndertesa_id', (req, res) => {
  const { ndertesa_id } = req.params;
  dboperations.delNdertesa(ndertesa_id).then(result => {
    res.send(result);
  });
});

/////////////////


app.post("/insertAshensori58700", async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    const { emertimi58700, ndertesa_id } = req.body;
    const sqlQuery = "INSERT INTO Ashensori58700 (emertimi58700, ndertesa_id) VALUES (@emertimi58700, @ndertesa_id)";

    request.input('emertimi58700', sql.NVarChar, emertimi58700);
    request.input('ndertesa_id', sql.Int, ndertesa_id);

    const result = await request.query(sqlQuery);
    res.json(result);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ message: "An error occurred while executing the SQL query." });
  }
});


app.get('/Ashensori58700', (req, res) => {
  dboperations.getAshensoriDetails().then(result=>{
  res.send(result); 
  console.log(result);
  })
});


app.get('/Ashensori58700/edit/:ashensori_id', (req, res) => {
  const ashensori_id  = req.params;
  console.log(ashensori_id);
  dboperations.editAshensori(ashensori_id).then(x=>{
  return res.json(x); 
  })
});


app.put('/Ashensori58700/update/:ashensori_id', async(req, res) => {
  const  {ashensori_id } = req.params;
  const { emertimi58700, ndertesa_id} = req.body;
   await dboperations.updateAshensori( ashensori_id, emertimi58700, ndertesa_id);
});

// Delete Ashensori route
app.delete('/Ashensori58700/:ashensori_id', async (req, res) => {
  const { ashensori_id } = req.params;

  try {
    // Call a function to delete the Ashensori item based on ashensori_id
    const result = await dboperations.delAshensori(ashensori_id);

    // Respond with the result or an appropriate message
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting Ashensori.' });
  }
});





app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})


app.listen(5000, () => {
    console.log("API Server is running ...");
})


