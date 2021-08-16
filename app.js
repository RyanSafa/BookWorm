import express from "express";
import  path  from "path";
import ejsMate from 'ejs-mate';

const app = express();
const port = 3000;
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs' );
app.engine('ejs', ejsMate);

app.get('/', (req,res) => {
    res.render('home')
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
