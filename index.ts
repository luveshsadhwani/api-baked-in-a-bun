import express from "express";
import { BookQueryParams, updateBook, createBook } from "./books";

const app = express();
const PORT = 3000;

const currentUser = {
    name: "Luvesh",
    level: "Beginner",
    points: 500,
};

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

app.get("/", (req, res) => {
    res.send(
        `Greetings ${currentUser.level} ${currentUser.name}!. You have ${currentUser.points}, keep going with our new books and courses below!`
    );
});

app.get("/books", (req, res) => {
    res.send(books);
});

app.get("/books/:id", (req, res) => {
    const book = books[req.params.id];
    if (book !== undefined) {
        res.send(book);
    } else {
        res.status(404).send("Book not found");
    }
});

app.post("/books", (req, res) => {
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

app.put("/books/:id", (req, res) => {
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

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const book = books[bookId];
    if (book !== undefined) {
        delete books[bookId];
        res.status(204).send(bookId);
    } else {
        res.status(404).send("Book not found");
    }
});

const courses = {
    1: {
        id: 1,
        name: "Learn To Programme: The Fundamentals",
        educator: "University of Toronto",
    },
    2: {
        id: 2,
        name: "Python For Everybody",
        educator: "University of Michigan",
    },
    3: {
        id: 3,
        name: "Code Yourself! An Introduction To Programming",
        educator: "The University of Edinburgh",
    },
    4: {
        id: 4,
        name: "Google IT Support",
        educator: "Google",
    },
} as Record<string, any>;

app.get("/courses", (req, res) => {
    res.send(courses);
});

app.get("/courses/:id", (req, res) => {
    const course = courses[req.params.id];
    if (course !== undefined) {
        res.send(course);
    } else {
        res.status(404).send("Course not found");
    }
});

app.post("/courses", (req, res) => {
    const query = req.query;
    if (query.id) {
        res.status(400).send("Invalid input");
    } else if (query.name == undefined || query.educator == undefined) {
        res.status(400).send("Invalid input");
    }

    const courseIds = Object.keys(courses).map((el) => parseInt(el));
    courseIds.sort((a, b) => b - a);
    const latestCourseId = courseIds[0];
    const newCourseId = latestCourseId + 1;

    const newCourse = {
        id: newCourseId,
        name: query.name,
        educator: query.educator,
    };
    courses[newCourseId.toString()] = newCourse;

    res.send(newCourse);
});

app.put("/courses/:id", (req, res) => {
    const query = req.query;
    if (query.id) {
        delete query.id;
    } else if (query.name == undefined || query.educator == undefined) {
        res.status(400).send("Invalid input");
    }

    const courseId = req.params.id;
    const course = courses[courseId];
    if (course !== undefined) {
        courses[courseId] = {
            id: courseId,
            name: query.name,
            educator: query.educator,
        };
    } else {
        res.status(404).send("Course not found");
    }
});

app.delete("/courses/:id", (req, res) => {
    const courseId = req.params.id;
    const course = courses[courseId];
    if (course !== undefined) {
        delete courses[courseId];
        res.status(204).send(courseId);
    } else {
        res.status(404).send("Course not found");
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
