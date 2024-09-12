import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(ingredients);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;