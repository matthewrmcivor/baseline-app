const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number.toFixed(1));
};


const FoodResults = ({ foods }) => {
  return (
    <div>
      {foods.map((food, index) => (
        <div key={index}>
          {food.image && <img src={food.image} alt={food.name} style={{ width: '200px', height: 'auto' }} />}
          <h3>{food.name}</h3>
          <p>Calories: {formatNumber(food.calories)}</p>
          <p>Carbs: {formatNumber(food.carbs)}g</p>
          <p>Fat: {formatNumber(food.fat)}g</p>
          <p>Protein: {formatNumber(food.protein)}g</p>
        </div>
      ))}
    </div>
  );
};

export default FoodResults;