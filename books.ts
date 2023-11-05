import express from "express";

const books = {
    1: {
        id: 1,
        title: "I Know Why The Caged Bird Sings",
        author: "Maya Angelou",
    },
    2: {
        id: 2,
        title: "East of Eden",
        author: "John Steinbeck",
    },
    3: {
        id: 3,
        title: "The Sun Also Rises",
        author: "Ernest Hemingway",
    },
    4: {
        id: 4,
        title: "Cloudy with a Chance of Meatballs",
        author: "Judi Barrett",
    },
} as Record<string, any>;

export interface BookQueryParams {
    title?: string;
    author?: string;
    id?: string;
}

export const updateBook = (
    bookId: string,
    books: Record<string, any>,
    query: BookQueryParams
) => {
    books[bookId] = {
        id: bookId,
        title: query.title,
        author: query.author,
    };

    return books[bookId];
};

export const createBook = (
    books: Record<string, any>,
    query: BookQueryParams
) => {
    const bookIds = Object.keys(books).map((el) => parseInt(el));
    bookIds.sort((a, b) => b - a);
    const latestBookId = bookIds[0];
    const newBookId = latestBookId + 1;

    const newBook = {
        id: newBookId,
        title: query.title,
        author: query.author,
    };
    return newBook;
};

export const bookRouter = express.Router();

bookRouter.get("/", (req, res) => {
    res.send(books);
});

bookRouter.get("/:id", (req, res) => {
    const book = books[req.params.id];
    if (book !== undefined) {
        res.send(book);
    } else {
        res.status(404).send("Book not found");
    }
});

bookRouter.post("/", (req, res) => {
    const query: BookQueryParams = req.query;
    if (query.id) {
        res.status(400).send("Invalid input");
    } else if (query.title == undefined || query.author == undefined) {
        res.status(400).send("Invalid input");
    }

    const newBook = createBook(books, query);
    books[newBook.id.toString()] = newBook;

    res.send(newBook);
});

bookRouter.put("/:id", (req, res) => {
    const query: BookQueryParams = req.query;
    const { title, author } = query;
    if (query.id) {
        delete query.id;
    } else if (query.title == undefined || query.author == undefined) {
        res.status(400).send("Invalid input");
    }

    const bookId = req.params.id;
    const book = books[bookId];
    if (book !== undefined) {
        const updatedBook = updateBook(bookId, books, {
            title,
            author,
        });
        res.send(updatedBook);
    } else {
        res.status(404).send("Book not found");
    }
});

bookRouter.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const book = books[bookId];
    if (book !== undefined) {
        delete books[bookId];
        res.status(204).send(bookId);
    } else {
        res.status(404).send("Book not found");
    }
});
