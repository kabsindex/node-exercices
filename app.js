const express = require("express");
app = express();
const port = 3000;

app.get("/home", (req, res) => {
  res.status(200).sendFile("public/home.html", { root: __dirname });
});
app.get("/appropos", (req, res) => {
  res.status(200).sendFile("public/appropos.html", { root: __dirname });
});
app.get("/service", (req, res) => {
  res.status(200).sendFile("public/service.html", { root: __dirname });
});
app.get("/", (req, res) => {
  res.status(200).sendFile("public/home.html", { root: __dirname });
});
app.use((req, res) => {
  res.sendFile("public/404.html", { root: __dirname });
});
app.listen(port, () => {
  try {
    console.log(`Le server tourne sur le port ${port}`);
  } catch (error) {
    console.log("une erreur se produite", error);
  }
});
