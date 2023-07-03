const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4} = require("uuid")
const router = express.Router();

// On définit la destination de stockage de nos fichiers
const upload = multer({ dest: "./public/uploads/" });

// route POST pour recevoir un fichier dont le nom est "avatar"
router.post("/avatar", upload.single("image"), (req, res) => {
  const { originalname } = req.file; // On récupère le nom du fichier
  const { filename } = req.file; // On récupère le nom du fichier

  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err;
      res.send("File uploaded");
    }
  );
});

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

module.exports = router;
