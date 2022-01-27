import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    response.send("<h1>Hello World</h1>");
});

export default app;
