const FoodResults = ({ foods }) => {
  return (
    <div>
      {foods.map((food, index) => (
        <div key={index}>
          <h3>{food.name}</h3>
          <p>Calories: {food.calories}</p>
        </div>
      ))}
    </div>
  );
};

export default FoodResults;