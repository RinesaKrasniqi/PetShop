import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './addcss.css';
import axios from 'axios';

const UpdateUser = () => {
  const { Client_id } = useParams(); // Make sure parameter name matches the route parameter
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/edit/${Client_id}`);
        const user = response.data;
        console.log('emri '+user.Emri);
      
        setName(user.name);
        setSurname(user.surname);
        setEmail(user.email);
        setPhone(user.phone);
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };

    getUserId();
  }, [Client_id]);

  const update =  (e) => {
    e.preventDefault();
    try {
       axios.put(`http://localhost:5000/users/update/${Client_id}`, {
        name: name,
        surname: surname,
        email: email,
        phone: phone,
      });
      navigate('/admin-dashboard');
    } catch (error) {
      console.error("Error gurl", error);
    }
  };

  return (
    <div>
      <div className="formaadd">
        <h2 className="h2add">Update user here!</h2>
        <form className="add-form">
          <input
            className="inputform"
            type="text"
            placeholder="First Name"
            id="Emri"
            Emri="Emri"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Last Name"
            id="Surname"
            name="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Email"
            id="Phone"
            name="Phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Phone"
            id="price"
            name="price"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="add-btn" type="submit" onClick={update}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
