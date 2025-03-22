// @ts-nocheck

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const path = require('path')
const cloudinary = require('cloudinary').v2; // Import Cloudinary
const swaggerJsDoc = require('swagger-jsdoc'); // Import swagger-jsdoc
const swaggerUi = require('swagger-ui-express'); // Import swagger-ui-express
const swaggerOptions = require('./swagger'); // Import your Swagger options
const dotenv = require('dotenv')


const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const rentRoutes = require("./routes/rentRoutes");
const maintainRoutes = require("./routes/maintainRoutes");
const orderRoutes = require("./routes/orderRoutes");


dotenv.config(); // load the env data


const app = express();

const swaggerDocs = swaggerJsDoc(swaggerOptions); // Generate Swagger docs
app.use('/swagger.json', (req, res) => { // Serve Swagger JSON
  res.json(swaggerDocs);
});




app.use(cors({ origin: '*' }));

app.use(express.json());  //parse JSON 



app.use('/images', express.static(path.join(__dirname, '../my-app/src/media')));
app.use('/imagesStages', express.static(path.join(__dirname, '../my-app/src/media/stages')));
app.use('/Images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/ImagesGallery', express.static(path.join(__dirname, '../../media')));


app.use("/api/cars", carRoutes);
app.use("/api/rents", rentRoutes);
app.use("/api/maintenance", maintainRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);

console.log(process.env.MONGO_URI)
const uri = process.env.MONGO_URI; // Use the environment variable

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
