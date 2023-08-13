import { useState } from 'react';
import './register.css';
import Header from '../Components/header.js';
import Footer from '../Components/footer.js';
import { Link, useNavigate } from 'react-router-dom';
import validation from './registerValidation';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const navigate = useNavigate();


const register=(e)=>{
  try{
  e.preventDefault();
  axios.post("http://localhost:5000/signup", {
   name:name,
   surname:surname,
   email:email,
   phone:phone,
   password:password,
  }).then((response)=>{
    if(response.data.message){
      setRegisterStatus(response.data.message);
    }else{
      setRegisterStatus("ACCOUNT CREATED");
    }}).then(response=>{navigate('/login')});
  }catch{
    setRegisterStatus({message: 'doesnt work'});
  }
}

  return (
    <div className="back-div">
      <div>
        <Header />
      </div>

      <div className="formaregister">
        <h2 className="h2reg">Create an Account</h2>

        <form className="registerform" onSubmit={register}>
          <div className="registerform-name">
            <input
              className="inputform"
              type="text"
              placeholder="First Name"
              id="name"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
            {registerStatus && registerStatus.name && (
              <h1 className="error">{registerStatus.name}</h1>
            )}
            <input
              className="inputform"
              type="text"
              placeholder="Last Name"
              id="surname"
              name="surname"
              onChange={(e) => {
                setSurname(e.target.value);
              }}
              value={surname}
            />
            {registerStatus && registerStatus.surname && (
              <h1 className="error">{registerStatus.surname}</h1>
            )}
          </div>

          <div className="registerform-name">
            <input
              className="inputform"
              type="email"
              placeholder="Email Address"
              id="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            {registerStatus && registerStatus.email && (
              <h1 className="error">{registerStatus.email}</h1>
            )}
            <input
              className="inputform"
              type="password"
              placeholder="Password (6 to 12 characters)"
              id="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            {registerStatus && registerStatus.password && (
             <h1 className="error">{registerStatus.password}</h1>
            )}
          </div>

          <div className="registerform-name">
          <input className="inputform" type="text" placeholder="Phone number" id="phone" name="phone"
           onChange={(e) => {
          setPhone(e.target.value);
           }}
           value={phone}
                     />
            {registerStatus && registerStatus.phone &&
           (<h1 className="error">{registerStatus.phone}</h1>)}
            <input className="inputform" type="date" placeholder="Pick a Date" id="date" name="date" />
          </div>

          <button className="submit" type="submit">
            Join Now
          </button>
          {registerStatus && registerStatus.message && (
            <h1 className="error">{registerStatus.message}</h1>
          )}

          <p className="p1-form">By creating your account, you agree to</p>
          <p className="p2-form">Fur-ever Friends Privacy Policy and Terms of Use.</p>
          <button className="loginbutton">
            <Link to="/login" className="loginbutton">
              Have an account? Log in
            </Link>
          </button>
        </form>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
