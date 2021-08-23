import dotenv from 'dotenv'
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import fetch from 'node-fetch'
import express from 'express'
const router = express.Router();

const cleanParams = (str) => {
    const strArray = str.split(' ');
    return strArray.join('+');
}

router.get('/new', (req,res) => {
    res.render('books/new')
})
router.post('/new', async(req,res) => {
    const {title, author } = req.body;
    const titleQuery = cleanParams(title);
    const authorQuery = cleanParams(author);
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${titleQuery}+inauthor:${authorQuery}&printType=books&key=${process.env.GOOGLE_BOOKS_KEY}`)
    const responseJson = await response.json();
    console.log(responseJson);
    const bookArray =  responseJson.items.map((book) => {
        console.log(book);
        return { 
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors[0],
            description: book.volumeInfo.description,
            pageCount: book.volumeInfo.pageCount,
            publishedDate: book.volumeInfo.publishedDate,
            thumbnail: book.volumeInfo.imageLinks.thumbnail,
            category: book.volumeInfo.categories[0],
        }
    });
    
    res.send(JSON.stringify(bookArray));
})

export { router }