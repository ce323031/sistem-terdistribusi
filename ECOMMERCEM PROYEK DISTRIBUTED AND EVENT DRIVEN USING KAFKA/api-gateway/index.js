const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const USER_SERVICE = "http://user-service:3001";
const PAYMENT_SERVICE = "http://192.168.101.95:3002";

app.post("/register", async (req, res) => {
  try {
    const result = await axios.post(`${USER_SERVICE}/register`, req.body);
    res.json(result.data);
  } catch (error) {
    console.error("Error from User Service:", error.message);
    res.status(error.response?.status || 500).json({
      error: "Failed to register user",
      details: error.response?.data || error.message, 
    });
  }
});

app.post("/pay", async (req, res) => {
  console.log("Forwarding payment request to Payment Service:", req.body); // Tambahan
  try {
    console.log("Calling user service at:", USER_SERVICE + "/register");

    const result = await axios.post(`${PAYMENT_SERVICE}/pay`, req.body);
    res.json(result.data);
  } catch (error) {
    console.error("Error from Payment Service:", error.message);
    console.error("Details:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: "Failed to process payment",
      details: error.response?.data || error.message,
    });
  }
});


app.listen(3000, () => console.log("API Gateway running on port 3000"));
