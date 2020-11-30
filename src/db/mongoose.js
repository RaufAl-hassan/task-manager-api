const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODN_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
