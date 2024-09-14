import { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import FoodResults from './FoodResults';


const App = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (ingredients) => {
    try {
      const API_PORT = process.env.REACT_APP_API_PORT;
      ingredients = ingredients.split(',').map(item => item.trim());
      
      const URL = `http://localhost:${API_PORT}/api/food`;
      console.log('Sending request to:', URL);
      console.log("ingredients: ", ingredients);
      const response = await axios.post(URL, { ingredients });
      console.log("response: ", response)
      
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