import Database from "../Database/index.js";
function AssignmentRoutes(app) {
  app.get("/api/assignments", (req, res) => {
    const assignments = Database.assignments;
    res.send(assignments);
  });

  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = Database.assignments.find((a) => a._id === id);
    if (!assignment) {
      res.sendStatus(404);
      return;
    }
    Database.assignments = Database.assignments.filter((a) => a._id !== id);
    res.sendStatus(204);
  });

  app.post("/api/assignments", (req, res) => {
    const assignment = { ...req.body, _id: new Date().getTime().toString() };
    Database.assignments.push(assignment);
    res.send(assignment);
  });
  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = req.body;
    const currentAssignment = Database.assignments.find((a) => a._id === id);

    if (!currentAssignment) {
      res.sendStatus(404);
      return;
    }

    Database.assignments = Database.assignments.map((a) =>
      a._id === id ? { a, ...assignment } : a
    );
    res.sendStatus(204);
  });
}
export default AssignmentRoutes;
