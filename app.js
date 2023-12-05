
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./assignments/routes.js";
import cors from "cors";
import "dotenv/config";
import AssignmentRoutes from "./assignments/routes.js";
import EnrollmentRoutes from "./enrollments/routes.js";
import GradeRoutes from "./grades/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";

const app = express();

app.use(cors());

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
