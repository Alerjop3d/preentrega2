import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import realTimeProducts from "./src/routes/realtimeproducts.route.js";
import productsRoute from "./src/routes/products.route.js";
import homeRoute from "./src/routes/home.route.js"; // Corregir la ruta de importación
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src", "views")); // Usar __dirname para la ruta de las vistas
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/home", homeRoute);
app.use("/realtimeproducts", realTimeProducts);
app.use("/api/products", productsRoute);


const httpServer = app.listen(8080, () => {
    console.log("Servidor corriendo en http://localhost:8080");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    console.log("Un cliente se ha conectado:", socket.id);

    socket.emit("home", { message: "Bienvenido a la página de inicio" });

    socket.on("clientEvent", (data) => {
        console.log("Mensaje desde el cliente:", data);
    });

    socket.on("disconnect", () => {
        console.log("Un cliente se ha desconectado:", socket.id);
    });
});