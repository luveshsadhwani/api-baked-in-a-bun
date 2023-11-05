import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.get("/book", (req, res) => {
    res.send("This is a book!");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
