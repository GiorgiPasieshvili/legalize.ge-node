import express, { response } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fetch from "node-fetch";
import * as fs from "fs";
import bodyParser from "body-parser";
import multer from "multer";

import convertLetters from "./assets/js/convertLetters.js";
import generateQR from "./assets/js/generateQR.js";

const app = express();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/serverImages");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: fileStorageEngine });
const port = 3000;
const hostname = "http://127.0.0.1:3000";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set("view engine", "pug");

app.use("/assets", express.static("assets"));
app.use("/generate", express.static("generate"));

app.listen(port, "127.0.0.1", () =>
  console.log(`Server running at ${hostname}`)
);

(async () => {
  const usersResponse = await fetch(`${hostname}/assets/js/users.json`);
  const users = await usersResponse.json();

  const statusResponse = await fetch(`${hostname}/assets/js/statuses.json`);
  const statuses = await statusResponse.json();

  // Home Page Route
  app.get("/", (req, res) => {
    res.render(__dirname + "/snippet/index", {
      arr: users.data,
    });
  });

  // Users Page Route
  app.get("/users", (req, res) => {
    res.render(__dirname + "/snippet/users", {
      arr: users.data,
    });
  });

  function statusToClass(word) {
    return statuses[word.replace(" ", "_")].replace(" ", "")
  }

  function statusToEngStatus(word) {
    return statuses[word.replace(" ", "_")]
  }

  // User Cards Page Route
  app.get("/user/:id", (req, res) => {
    const data = users.data[req.params.id];

    const engData = {
      name: convertLetters(data.name),
      surname: convertLetters(data.surname),
      status: statusToEngStatus(data.status),
      class: statusToClass(data.status),
      fullStatusClasses: [statusToClass(data.status), ...data.other_statuses.map(word => statusToClass(word))]
    };
    (async () => {
      const QRValue = await generateQR(`${hostname}/user/${req.params.id}`);
      res.render(__dirname + "/snippet/profile", {
        data,
        engData,
        QRValue,
      });
    })();
  });

  // Customize Cards Page Routes
  app.get("/custom-card", (req, res) => {
    let data = {
      name: "სახელი",
      surname: "გვარი",
      id_number: "0100101010",
      birth_date: "08/04/2000",
      status: "გროუერი",
      validation: "01/09/2030",
      other_statuses: ["დამფუძნებელი", "ოქროს ინვესტორი"]
    };
    const engData = {
      name: "name",
      surname: "surname",
      status: "grower",
      class: "grower",
      card_number: 1000,
      fullStatusClasses: [statusToClass(data.status), ...data.other_statuses.map(word => statusToClass(word))]
    };

    (async () => {
      const QRValue = await generateQR(`legalize.ge`);

      res.render(__dirname + "/snippet/custom-card", {
        data,
        engData,
        QRValue,
        image: `./assets/img/girchi.png`,
      });
    })();
  });

  app.post(
    "/custom-card",
    [urlencodedParser, upload.single("image")],
    (req, res) => {
      const engData = {
        name: convertLetters(req.body.name),
        surname: convertLetters(req.body.surname),
        status: statuses[req.body.status],
        class: statuses[req.body.status.replace(" ", "_")].replace(" ", ""),
        card_number: 1000,
      };

      (async () => {
        const QRValue = await generateQR(`legalize.ge`);
        res.render(__dirname + "/snippet/custom-card", {
          data: req.body,
          engData,
          QRValue,
          image: `./assets/serverImages/${req.file.originalname}`,
        });
      })();
    }
  );

  // Countitution Page Route
  app.get("/constitution", (req, res) => {
    res.render(__dirname + "/snippet/constitution");
  });

  // Create Post Page Routes
  app.get("/create-post", (req, res) => {
    res.render(__dirname + "/snippet/create-post");
  });

  app.post("/post", [urlencodedParser, upload.single("image")], (req, res) => {
    res.render(__dirname + "/snippet/post-success", {
      data: req.body,
      image: `./assets/serverImages/${req.file.originalname}`,
    });
  });

  // Download PDFs Page Route
  app.get("/cards-download", (req, res) => {
    let PDFDirectory = fs.readdirSync("generate/pdf");
    res.render(__dirname + "/snippet/card-download", { PDFDirectory });
  });
})();
