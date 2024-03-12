const mongoose = require("mongoose");

const CarsSchema = new mongoose.Schema(
  {
    car_name: {
        type: String,
        required: true
    },
    date_of_sale: {
        type: Date,
        required: true
    },
    model_no: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    }
    
   
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cars", CarsSchema);