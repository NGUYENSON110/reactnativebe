const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express();
const port = 5000;
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order')
dotenv.config();


// Connect DATABASE
mongoose.connect(
    'mongodb+srv://nguyenanson20001100:anson110@reactnative.c6n5fzi.mongodb.net/',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
)

// Kiem tra connect mongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:'10mb', extended: true}))

// router
app.use('/api', authRouter) 
app.use('/api/users', userRouter) 
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)




app.listen(port, () =>{
    console.log("Server is running ...")
})