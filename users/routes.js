import Database from "../Database/index.js";
function UserRoutes(app) {
    app.get("/api/users", (req, res) => {
        const users = Database.users;
        res.send(users);
    });

    app.delete("/api/users/:id", (req, res) => {
        const { id } = req.params;
        const user = Database.users.find((u) => u._id === id);
        if (!user) {
            res.sendStatus(404);
            return;
        }
        Database.users = Database.users.filter((u) => u._id !== id);
        res.sendStatus(204);
    });

    app.post("/api/users", (req, res) => {
        const user = { ...req.body, _id: new Date().getTime().toString() };
        Database.users.push(user);
        res.send(user);
    });
    app.put("/api/users/:id", (req, res) => {
        const { id } = req.params;
        const user = req.body;
        const currentUser = Database.enrollments.find((u) => u._id === id);

        if (!currentUser) {
            res.sendStatus(404);
            return;
        }

        Database.users = Database.users.map((u) =>
            u._id === id ? { u, ...user } : u
        );
        res.sendStatus(204);
    });
}
export default UserRoutes;
