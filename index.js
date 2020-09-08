const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  const image = req.query.image;
  if (!image) {
    return res.send("No image specified.");
  }

  const imagePath = path.join(__dirname, image);
  console.log(imagePath);

  if (!fs.existsSync(imagePath)) {
    return res.sendStatus(404);
  }

  const descriptionString = execFileSync("exif", ["-m", imagePath])
    .toString()
    .trim();
  const descriptionObject = descriptionString
    .split("\n")
    .reduce((acc, curr) => {
      const [key, value] = curr.split("\t");
      acc[key] = value;
      return acc;
    }, {});

  return res.json(descriptionObject);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
