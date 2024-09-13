import { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import FoodResults from './FoodResults';


const App = () => {
  console.log("process.env: ", process.env)
  const [results, setResults] = useState([]);

  const handleSearch = async (ingredients) => {
    try {
      const API_PORT = process.env.REACT_APP_API_PORT;

      const URL = `http://localhost:${API_PORT}/api/food`;
      console.log('Sending request to:', URL);

      const response = await axios.post(URL, { ingredients });
      
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Food Ingredients Search</h1>
      <SearchForm onSearch={handleSearch} />
      <FoodResults foods={results} />
    </div>
  );
};

export default App;