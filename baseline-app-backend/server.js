const path = require('path');
const express = require('express');
const axios = require('axios');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

app.use(cors());
dotenv.config({ path: path.resolve(__dirname, '../baseline-app-backend/.env') });


const PORT = process.env.SERVER_PORT;
const API_KEY = process.env.API_KEY;
const APP_ID=process.env.EDAMAM_APP_ID;

app.use(express.json());

console.log("API_KEY=",API_KEY)
// console.log("Server Port: ", PORT)


// Endpoint to take food ingredients input from the front-end
app.post('/api/food', async (req, res) => {
  const { ingredients } = req.body;  // Expecting an array of ingredients
  
  console.log("req.body: ", req.body)

  try {
    const params = {
      type: 'public',
      q: ingredients.join(','),  
      app_id: APP_ID,
      app_key: API_KEY,
    }
    
    // Send request to Edamam API
    //e.g.   'https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=92c65226&app_key=705b5b88ac3f8d2d83c3beeac4650ec2' \

    const edamamResponse = await axios.get('https://api.edamam.com/api/recipes/v2', { params });
    console.log("params: ", params);
    // console.log("res: ", res)

    const foodResults = edamamResponse.data.hits;

    // console.log("edamamResponse: ", edamamResponse)
    
    const foodData = foodResults.map(food => {
      return {
        name: food.recipe.label,
      };
    });


    // Sort the food items by calories and return the 3 least calorie-dense foods
    const sortedByCalories = foodData.sort((a, b) => a.calories - b.calories).slice(0, 3);

    console.log("sortedByCalories: ", sortedByCalories)
    
    // Send the data back to the front-end
    res.json(sortedByCalories);
  } catch (error) {
    console.error('Error fetching data from Edamam:', error.message);
    console.error('Edamam error response:', error.response?.data);  // Log the actual response from Edamam if available
        res.status(500).send('Error fetching data from Edamam');
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});