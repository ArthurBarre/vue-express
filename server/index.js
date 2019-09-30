const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express()

//Middlleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts')
app.use('/api/posts', posts);
const port = process.env.PORT || 3000;

//handle prod
if (process.env.NODE_ENV === 'production') {
  //static folder
  app.use(express.static(__dirname + '/public/'))

  //handle spa
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(port, () => console.log(`server run on ${port}`))