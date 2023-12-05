import Database from "../Database/index.js";
function ModuleRoutes(app) {
    app.get("/api/modules", (req, res) => {
        const modules = Database.modules;
        res.send(modules);
    });

    app.delete("/api/modules/:id", (req, res) => {
        const { id } = req.params;
        const module = Database.modules.find((m) => m._id === id);
        if (!module) {
            res.sendStatus(404);
            return;
        }
        Database.modules = Database.modules.filter((m) => m._id !== id);
        res.sendStatus(204);
    });

    app.post("/api/modules", (req, res) => {
        const module = { ...req.body, _id: new Date().getTime().toString() };
        Database.modules.push(module);
        res.send(module);
    });
    app.put("/api/modules/:id", (req, res) => {
        const { id } = req.params;
        const module = req.body;
        const currentModule = Database.modules.find((m) => m._id === id);

        if (!currentModule) {
            res.sendStatus(404);
            return;
        }

        Database.modules = Database.modules.map((m) =>
            m._id === id ? { m, ...module } : m
        );
        res.sendStatus(204);
    });
}
export default ModuleRoutes;
