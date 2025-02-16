import fs from 'fs';
import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import realTimeProducts from "./src/routes/realtimeproducts.route.js";
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



const httpServer = app.listen(8080, () => {
    console.log("Servidor corriendo en http://localhost:8080");
});



const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    console.log("Un cliente se ha conectado:", socket.id);
   
    socket.on("disconnect", () => {
        console.log("Un cliente se ha desconectado:", socket.id);
    });

    const productsList = JSON.parse(fs.readFileSync("./src/products.json", 'utf8'));

    socket.emit('home', productsList)
    socket.emit('realtime', productsList)

    
    socket.on('add product', (newProduct) => {
        JSON.stringify(productsList.push(newProduct))
        socketServer.emit('realtime', productsList)
    });
    
    socket.on('delete product', (productId) => {
        const index = productsList.findIndex(product => product.id == productId);
    
        if (index !== -1) {
            productsList.splice(index, 1); 
        }
        socketServer.emit('realtime', productsList);
    });

    socket.on("disconnect", () => {
        console.log("Un cliente se ha desconectado:", socket.id);
    });
});