// ============ DEPENDENCIES ============
require('dotenv').config();
const { PORT = 4000, MONGODB_URL } = process.env;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan')

// ============ CONNECTIONS ============
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

mongoose.connection
    .on('open', () => console.log('you are connected to mongoose'))
    .on('close', () => console.log('youre disconnected from mongoose'))
    .on('error', (error) => console.log(error))

// ============ MODELS ============
const BlogSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
})

const Blog = mongoose.model('Blog', BlogSchema)

// ============ MIDDLEWARE ============
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// ============ ROUTES ============
// index
app.get('/', (req,res) =>{
    res.send('hello pikachu')
    // try {
    //     res.json(await Blog.find({}))
    // } catch (error) {
    //     res.status(400).json(error)
    // }
})

// create
app.post('/', async (req,res) =>{
    try{
        res.json(await Blog.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})


// ============ LISTENER ============
app.listen(PORT, () => console.log(`pikachus' candies are at PORT ${PORT}`))