import Database from "../Database/index.js";
function GradeRoutes(app) {
    app.get("/api/grades", (req, res) => {
        const grades = Database.grades;
        res.send(grades);
    });

    app.delete("/api/grades/:id", (req, res) => {
        const { id } = req.params;
        const grade = Database.enrollments.find((g) => g._id === id);
        if (!grade) {
            res.sendStatus(404);
            return;
        }
        Database.grades = Database.grades.filter((g) => g._id !== id);
        res.sendStatus(204);
    });

    app.post("/api/grades", (req, res) => {
        const grade = { ...req.body, _id: new Date().getTime().toString() };
        Database.grades.push(grade);
        res.send(grade);
    });
    app.put("/api/grades/:id", (req, res) => {
        const { id } = req.params;
        const grade = req.body;
        const currentGrade = Database.grades.find((g) => g._id === id);

        if (!currentGrade) {
            res.sendStatus(404);
            return;
        }

        Database.grades = Database.grades.map((g) =>
            g._id === id ? { g, ...grade } : g
        );
        res.sendStatus(204);
    });
}
export default GradeRoutes;
