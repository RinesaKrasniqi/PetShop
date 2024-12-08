import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../admin-dashboard/addcss.css';
import axios from 'axios';

function AddCrud2() {
  const [emertimi58700, setEmertimi58700] = useState('');
  const [ndertesaNames, setNdertesaNames] = useState([]);
  const [selectedNdertesaId, setSelectedNdertesaId] = useState('');
  const [addStatus, setAddStatus] = useState('');

  const navigate = useNavigate();

  // Fetch available Ndertesa names for the dropdown
  useEffect(() => {
    const fetchNdertesaNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Ndertesa58700');
        if (response.data && response.data.recordset) {
          setNdertesaNames(response.data.recordset);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching Ndertesa names:', error);
      }
    };

    fetchNdertesaNames();
  }, []);

  // Add new record to the Ashensori table
  const add = async (e) => {
    e.preventDefault();

    if (!emertimi58700 || !selectedNdertesaId) {
      setAddStatus('Please provide all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/insertAshensori58700', {
        emertimi58700,
        ndertesa_id: selectedNdertesaId,
      });

      if (response.data.message) {
        setAddStatus(response.data.message);
      } else {
        setAddStatus('Data successfully inserted!');
        navigate('/ashensori');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
      setAddStatus('Insertion failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="formaadd">
        <h2 className="h2add">Add to Ashensori Table</h2>
        {addStatus && <p className="add-status">{addStatus}</p>}
        <form className="add-form" onSubmit={add}>
          <input
            className="inputform"
            type="text"
            placeholder="Emertimi"
            id="emertimi"
            name="emertimi"
            value={emertimi58700}
            onChange={(e) => setEmertimi58700(e.target.value)}
          />
          <select
            className="inputform"
            value={selectedNdertesaId}
            onChange={(e) => setSelectedNdertesaId(e.target.value)}
          >
            <option value="" disabled>
              Select Ndertesa
            </option>
            {ndertesaNames.map((ndertesa) => (
              <option key={ndertesa.ndertesa_id} value={ndertesa.ndertesa_id}>
                {ndertesa.emertimi58700}
              </option>
            ))}
          </select>
          <button className="add-btn" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCrud2;
