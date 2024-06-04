const express = require("express");
const user = require("./routes/user");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(user);

const port = 3001;

app.listen(port, () => console.log('Server started'));