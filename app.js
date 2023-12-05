import "dotenv/config";
import session from "express-session";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import cors from "cors";
import "dotenv/config";
import AssignmentRoutes from "./assignments/routes.js";
import EnrollmentRoutes from "./enrollments/routes.js";
import GradeRoutes from "./grades/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";

const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));



import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);

app.use(express.json());

CourseRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
GradeRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
Lab5(app);
HelloRoutes(app);

app.listen(process.env.PORT || 4000);
