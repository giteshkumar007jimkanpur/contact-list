const mongoose = require('mongoose');
mongoose.connect(`${process.env.DATABASE}`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting database'));

db.once('open',()=> {
    console.log(`Connected to database :: ${db.name}`)
})

module.exports= db;