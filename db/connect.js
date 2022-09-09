const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster01.0dxtjy1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// mongodb+srv://${process.env.DB_USER}:<password>@cluster01.0dxtjy1.mongodb.net/?retryWrites=true&w=majority

const connectDB = () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB