create database ProjektiLAB1
use ProjektiLAB1


create table Role(
 role_id int primary key,
 role_name varchar(255) not null

);

insert into Role values(1, 'Administrator');
insert into Role values(2, 'Postman');
insert into Role values(3, 'normal user');

select* from Role

drop table Role


CREATE TABLE Client (
  Client_id int identity(1,1) primary key,
  name varchar(50) not null,
  surname varchar(50) not null,
  email varchar(50) not null,
  phone varchar(50) not null,
  password varchar(50) not null,
  role_id int not null,
  constraint role_fk foreign key (role_id) references Role(role_id)
);



select* from client


INSERT INTO Client (name, surname, email, phone, password, role_id) VALUES ('Margita', 'Rahimi', 'margita@gmail.com', '045457596', 'margita', 3);
INSERT INTO Client VALUES ('hello', 'hello', 'hello@gmail.com', '045457596', 'hello', 3);
INSERT INTO Client VALUES  ('admin', 'admin', 'admin@gmail.com', '044208318', 'admin', 1);
INSERT INTO Client VALUES  ('postman', 'postman', 'postman@gmail.com', '044340801', 'postman', 2);

SELECT * FROM Client;

drop table Client

SELECT cl.*, rl.*
FROM Client cl
INNER JOIN Role rl ON cl.role_id = rl.role_id;


