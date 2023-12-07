

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/tu-base-de-datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir el esquema del modelo de Productos
const productSchema = new mongoose.Schema({
  // Definir la estructura de modelo, por ejemplo:
  name: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

// Definir el esquema del modelo de Carritos
const cartSchema = new mongoose.Schema({
  // Definir la estructura de modelo, por ejemplo:
  user: String,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

// Middlewares
app.use(bodyParser.json());

// Rutas para productos
app.get('/api/products', async (req, res) => {
  try {
    // Lógica para obtener productos
    const products = await Product.find();

    // Ejemplo de respuesta
    res.json({
      status: 'success',
      payload: products,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

// Rutas para carritos
// Implementar las rutas necesarias para los carritos
// ...

// Manejar cierre de la aplicación
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Conexión a MongoDB cerrada');
    process.exit(0);
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
