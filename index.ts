import express from "express";
import { bookRouter } from "./books";
import { courseRouter } from "./courses";

const app = express();
const PORT = 3000;

const currentUser = {
    name: "Luvesh",
    level: "Beginner",
    points: 500,
};

app.get("/", (req, res) => {
    res.send(
        `Greetings ${currentUser.level} ${currentUser.name}!. You have ${currentUser.points}, keep going with our new books and courses below!`
    );
});

app.use("/books", bookRouter);
app.use("/courses", courseRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
