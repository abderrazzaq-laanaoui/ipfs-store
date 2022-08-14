const express = require("express");
const { main, get, put } = require("./db-query");
const app = express();
const port = 3000;


var node;
const initApp = async () => {
  node = await main();
  console.log("initializing app...");
}
app.use(express.json());
app.get("/:id", async (req, res) => {
  get(node,req.params.id).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(500).json(err);
  }).finally(() => {
    res.end();
  }
  );
});

app.post("/", async (req, res) => {
 put(node,req.body).then((data) => {
    res.json(data);
  }
  ).catch((err) => {
    res.status(500).json(err);
  }
  ).finally(() => {
    res.end();
  });

});

initApp();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
