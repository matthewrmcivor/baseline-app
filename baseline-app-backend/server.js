const path = require('path');
const express = require('express');
const axios = require('axios');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });


const PORT = process.env.PORT || 3000;


const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

app.use(express.json());

console.log("SPOONACULAR_API_KEY=",SPOONACULAR_API_KEY)


// Endpoint to take food ingredients input from the front-end
app.post('/api/food', async (req, res) => {
  const { ingredients } = req.body;  // Expecting an array of ingredients

  try {
    // Send request to Spoonacular API
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients: ingredients.join(','),
        number: 10, // Get 10 results and we will pick the least calorie-dense ones
        apiKey: SPOONACULAR_API_KEY
      }
    });

    const foodResults = response.data;

    // Extract nutritional data for each food item
    const foodData = await Promise.all(
      foodResults.map(async (food) => {
        const nutritionResponse = await axios.get(`https://api.spoonacular.com/recipes/${food.id}/nutritionWidget.json`, {
          params: {
            apiKey: SPOONACULAR_API_KEY
          }
        });
        return {
          name: food.title,
          calories: nutritionResponse.data.calories,
          carbs: nutritionResponse.data.carbs,
          fat: nutritionResponse.data.fat,
          protein: nutritionResponse.data.protein
        };
      })
    );

    // Sort the food items by calories and return the 3 least calorie-dense foods
    const sortedByCalories = foodData.sort((a, b) => a.calories - b.calories).slice(0, 3);

    // Send the data back to the front-end
    res.json(sortedByCalories);
  } catch (error) {
    console.error('Error fetching data from Spoonacular:', error.message);
    res.status(500).send('Error fetching data from Spoonacular');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});