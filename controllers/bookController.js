import catchAsyncError from "../utils/catchAsyncError.js";
import fetch from "node-fetch";
import ApiError from "../utils/ApiError.js";
export const renderSearchForm = (req, res) => {
  res.render("books/search");
};

const returnBooks = (responseJson) => {
  const bookArray = responseJson.items.map((book) => {
    const {
      title,
      author,
      description,
      pageCount = null,
      publishedDate,
      category = "uknown",
    } = book.volumeInfo;
    if (book.volumeInfo.imageLinks) {
      const { thumbnail } = book.volumeInfo.imageLinks;
      return {
        title,
        author,
        description,
        pageCount,
        publishedDate,
        category,
        thumbnail,
      };
    } else {
      return {
        title,
        author,
        description,
        pageCount,
        publishedDate,
        category,
      };
    }
  });
  return bookArray;
};

export const queryBookApi = catchAsyncError(async (req, res) => {
  const { title, author } = req.query;
  const url = new URL(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&printType=books&langRestrict=en&key=${process.env.GOOGLE_BOOKS_KEY}`
  );
  const response = await fetch(url.href);
  const responseJson = await response.json();
  if (responseJson.items) {
    res.send(JSON.stringify(returnBooks(responseJson)));
  } else {
    return res.json({
      msg: `Sorry, we couldn't find any boook called ${title}, by ${author}`,
    });
  }
});
