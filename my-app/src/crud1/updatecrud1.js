import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateNdertesa = () => {
  const { ndertesa_id } = useParams(); // Make sure the parameter name matches the route parameter (e.g., '/updateNdertesa/:id')
  const [ndertesa, setNdertesa] = useState({});
  const [emertimi58700, setEmertimi58700] = useState('');
  const [dataPt, setDataPt] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getNdertesa = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Ndertesa58700/edit/${ndertesa_id}`);
        const ndertesa = response.data.recordset;

        setEmertimi58700(ndertesa.emertimi58700);
        setDataPt(ndertesa.dataPt);
        setNdertesa(ndertesa);
      } catch (error) {
        console.error(error);
      }
    };

    getNdertesa();
  }, [ndertesa_id]);

  // Handle the form submission for updating the Ndertesa record
  const updateNdertesa = (e) => {
    e.preventDefault();

    try {
      axios.put(`http://localhost:5000/Ndertesa58700/update/${ndertesa_id}`, {
        emertimi58700,
        dataPt,
      });

      navigate('/ndertesa'); // Redirect to the Ndertesa list page after updating
    } catch (error) {
      console.error("Error updating Ndertesa", error);
    }
  };

  return (
    <div>
      <div className="formaadd">
        <h2 className="h2add">Update Ndertesa here!</h2>
        <form className="add-form" onSubmit={updateNdertesa}>
          <input
            className="inputform"
            type="text"
            placeholder="Enter Emertimi"
            id="emertimi58700"
            name="emertimi58700"
            value={emertimi58700}
            onChange={(e) => setEmertimi58700(e.target.value)}
          />
          <input
            className="inputform"
            type="date"
            id="dataPt"
            name="dataPt"
            value={dataPt}
            onChange={(e) => setDataPt(e.target.value)} 
          />
          <button className="add-btn" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNdertesa;
