const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

const app = express();   

// CORS middleware 
app.use(cors({
   origin: ["http://localhost:3000", "http://localhost:3001"], // allow both
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
const empRoutes = require('./routes/empRoutes');
const userRoutes = require('./routes/userRoutes');

app.use("/uploads", express.static("uploads"));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
