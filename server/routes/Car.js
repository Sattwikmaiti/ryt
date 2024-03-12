
const express=require("express");
const router = express.Router();

const Car = require("../models/Cars");
const cors=require("cors");
router.use(cors());

router.post('/cars', async (req, res) => {
    try {
        const { car_name, date_of_sale, model_no, price } = req.body;
        const existingCar = await Car.findOne({ model_no });
        if (existingCar) {
            return res.status(400).send('Car with this model number already exists.');
        }
        const newCar = new Car({ car_name, date_of_sale, model_no, price });
        await newCar.save();
        res.status(201).send('Car added successfully.');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// GET request to retrieve all cars
router.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find().sort({ date_of_sale: 1 });
        res.json(cars);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// GET request to retrieve car details by model number
router.post('/findcar', async (req, res) => {
    try {
      
        console.log(req.body.model_no)
        const car = await Car.findOne({ model_no: req.body.model_no });
        console.log(car);
        if(car)
        { 
           return res.status(200).json(car);
        }
        if (!car) {
            return res.status(404).send('Car not found.');
        }
        
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;