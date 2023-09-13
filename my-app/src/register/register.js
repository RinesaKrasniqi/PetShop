import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './register.css'; 
import  Header from '../Components/header.js';
import  Footer from '../Components/footer.js';


export default function Register() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const register = async (e) => {
    try {
      e.preventDefault();

      // Clear previous error messages
      setRegisterStatus('');
      setErrors({});

      // Validate input fields
      const inputErrors = {};
      if (!name) inputErrors.name = 'Name is required.';
      if (!surname) inputErrors.surname = 'Surname is required.';
      if (!email) inputErrors.email = 'Email is required.';
      if (!phone) inputErrors.phone = 'Phone is required.';
      if (!password) inputErrors.password = 'Password is required.';

      if (Object.keys(inputErrors).length > 0) {
        setErrors(inputErrors);
        return;
      }

      const response = await axios.post('http://localhost:5000/signup', {
        name: name,
        surname: surname,
        email: email,
        phone: phone,
        password: password,
      });

      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus('ACCOUNT CREATED');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      setRegisterStatus('Registration failed.');
    }
  };

  return (

    <div className="back-div">
        <div>
            <Header/>
          </div>
      <div className="formaregister">

        <form className="registerform" onSubmit={register}>
        <h2 className="h2reg">Create an Account</h2>
          <div className="registerform-name">

            <div>
            <input
              className="inputform"
              type="text"
              placeholder="First Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {errors.name && (
              <h1 className="error">{errors.name}</h1>
            )}

            </div>

            <div>
            <input
              className="inputform"
              type="text"
              placeholder="Last Name"
              onChange={(e) => setSurname(e.target.value)}
              value={surname}
            />
            {errors.surname && (
              <h1 className="error">{errors.surname}</h1>
            )}
          </div>

          
          </div>
          <div className="registerform-name">

            <div>
            <input
              className="inputform"
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {errors.email && (
              <h1 className="error">{errors.email}</h1>
            )}

            </div>


            <div>
            <input
              className="inputform"
              type="password"
              placeholder="Password (6 to 12 characters)"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {errors.password && (
              <h1 className="error">{errors.password}</h1>
            )}

            </div>


          </div>
          <div className="registerform-name">


            <div>
            <input
              className="inputform"
              type="text"
              placeholder="Phone number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            {errors.phone && (
              <h1 className="error">{errors.phone}</h1>
            )}

            </div>


            <input className="inputform" type="date" placeholder="Pick a Date" id="date" name="date" />
          </div>
          <button className="submit" type="submit">
            Join Now
          </button>
          {registerStatus && (
            <h1 className="error">{registerStatus}</h1>
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
            <Footer/>
          </div>
    </div>
  );
}
