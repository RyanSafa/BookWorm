import express from "express";
import  path  from "path";
import ejsMate from 'ejs-mate';
import mongoose from 'mongoose';
import {router as userRoute} from './routes/userRoutes.js'
const app = express();
const port = 3000;
const __dirname = path.resolve();
const db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/StockTracker', {useNewUrlParser: true, useUnifiedTopology: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("MongoDB Connected!")
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs' );
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname, '/public')));
app.use('/', userRoute);

app.get('/', (req,res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
