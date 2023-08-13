import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import {Fade,Zoom,Slide} from 'react-slideshow-image';
//import HeroSlider, {Slide} from  'hero-slider';
import  Header from '../Components/header.js';
import  Footer from '../Components/footer.js';
import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './homecss.css';

const slideImages = [{
    url: './Img/food.jpg'
},
{
    url: './Img/toys.jpg'
},
{
    url: './Img/treat.jpg'
},
{
    url: './Img/accessories.jpg'
},
];
const divStyle = {
     display: 'flex',
     alignItems: "center",
     justifyContent: "center",
     height: "390px",
     backgroundSize: "cover",
}


const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

function Home() {
 return ( 
    <div>
      <div>
       <Header/>
      </div>

      <div className='slide-container'>
         <Fade>
             {slideImages.map((image,index) => (
                <div key={index}>
                    <div style={{...divStyle, backgroundImage:`url(${image.url})`}}></div>
                </div>
             ))}
         </Fade>
      </div>
      
      <div className='text-container'>

        <div className='food-container'>
            <h4 className='food-h4'>
                <i className='h4-i'>Natural</i><br></br>FOOD
            </h4>
            <div className='divider'></div>
            <p className='food-p'>We understand that a healthy diet is crucial for your pet's well-being. 
           That's why we offer a wide selection of high-quality pet foods from top brands. 
        Whether your pet needs dry food, wet food, or specialty diets, we have something to
                       meet their unique nutritional needs.
            </p>
        </div>

        <div className='toys-container'>
            <h4 className='toys-h4'>
                <i className='h4-ii'>Recommended</i><br></br>Toys
            </h4>
            <div className='divider'></div>
            <p className='toyes-p'>Pets love to play and we have a great selection of toys to keep them entertained. 
                From squeaky toys to interactive puzzles, we have something for every type of pet.
             Our toys are made from safe and durable materials that can withstand even the toughest chewers.</p>
        </div>

        <div className='accessories-container'>
            <h4 className='accessories-h4'>
                <i className='h4-iii'>Required</i><br></br>Accessories
            </h4>
            <div className='divider'></div>
            <p className='accessories-p'>We know that pets are part of the family, and we offer a variety of accessories 
                  to make their lives more comfortable. From cozy beds to stylish collars 
                and leashes, we have everything you need to keep your pet happy and stylish.</p>
        </div>
      </div>


      <div className='second-container'>

        <div className='food-img-container'><img src='./Img/food-back.png' className='food-back'></img></div>

        <div className='food-info-container'>
            <h4 className='food-h4-conatiner'>GOOD MOOD FOOD</h4>

            <p className='food-p-conatiner'>We know that a healthy mind is just as important as a healthy body for our beloved pets, 
             but should that thinking be limited to humans?</p>
             <p className='food-p2-conatiner'>With our fast and easy online ordering system, you can have your pet's food delivered
              right to your doorstep, saving you time and hassle. We also offer competitive prices and regular promotions
               to ensure that your pet can enjoy delicious, healthy food without breaking the bank</p>

               <Link to='/signup'><button className='food-button-conatiner'>SIGN UP</button></Link>

        </div>
      </div>
      
      <h4 className='third-h4'>SHOP BY PET</h4>

      <div className='third-container'>


        <div className='dog-third-container'>
            <motion.div  whileHover={{y : -15}}><Link to='/dog'><img src='./Img/dog-third.png' className='dog-third'></img></Link></motion.div>
            <p className='p-third'>DOG</p>
        </div>

        <div className='cat-third-container'>
            <motion.div  whileHover={{y : -15}}><Link to='/cat'><img src='./Img/cat-third.png' className='cat-third'></img></Link></motion.div>
            <p className='p-third'>CAT</p>
        </div>

        <div className='fish-third-container'>
            <motion.div  whileHover={{y : -15}}><Link to='/fish'><img src='./Img/fish-third.png' className='fish-third'></img></Link></motion.div>
            <p className='p-third'>FISH</p>
        </div>

        <div className='pony-third-container'>
            <motion.div  whileHover={{y : -15}}><Link to='/pony'><img src='./Img/pony-third.png' className='pony-third'></img></Link></motion.div>
            <p className='p-third'>PONY</p>
        </div>
      </div>
      

      <div className='fourth-container'>
         <div className='toy-info-container'>
           <h4 className='toy-h4-conatiner'>BEST TOYS</h4>

           <p className='toy-p-conatiner'>We offer a wide variety of toys that are both fun and safe for your 
           pets to play with.We want to make sure that you and your furry friend have the best possible experience with our products.</p>
           <p className='toy-p2-conatiner'>Our selection of toys includes everything from plushies to chew toys,
            interactive toys, and more. We understand that pets have unique personalities and preferences, which
             is why we offer toys for all types of pets, whether they're playful, cuddly, or prefer to chew on things.</p>

            <Link to='/signup'><button className='toy-button-conatiner'>SIGN UP</button></Link>
         </div>
         
         <div className='toy-img-container'><img src='./Img/cat-back2.jpg' className='toy-back'></img></div>
      </div>


      <div className='fifth-container'>
          
        <Carousel responsive={responsive}>
          <div className='card-cat'>
            <img src="./Img/cat-card.jpg" className='cat-card-slider'></img>
            <h2 className='h2-card-slider'>For Cat</h2>
            <p className='p-card-slider'>$20.99</p>
            <p className='p-d-card-slider'>Food Dispenser Tum</p>
            <p className='p-b-card-slider'>
            <Link to='/signup'><button className='b-card-slider'>Add To Cart</button></Link>
            </p>
          </div>
           
          <div className='card-cat'>
            <img src="./Img/card2.jpg" className='cat-card-slider'></img>
            <h2 className='h2-card-slider'>For Dog</h2>
            <p className='p-card-slider'>$13.99</p>
            <p className='p-d-card-slider'>Toy Hide & Seek Plush</p>
            <p className='p-b-card-slider'>
            <Link to='/signup'><button className='b-card-slider'>Add To Cart</button></Link>
            </p>
          </div>

          <div className='card-cat'>
            <img src="./Img/card3.jpg" className='cat-card-slider'></img>
            <h2 className='h2-card-slider'>For Cat</h2>
            <p className='p-card-slider'>$50.99</p>
            <p className='p-d-card-slider'>Cake Scratcher House</p>
            <p className='p-b-card-slider'>
            <Link to='/signup'><button className='b-card-slider'>Add To Cart</button></Link>
            </p>
          </div>

          <div className='card-cat'>
            <img src="./Img/card4.jpg" className='cat-card-slider'></img>
            <h2 className='h2-card-slider'>For Cat</h2>
            <p className='p-card-slider'>$31.99</p>
            <p className='p-d-card-slider'> Hipidog Water Fountain</p>
            <p className='p-b-card-slider'>
            <Link to='/signup'><button className='b-card-slider'>Add To Cart</button></Link>
            </p>
          </div>

          <div className='card-cat'>
            <img src="./Img/card5.jpg" className='cat-card-slider'></img>
            <h2 className='h2-card-slider'>For Dog</h2>
            <p className='p-card-slider'>$23.99</p>
            <p className='p-d-card-slider'> Dog Jacket/Raincoat</p>
            <p className='p-b-card-slider'>
            <Link to='/signup'><button className='b-card-slider'>Add To Cart</button></Link>
            </p>
          </div>

          <div className='card-cat'>
            <img src="./Img/card6.jpg" className='cat-card-slider'></img>
            <h2 className='h2-card-slider'>For Cat</h2>
            <p className='p-card-slider'>$15.99</p>
            <p className='p-d-card-slider'>Apple Squeaking Toy</p>
            <p className='p-b-card-slider'>
            <Link to='/signup'><button className='b-card-slider'>Add To Cart</button></Link>
            </p>
          </div>
        </Carousel>
           
      </div>


      <div>
       <Footer/>
      </div>
   </div>
 );
}

export default Home;