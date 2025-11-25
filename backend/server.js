const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(express.json());

const empRoutes = require('./routes/empRoutes');
const userRoutes = require('./routes/userRoutes');

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);


app.use("/uploads", express.static("uploads"));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

