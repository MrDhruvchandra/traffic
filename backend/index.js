import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Use node-fetch for HTTP requests in Node.js

dotenv.config(); // Load environment variables from .env

const app = express();
const port = 5000; // You can change the port number if needed

// Middleware to allow CORS
app.use(cors());

// Define your traffic data route
app.get('/traffic', async (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Access API key from environment variable

  if (!apiKey) {
    return res.status(500).json({ error: 'API key missing' });
  }

  const trafficApiURL = `https://maps.googleapis.com/maps/api/directions/json?origin=Lucknow&destination=Charbagh&key=${apiKey}`;

  try {
    const response = await fetch(trafficApiURL);
    const data = await response.json();

    if (data.status !== 'OK') {
      return res.status(500).json({ error: 'Failed to fetch traffic data' });
    }

    // Process the data as needed and send it as the response
    res.json(data);
  } catch (error) {
    console.error('Error fetching traffic data:', error);
    res.status(500).json({ error: 'Error fetching traffic data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
