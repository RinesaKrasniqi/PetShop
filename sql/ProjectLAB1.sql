create database ProjektiLAB1
use ProjektiLAB1

create table Client(
  Client_id int identity(1,1) primary key,
  name varchar(50) not null,
  surname varchar(50) not null,
  email varchar(50) not null,
  phone varchar(50) not null,
  password varchar(50) not null,
);
drop table Client


create table Products(
  Product_id int identity(1,1) primary key,
  Description varchar(255),
  Name varchar(50) not null,
  Price int not null,
  nr_in_stock int not null,
  nr_of_stars int not null,
  Price_before_discount int not null,
  Category varchar(50) not null,
  foto varchar(255)
);

drop table Products;

create table Category(
   Category_id int identity(1,1) not null,
   Product_id int  not null,
   Category_name varchar(50) not null,
   constraint Product_Category primary key(Category_id,Product_id),
   constraint Product_fk foreign key (Product_id) references Products(Product_id)
   on delete cascade
   on update cascade​
);

drop table Category

create table Cart(
  Cart_Id int identity(1,1) primary key,
  Description varchar(255),
  Name varchar(50),
  Price int,
  nr_in_stock int,
  nr_of_stars int,
  Price_before_discount int ,
  Category varchar(50) ,
  foto varchar(255),
  Product_id int,
  Client_id int,
  constraint client_cart foreign key (Client_id) references Client(Client_id),
  constraint Product_cart foreign key (Product_id) references Products(Product_id)

);

drop table Cart; 

create table Product_Cart(
	Product_id int not null,
	Cart_id int not null,
	constraint Product_Cart_pk primary key(Product_id,Cart_id),
	constraint Cart_fk foreign key (Cart_id) references Cart(Cart_id)
	on delete cascade
	on update cascade,
	constraint Product_id foreign key (Product_id) references Products(Product_id)
);

create table Purchase(
  Purchase_id int identity(1,1) primary key,
  Quantity int not null,
  Purchase_date date not null,
  Price decimal not null,
  City varchar(50) not null,
  Country varchar(50) not null,
  Street varchar(50) not null,
  House_number int not null,
  Admin_id int not null,
  Client_id int not null,
  Product_id int not null,
  constraint admin_fk foreign key (Admin_id) references Admin(Admin_id),
  constraint Client_Purchase_fk foreign key (Client_id) references Client(Client_id),
  constraint Product_Purchase_fk foreign key (Product_id) references Products(Product_id)

);

create table Deliveries(
  Shipping_id int identity(1,1) primary key,
  Status varchar(50) not null,
  Delivery_date date not null,
  Purchase_id int not null,
  Postman_id int not null,
  constraint Purchase_fk foreign key (Purchase_id) references Purchase(Purchase_id),
  constraint Postman_fk foreign key (Postman_id) references Postman(Postman_id)
);


/*create table Ndertesa56179(
  id int identity(1,1) primary key,
  emertim56179 varchar(255) not null,
  dataPt date 
);


create table Ashensori56179(
  ashensori_id int identity (1,1) primary key,
  emertim56179 varchar(255) not null,
  id int ,
  constraint fk_crud foreign key (id) references Ndertesa56179(id)
);


drop table Ndertesa56179; 
drop table Ashensori56179; */

insert into Admin values('admin','admin')
insert into Postman values('postman','postman', '044208318')


insert into Client values('Rinesa','Krasniqi','rinesa@gmail.com','045919115','rinesa')
insert into Client values('Margita','Rahimi','margita@gmail.com','045457596','margita')
insert into Client values('Fjolla','Krasniqi','fjolla@gmail.com','045457596','73737')
insert into Client values('Fatjona','Krasniqi','fatjona@gmail.com','045457596','99922')
insert into Client values('Albina','Rahimi','albina@gmail.com','045457596','882828')


SELECT * FROM Products WHERE Category like '%Dog%'

select * from Products

drop Database ProjektiLAB1

select * from Cart

select * from Products

delete from Products where Product_id=2