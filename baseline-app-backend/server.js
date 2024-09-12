const path = require('path');
const express = require('express');
const axios = require('axios');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });


const PORT = process.env.PORT || 3000;


const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

app.use(express.json());

// console.log("SPOONACULAR_API_KEY=",SPOONACULAR_API_KEY)




// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});