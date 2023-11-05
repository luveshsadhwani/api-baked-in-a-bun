import express from "express";

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

export interface CourseQueryParams {
    name?: string;
    educator?: string;
    id?: string;
}

export const updateCourse = (
    courseId: string,
    courses: Record<string, any>,
    query: CourseQueryParams
) => {
    courses[courseId] = {
        id: courseId,
        name: query.name,
        educator: query.educator,
    };

    return courses[courseId];
};

export const createCourse = (
    courses: Record<string, any>,
    query: CourseQueryParams
) => {
    const courseIds = Object.keys(courses).map((el) => parseInt(el));
    courseIds.sort((a, b) => b - a);
    const latestCourseId = courseIds[0];
    const newCourseId = latestCourseId + 1;

    const newCourse = {
        id: newCourseId,
        name: query.name,
        educator: query.educator,
    };
    return newCourse;
};

export const courseRouter = express.Router();

courseRouter.get("/", (req, res) => {
    res.send(courses);
});

courseRouter.get("/:id", (req, res) => {
    const course = courses[req.params.id];
    if (course !== undefined) {
        res.send(course);
    } else {
        res.status(404).send("Course not found");
    }
});

courseRouter.post("/courses", (req, res) => {
    const query = req.query;
    if (query.id) {
        res.status(400).send("Invalid input");
    } else if (query.name == undefined || query.educator == undefined) {
        res.status(400).send("Invalid input");
    }

    const newCourse = createCourse(courses, query);
    courses[newCourse.id.toString()] = newCourse;

    res.send(newCourse);
});

courseRouter.put("/:id", (req, res) => {
    const query = req.query;
    if (query.id) {
        delete query.id;
    } else if (query.name == undefined || query.educator == undefined) {
        res.status(400).send("Invalid input");
    }

    const courseId = req.params.id;
    const course = courses[courseId];
    if (course !== undefined) {
        const updatedCourse = updateCourse(courseId, courses, query);
        res.send(updatedCourse);
    } else {
        res.status(404).send("Course not found");
    }
});

courseRouter.delete("/:id", (req, res) => {
    const courseId = req.params.id;
    const course = courses[courseId];
    if (course !== undefined) {
        delete courses[courseId];
        res.status(204).send(courseId);
    } else {
        res.status(404).send("Course not found");
    }
});
