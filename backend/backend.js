const express = require("express");
const app = express();
require('./db/conn')

app.listen(5000, () => {
    console.log('Connected to PORT 5000...');
})
