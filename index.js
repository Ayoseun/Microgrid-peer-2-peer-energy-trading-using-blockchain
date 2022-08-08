const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();

const mongoString = 'mongodb+srv://Ayoseun:<password>$@cluster0.jkgmam0.mongodb.net/test';






mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());
app.use('/api', routes)



app.listen(process.env.PORT || 3001, () => {
    console.log(`Server Started at ${3001}`)
})
