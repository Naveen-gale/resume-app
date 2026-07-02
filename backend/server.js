import "dotenv/config";
import connectdb from "./src/db/db.js";
import app from "./src/app.js";
import dns from "dns";
dns.setServers(["[1.1.1.1]", "[8.8.8.8]"]);

const PORT = process.env.PORT || 3000;

connectdb()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is running successfully");
        });
    })
    .catch((err) => {
        console.error("Failed to connect to database:", err);
        process.exit(1);
    });