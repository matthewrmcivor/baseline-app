import { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import FoodResults from './FoodResults';


const App = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (ingredients) => {
    // try {
    //   const response = await axios.post(`http://localhost:${process.env.REACT_APP_PORT}/api/ingredients`, { ingredients });
    //   setResults(response.data);
    // } catch (error) {
    //   console.error('Error fetching data', error);
    // }
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