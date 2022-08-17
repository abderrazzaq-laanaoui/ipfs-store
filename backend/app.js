import express from "express";
import cors from 'cors';
import SVG from './db-query.js';
const port = process.env.PORT || 8080;




const app = express();
app.use(cors())
app.use(express.json());



app.get("/", async (req, res) => {
  let data = SVG.getSixImages();
  if (data.items.length > 0) {
    res.send(data)
  } else {
    res.status(404).json({ message: "no data" })
  }
});

app.get("/all", async (req, res) => {
  let data = SVG.getAllImages();
  if (data.length > 0) {
    res.send(data)
  } else {
    res.status(404).json({ message: "no data" })
  }
});

app.get("/:id", async (req, res) => {
  let data = SVG.getSixImages(req.params.id);
  console.log("get group", req.params.id, "with ", data.items.length, "items");

  if (data.items.length > 0) {
    res.send(data)
  }
  else {
    res.status(404).json({ message: "no data" })
  }

});

app.post("/", async (req, res) => {
  console.log("post", req.body)
  SVG.addNewImage(req.body).then((data) => {
    res.json(data);
  }
  ).catch((err) => {
    res.status(500).json(err);
  }
  ).finally(() => {
    res.end();
  });

});

SVG.onready = () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })
}
SVG.create();