CREATE TABLE Category (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

insert into Category values(1, 'cat');
insert into Category values(2, 'dog');
insert into Category values(3, 'pony');
insert into Category values(4, 'fish');
insert into Category values(5, 'fleas and ticks');

select* from Category

drop table Category


CREATE TABLE Products(
  Product_id int identity(1,1) primary key,
  Description varchar(255),
  Name varchar(50) not null,
  Price int not null,
  nr_in_stock int not null,
  nr_of_stars int not null,
  Price_before_discount int not null,
  foto varchar(255),
  category_id INT,
  constraint FK_Category foreign key (category_id) references Category(category_id)
);

select* from Products

drop table Products

CREATE TABLE Cart(
  Cart_Id int identity(1,1) primary key,
  Description varchar(255),
  Name varchar(50),
  Price int,
  nr_in_stock int,
  nr_of_stars int,  
  Price_before_discount int,
  quantity int not null,
  foto varchar(255),
  status BIT,
  delivery varchar(255) not null,
  Product_id int,
  Client_id int,
  constraint client_cart foreign key (Client_id) references Client(Client_id),
  constraint Product_cart foreign key (Product_id) references Products(Product_id)
);

DELETE FROM Cart WHERE Client_id =3 and Cart_id=1;

select* from cart

select* from Client

drop table cart

ALTER TABLE Cart
ADD CONSTRAINT DF_Cart_Status DEFAULT 0 FOR status;

Select * from Cart where status=1

select* from Cart


Select * from Cart where CART_ID=3

DELETE FROM Cart WHERE Cart_Id = 2


SELECT COUNT(*) AS ProductCount
        FROM Cart C 
        WHERE client_id = 6 and C.status=0;


select sum(c.price* c.quantity) as TotalPrice
      from Cart c inner join Products p
      on c.Product_id=p.Product_id
      WHERE Client_id = 1 and c.status=0;

SELECT* 
FROM Cart where
status=1 and Client_id=1;

SELECT* 
FROM Cart where
status=1 and Client_id=6;


UPDATE Cart
        SET status = 1
        WHERE Client_id = 1;


SELECT p.Product_id, p.Name, c.Cart_Id, cg.category_name
FROM Cart c
INNER JOIN Products p ON c.product_id = p.Product_id
inner join Category cg on p.category_id=cg.category_id;



create table Deliveries(
  Shipping_id int identity(1,1) primary key,
  Status varchar(50) not null,
  Delivery_date date not null,
  Purchase_id int not null,
  Postman_id int not null,
  constraint Purchase_fk foreign key (Purchase_id) references Purchase(Purchase_id),
  constraint Postman_fk foreign key (Postman_id) references Postman(Postman_id)
);


select* from CLIENT WHERE client_id=1;

select cl.name,cl.surname, c.name
from cart c inner join Client cl
on c.client_id=cl.client_id
where cl.client_id=1 and c.nr_in_stock=15



insert into Products values('Dry Kitten Food','Kit Cat No Grain Kitten',30,50,5,26, '1695591325634.jpg', 1);
insert into Products values('Canned Cat Food', 'Canagan Tuna', 9,40,3,11, '1695591562281.jpg', 1);
insert into Products values('Omega 3 Freeze-Dried Cat Treats', 'Marly and Dan Booster',14,16,4,18, '1695591845820.jpg', 1);
insert into Products values('Cat Feeding Bowls', 'Pado Glass', 36,35,5,40, '1695592157246.jpg', 1);
insert into Products values('Clumping Cat Litter Lemon', 'Cool & Clean', 22,12,5,25, '1695592539138.jpg', 1);
insert into Products values('Cat Scratching Pole', 'Fauna Sagrada', 60 , 40 , 4 , 65 , '1695592741686.jpg', 1);
insert into Products values('Assorted Cat Toys', 'All for Paws Tinkly Twins', 12 , 90 , 5 , 15 , '1695593070486.jpg', 1);
insert into Products values('Jellyfish with Activated LED Light', 'GiGwi Shining Friends', 31 , 22 , 4 , 39 , '1695593283496.jpg', 1);
insert into Products values('Care4Life', '15 Kg Pavo', 127, 35, 4, 130, '1695593510508.png', 3);
insert into Products values('The delicious warm treat', 'Pavo SlobberMash', 104 , 40 , 5 , 110 , '1695593687135.jpg', 3);
insert into Products values('Germicidal Treatment Shampoo', 'F10', 81 , 50 , 3 , 85 , '1695593804625.jpg', 3);
insert into Products values('Condition, 20kg ', 'Pavo', 90 , 40 , 5 , 95 , '1695593941874.jpg', 3);
insert into Products values('Silver Toning Horse Shampoo', 'Galloping Goop Hi-Ho', 82 , 22 , 3 , 85 , '1695594114035.jpg', 3);
insert into Products values('Silver Toning Horse Conditioner', 'Galloping Goop Hi-Ho', 89 , 35 , 5 , 95 , '1695594338230.jpg', 3);
insert into Products values('Food for pony & horse', 'Goop Hi-Ho', 55 , 10 , 5 , 59 , '1695594440426.jpg', 3);
insert into Products values('Percuro Insect Protein Adult', 'Insect Protein', 11 , 15 , 4 , 12 , '1695592140225.jpg.jpg', 2);
insert into Products values('Dry Dog Food', 'Ultimates Chicken', 15 , 8 , 5 , 17 , '1695592311181.jpg', 2);
insert into Products values('Harringtons Rich in Salmon', 'Salmon', 21 , 8 , 4 , 21 , '1695592405958.jpg', 2);
insert into Products values('All For Paws Chill Out', 'Dog Bowl', 11 , 15 , 4 , 12 , '1695592525961.jpg', 2);
insert into Products values('Petkit Eversweet', 'Water Bottle ', 23 , 8 , 5 , 30 , '1695592618009.jpg', 2);
insert into Products values('Dog Supplements ', 'Biotin Jar ', 19 , 15 , 2 , 20 , '1695592746696.jpg', 2);
insert into Products values('Plus Melatonin ', 'Quiet Moments', 32 , 20 , 3 , 35 , '1695592881226.jpg', 2);
insert into Products values('Dental Chew for Dog ', 'Happi Doggy', 35 , 10 , 4 , 37 , '1695592993061.jpg', 2);
insert into Products values(' 1 Tablet', 'Prodac Holiday Food ', 5 , 40 , 4 , 7 , '1695593437895.jpg', 4);
insert into Products values('Aquarium Decoration' , 'Karis Tree ', 10 , 20 , 3 , 12 , '1695593538789.jpg', 4);
insert into Products values('70 LED - White', 'Juwel Primo', 19 , 15 , 5 , 21 , '1695593634780.jpg', 4);
insert into Products values('Bacterial infenctions', 'API Marine', 5 , 8 , 2 , 10 , '1695593762036.jpg', 4);
insert into Products values('Aqua Soil Powder', 'Amazonia Light', 19 , 8 , 1 , 21, '1695593886274.jpg', 4);
insert into Products values('Staple Fish Food', 'NovoTom Artemia', 25 , 15 , 5 , 30 , '1695593970435.jpg', 4);
insert into Products values('Padovan Aqua', 'Gold Fish Food', 19 , 15 , 5 , 21 , '1695594122705.jpg', 4);
insert into Products values('Tropiclean Flea ', 'Pet Powder ', 19 , 30 , 5 , 21 , '1695594352227.jpg', 5);
insert into Products values('Lice Comb', 'Trixie Flea ', 10 , 15 , 4 , 12 , '1695594416886.jpg', 5);
insert into Products values('Vet’s Best Natural', 'Tick Home Spray', 5 , 8 , 5 , 7 , '1695594497213.jpg', 5);
insert into Products values('Combo Cat', 'Frontline', 10 , 15 , 5 , 12 , '1695594552927.jpg', 5);



//
create table Sculptor(
 SculptorId int identity(1,1) primary key ,
 Name varchar(255) not null,
 BirthYear int not null,
 isDeleted BIT not null

);

ADD CONSTRAINT DF_Sculptor_isDeleted DEFAULT 0 FOR isDeleted;


















drop database ProjektiLAB1