const express = require("express");
const cors = require("cors");
const app = express();
const port = 8090;

app.use(cors());
app.use(express.json());


const mercadoPagoPixRoutes = require("./routes/mercadoPagoPIxRoutes");
app.use("/v1", mercadoPagoPixRoutes)


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

