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
        let product = await pool.request().query('SELECT * FROM Products WHERE category_id = 2');
        console.log(product);
        return product;
    }catch(error){
        console.log(error);
    }
}

const getCat= async()=> {
    try{
        let pool =await sql.connect(config);
        let product = await pool.request().query('SELECT * FROM Products WHERE category_id = 1');
        console.log(product);
        return product;
    }catch(error){
        console.log(error);
    }
}

const getFish= async()=> {
    try{
        let pool =await sql.connect(config);
        let product = await pool.request().query('SELECT * FROM Products WHERE category_id = 4');
        console.log(product);
        return product;
    }catch(error){
        console.log(error);
    }
}

const getFleasAndTicks= async()=> {
  try{
      let pool =await sql.connect(config);
      let product = await pool.request().query('SELECT * FROM Products WHERE category_id = 5');
      console.log(product);
      return product;
  }catch(error){
      console.log(error);
  }
}

const getPony= async()=> {
    try{
        let pool =await sql.connect(config);
        let product = await pool.request().query('SELECT * FROM Products WHERE category_id= 3');
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
        WHERE client_id = @userId and C.status=0`;
          
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

  const totalPriceStatus0= async(req)=>{
    try{
      let pool = await sql.connect(config);
      const userId = req.params.Client_id;
      const query = `
      select sum(c.price* c.quantity) as TotalPrice
      from Cart c inner join Products p
      on c.Product_id=p.Product_id
      WHERE Client_id = @userId and c.status=0`;
          
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

  const editQuantity = async (Cart_Id) => {
    try {
      let pool = await sql.connect(config);
      let request = pool.request();
      request.input('Cart_Id', sql.Int, Cart_Id); 
      let cart = await request.query(`SELECT * FROM Cart WHERE Cart_Id =@Cart_id`);
      console.log(cart);
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  
  const updateQuantity = async (quantity, Cart_Id) => {
    try {
      let pool = await sql.connect(config);
      let request = pool.request();
      request.input('quantity', sql.Int, quantity);
      request.input('Cart_Id', sql.Int, Cart_Id);

      let cart = await request.query(
        `UPDATE Cart 
         SET quantity = @quantity
         WHERE Cart_id = @Cart_Id`
      );
  
      console.log(cart);
      return cart;
    } catch (error) {
      console.log(error);
      throw error; 
    }
  };
  
  const getCategory= async()=> {
    try{
        let pool =await sql.connect(config);
        let category = await pool.request().query('SELECT* FROM Category');
        console.log(category);
        return category;
    }catch(error){
        console.log(error);
    }
}


const updateStatus = async (Cart_Id) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input('Cart_Id', sql.Int, Cart_Id);

    let cart = await request.query(
      `UPDATE Cart 
       SET status = 1
       WHERE Cart_id = @Cart_Id`
    );
    console.log(cart);
    return cart;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};

const delPurchase = async (Cart_Id) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('Cart_Id', sql.Int, Cart_Id)
      .query(`DELETE FROM Cart WHERE Cart_Id = @Cart_Id`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}; 


const purchased = async () => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(`SELECT * FROM Cart WHERE status = 1 and delivered = 0`);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const editPurchase = async (Cart_id) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input('Cart_Id', sql.Int, Cart_id); 
    let cart = await request.query(`SELECT * FROM Cart WHERE Cart_Id =@Cart_id`);
    console.log(cart);
    return cart;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const updatePurchase = async (Cart_id, Description, Name, Price, quantity) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input('Cart_Id', sql.Int, Cart_id);
    request.input('Description', sql.NVarChar, Description);
    request.input('Name', sql.NVarChar, Name);
    request.input('Price', sql.Decimal, Price);
    request.input('quantity', sql.Int, quantity);

    let cart = await request.query(
     `UPDATE Cart 
      SET 
      Description = @Description, 
      Name = @Name, 
      Price = @Price, 
      quantity = @quantity 
      WHERE Cart_Id = @Cart_id`
    );

    console.log(cart);
    return cart;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};


const adminDelivered = async () => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT * FROM Cart WHERE delivered = 1 AND delivery LIKE '%On the way%'");
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



///Postman

const editDelivery = async (Cart_Id) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input('Cart_Id', sql.Int, Cart_Id); 
    let cart = await request.query(`SELECT * FROM Cart WHERE Cart_Id =@Cart_id`);
    console.log(cart);
    return cart;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const updateDelivery = async (delivery, Cart_Id) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input('delivery', sql.NVarChar, delivery);
    request.input('Cart_Id', sql.Int, Cart_Id);

    let cart = await request.query(
      `UPDATE Cart 
       SET delivery = @delivery
       WHERE Cart_id = @Cart_Id`
    );

    console.log(cart);
    return cart;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};

const postmanDelivered = async () => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT * FROM Cart WHERE delivered = 1 AND delivery LIKE '%Delivered%'");
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


//////////////////////////////////////////CRUD1

const getCrud1= async()=> {
  try{
      let pool =await sql.connect(config);
      let product = pool.request().query('Select * from team')
      console.log(product);
      return product;
  }catch(error){
      console.log(error);
  }
}

const editCrud1 = async (TeamId) => {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .query(`SELECT * FROM team WHERE TeamId = ${TeamId}`);
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};


const updateCrud1 = async (TeamId,name) => {
  try {
  //   console.log(AdminID + ' ' + Email + ' ' + AdminRoli);
    let pool = await sql.connect(config);
    let adminet = await pool
      .request()
      .query(
        `UPDATE team SET name = '${name}'  WHERE TeamId = ${TeamId}`
      );

    console.log(adminet);
    return adminet;
  } catch (error) {
    console.log(error);
  }
};

// const delSculptor= async(sculptorId)=> {
//   try {
//       let pool = await sql.connect(config);
//       let result = await pool.request()
//         .input('sculptorId', sql.VarChar, sculptorId)
//         .query('DELETE FROM ssculptor WHERE sculptorId = @sculptorId');
//       return result;
//     } catch (error) {
//       console.error(error);
//     }
// }

////////////CRUD2

const getCrud2= async()=> {
  try{
      let pool =await sql.connect(config);
      let product = pool.request().query('Select * from Player')
      console.log(product);
      return product;
  }catch(error){
      console.log(error);
  }
}

const delCrud2= async(PlayerId)=> {
  try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('PlayerId', sql.VarChar, PlayerId)
        .query('DELETE FROM player WHERE PlayerId = @PlayerId');
      return result;
    } catch (error) {
      console.error(error);
    }
}

const editCrud2 = async (sculptureId) => {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .query(`SELECT * FROM sculpture WHERE sculptureId = ${sculptureId}`);
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};


const updateCrud2 = async (sculptureId, title,material,sculptorId) => {
  try {
    let pool = await sql.connect(config);
    let adminet = await pool
      .request()
      .input('sculptureId', sql.NVarChar, sculptureId)
      .input('title', sql.NVarChar, title) 
      .input('material', sql.NVarChar, material) 
      .input('sculptorId', sql.Int, sculptorId)
      .query(
        'UPDATE sculpture SET title = @title, material = @material, sculptorId = @sculptorId WHERE sculptureId = @sculptureId'
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
    totalPrice,
    editQuantity,
    updateQuantity,
    getCategory,
    updateStatus,
    totalPriceStatus0,
    delPurchase,
    purchased,
    editPurchase,
    updatePurchase,
    adminDelivered,
    editDelivery,
    updateDelivery,
    postmanDelivered,

    getCrud1,
    editCrud1,
    updateCrud1,

    getCrud2,
    delCrud2,
    editCrud2,
    updateCrud2
}