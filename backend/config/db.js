
const mongoose = require("mongoose");
require('dotenv').config();
//const mongoURL = process.env.DB_URLlocal;
  const mongoURL = process.env.DB_URL;
  
 
const db = mongoose.connect(mongoURL)
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));



module.exports = db;