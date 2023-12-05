import Database from "../Database/index.js";
function EnrollmentRoutes(app) {
    app.get("/api/enrollments", (req, res) => {
        const enrollments = Database.enrollments;
        res.send(enrollments);
    });

    app.delete("/api/enrollments/:id", (req, res) => {
        const { id } = req.params;
        const enrollment = Database.enrollments.find((e) => e._id === id);
        if (!enrollment) {
            res.sendStatus(404);
            return;
        }
        Database.enrollments = Database.enrollments.filter((e) => e._id !== id);
        res.sendStatus(204);
    });

    app.post("/api/enrollments", (req, res) => {
        const enrollment = { ...req.body, _id: new Date().getTime().toString() };
        Database.enrollments.push(enrollment);
        res.send(enrollment);
    });
    app.put("/api/enrollments/:id", (req, res) => {
        const { id } = req.params;
        const enrollment = req.body;
        const currentEnrollment = Database.enrollments.find((e) => e._id === id);

        if (!currentEnrollment) {
            res.sendStatus(404);
            return;
        }

        Database.enrollments = Database.enrollments.map((e) =>
            e._id === id ? { e, ...enrollment } : e
        );
        res.sendStatus(204);
    });
}
export default EnrollmentRoutes;
