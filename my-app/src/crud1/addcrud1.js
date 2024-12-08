import '../admin-dashboard/addcss.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AddNdertesa58700() {
  const [emertimi58700, setEmertimi58700] = useState("");
  const [dataPT, setDataPT] = useState("");
  const [addStatus, setAddStatus] = useState("");
  const navigate = useNavigate();

  const addNdertesa = async (e) => {
    e.preventDefault();

    const values = {
      emertimi58700,
      dataPT,
    };

    try {
      const response = await axios.post("http://localhost:5000/insertNdertesa58700", values);

      if (response.data.message) {
        setAddStatus(response.data.message);
      } else {
        setAddStatus("Ndertesa added successfully");
      }

      navigate('/ndertesa'); // Redirect after successful addition
    } catch (error) {
      console.error(error);
      setAddStatus("Something went wrong");
    }
  };

  return (
    <div>
      <div className="formaadd">
        <h2 className="h2add">Add Ndertesa Here!</h2>
        <form className="add-form" onSubmit={addNdertesa}>
          {/* Emertimi58700 Input */}
          <input
            className="inputform"
            type="text"
            placeholder="Enter Emertimi"
            id="emertimi"
            name="emertimi"
            onChange={(e) => setEmertimi58700(e.target.value)}
            value={emertimi58700}
          />

          {/* DataPT Input */}
          <input
            className="inputform"
            type="date"
            id="dataPT"
            name="dataPT"
            onChange={(e) => setDataPT(e.target.value)}
            value={dataPT}
          />

          {/* Add Button */}
          <button className="add-btn" type="submit">
            Add
          </button>
        </form>

        {/* Status Message */}
        {addStatus && <p className="status-message">{addStatus}</p>}
      </div>
    </div>
  );
}

export default AddNdertesa58700;
