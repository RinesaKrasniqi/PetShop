import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the updateAshensori function here
const updateAshensoriInDatabase = async (ashensori_id, emertimi58700, ndertesa_id) => {
  try {
    await axios.put(`http://localhost:5000/Ashensori58700/update/${ashensori_id}`, {
      emertimi58700: emertimi58700,
      ndertesa_id: ndertesa_id,
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const UpdateAshensori = () => {
  const { ashensori_id } = useParams();
  const [emertimi58700, setEmertimi58700] = useState('');
  const [selectedNdertesaId, setSelectedNdertesaId] = useState('');
  const [ndertesaNames, setNdertesaNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAshensori = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Ashensori58700/edit/${ashensori_id}`);
        const ashensori = response.data[0];

        setEmertimi58700(ashensori.emertimi58700);
        setSelectedNdertesaId(ashensori.ndertesa_id); // Set the selected ndertesa_id here
      } catch (error) {
        console.error(error);
      }
    };

    const fetchNdertesaNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Ndertesa58700');
        setNdertesaNames(response.data.recordset);
      } catch (error) {
        console.error(error);
      }
    };

    getAshensori();
    fetchNdertesaNames();
  }, [ashensori_id]);

  const update = async (e) => {
    e.preventDefault();
    if (!selectedNdertesaId) {
      alert('Please select a valid Ndertesa');
      return;
    }
    try {
      // Call the updateAshensoriInDatabase function to update data in the database
      await updateAshensoriInDatabase(ashensori_id, emertimi58700, selectedNdertesaId);

      // After successfully updating, navigate to the ashensori page
      navigate('/ashensori');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="formaadd">
        <h2 className="h2add">Update ashensori here!</h2>
        <form className="add-form">
          <input
            className="inputform"
            type="text"
            placeholder="emri"
            id="Emri"
            value={emertimi58700}
            onChange={(e) => setEmertimi58700(e.target.value)}
          />
          <select
            className="inputform"
            value={selectedNdertesaId}
            onChange={(e) => setSelectedNdertesaId(e.target.value)}
          >
            <option value="" disabled>
              Select a Ndertesa
            </option>
            {ndertesaNames.map((ndertesa) => (
              <option key={ndertesa.ndertesa_id} value={ndertesa.ndertesa_id}>
                {ndertesa.emertimi58700}
              </option>
            ))}
          </select>
          <button className="updateproduct-btn" type="submit" onClick={update}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAshensori;
