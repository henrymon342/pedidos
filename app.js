const express = require('express');
const app = express();

const PORT = process.env.PORT || 3030
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PedidosBD';

app.use(express.json());

const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');

app.use('/orders', orderRoutes);


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exit(1); 
  });