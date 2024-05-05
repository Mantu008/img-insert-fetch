const express = require("express");
const cors = require("cors");
require("./config");
const content = require("./content");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

app.get("/", (req, resp) => {
  resp.send("i am mantu");
});

//this api is for insert video and img

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniquFileName = Date.now() + "-" + file.originalname;
    return cb(null, file.fieldname + "-" + uniquFileName);
  },
});

const upload = multer({ storage });

app.post("/imgvideo", upload.single("img"), async (req, res) => {
  const title = req.body.title;
  const filename = req.file.filename;
  try {
    const resp = await content.create({ title: title, img: filename });
    res.send("Ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/imgvideo", async (req, resp) => {
  try {
    const data = await content.find({});
    resp.send(data);
  } catch (err) {}
});

app.listen(3000, () => console.log("Server is running"));
