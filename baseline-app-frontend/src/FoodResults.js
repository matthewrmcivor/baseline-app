const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number.toFixed(1));
};


const FoodResults = ({ foods }) => {
  return (
    <div>
    {foods.map((food, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        {/* Image */}
        {food.image ? (
          <img 
            src={food.image} 
            alt={food.name} 
            style={{ width: '200px', height: 'auto', marginRight: '20px' }} 
          />
        ) : (
          <div style={{ width: '200px', height: 'auto', marginRight: '20px', backgroundColor: '#f0f0f0' }}>
            <p>No image available</p>
          </div>
        )}

        {/* Text Content */}
        <div>
          <h3>{food.name}</h3>
          <p>Calories: {formatNumber(food.calories)}</p>
          <p>Carbs: {formatNumber(food.carbs)}g</p>
          <p>Fat: {formatNumber(food.fat)}g</p>
          <p>Protein: {formatNumber(food.protein)}g</p>
        </div>
      </div>
    ))}
  </div>
  );
};

export default FoodResults;