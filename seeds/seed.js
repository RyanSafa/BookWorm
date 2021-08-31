import lorem from "./loremIpsum.js";
import book from "../models/book.js";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/StockTracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: true,
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", function () {
  console.log("MongoDB Connected!");
});

const seedBooks = async (lorem) => {
  for (let i = 0; i < 10; i++) {
    await book.create({
      title: lorem.generateWords(2),
      author: lorem.generateWords(2),
      description: lorem.generateParagraphs(1),
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      pageCount: Math.floor(Math.random() * 100) + 200,
      categories: lorem.generateWords(1),
      uploadedBy: new mongoose.Types.ObjectId("612c0c03eda9931b3c19564a"),
    });
  }
};

seedBooks(lorem);
