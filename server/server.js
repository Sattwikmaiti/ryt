const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cars=require("./routes/Car.js");




mongoose
  .connect("mongodb://maitisattwik:VqTf9PZxWIUlmaC3@ac-kry1qq9-shard-00-00.etll2pp.mongodb.net:27017,ac-kry1qq9-shard-00-01.etll2pp.mongodb.net:27017,ac-kry1qq9-shard-00-02.etll2pp.mongodb.net:27017/?ssl=true&replicaSet=atlas-ow756q-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use(cors());

app.use("/api/v1",cars);

app.listen(8001, () => console.log('Running on port 8001'));