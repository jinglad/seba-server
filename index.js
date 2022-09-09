const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const userRoute = require("./routers/user.routes");
const connectDB = require("./db/connect");

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());


const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Seba Server");
});


// api routes
app.use("/", userRoute);

// db connection
const start = async () => {
  try {
    connectDB().then();
    app.listen(port, console.log(`app is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
