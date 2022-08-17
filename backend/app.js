const express = require("express");
var cors = require('cors')

const { main, get, put, getLastGrp } = require("./db-query");
var node;
const port = process.env.PORT || 8080;


const initApp = async () => {
  node = await main();
  console.log("initializing app...");
}

const app = express();
app.use(cors())
app.use(express.json());




app.get("/", async (req, res) => {
  getLastGrp(node).then((data) => {
    data ? res.json(data) : res.status(404).json({ message: "no data" });
  }).catch((err) => {
    res.status(500).json(err);
  }).finally(() => {
    res.end();
  }
  );
});

app.get("/:id", async (req, res) => {
  get(node, req.params.id).then((data) => {
    data ? res.json(data) : res.status(404).json({ message: "not found" });
  }).catch((err) => {
    res.status(500).json(err);
  }).finally(() => {
    res.end();
  }
  );
});

app.post("/", async (req, res) => {
  put(node, req.body).then((data) => {
    res.json(data);
  }
  ).catch((err) => {
    res.status(500).json(err);
  }
  ).finally(() => {
    res.end();
  });

});

initApp().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })
});