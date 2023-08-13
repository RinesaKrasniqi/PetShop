import {useRef, useState, useEffect} from 'react';
import './login.css';
import  Header from '../Components/header.js';
import  Footer from '../Components/footer.js';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


function Login() {
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const[loginStatus,setLoginStatus]=useState("");

const navigate= useNavigate();

const login = (e) => {
  try {
    e.preventDefault();
    axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        const loggedInUserEmail = response.data[0].email;
        setLoginStatus(loggedInUserEmail);

        if (loggedInUserEmail === 'admin@hotmail.com') {
          navigate('/admin-dashboard');
        } else if (loggedInUserEmail === 'postman@hotmail.com') {
          navigate('/post-purchases');
        } else {
          navigate('/user-home');
        }
      }
    });
  } catch (error) {
    console.error(error);
    setLoginStatus("An error occurred while logging in.");
  }
};


      return (
        <div className='back-div'>
          <div>
            <Header/>
          </div>
          
          <div className="forma">

            <h2 class="log-h">Log in here!</h2>
  
            <form className="loginform">
             <input class="input-f" type="email" placeholder="Email Address"
               id="email" name="email"
               onChange={(e)=>{
                setEmail(e.target.value);
              }}
              value={email} />
             <input class="input-f" type="password"
               placeholder="Password"  id="pass" name="pass"
               onChange={(e)=>{
                setPassword(e.target.value);
              }}
              value={password} />
              <h1 class='errorLogin'>{loginStatus}</h1>
             <button class="buton" type="submit" onClick={login}>Log in</button>
            </form>

           <p class="text-p">Im a new customer, create your account fast for free.</p>
           <p class="text-p">You will be able to track, manage and write reviews</p>
           <p class="text-p2"> about your orders.</p>

           <button className="registerbutton" ><Link to='/signup' className='registerbutton'>Create an account!</Link></button>
          </div>

          <div>
           <Footer/>
          </div>
      </div>
    );
}

export default Login;
