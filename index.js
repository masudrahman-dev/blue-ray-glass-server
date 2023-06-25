const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3cwhptm.mongodb.net/?retryWrites=true&w=majority`;

// const uri =
//   "mongodb+srv://masudrahmandev:8jGTWyRuSKXTH5ws@cluster0.3cwhptm.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     client.connect();
//     client.db("admin").command({ ping: 1 });
//     const productsCollection = client
//       .db("blue-ray-glass-db")
//       .collection("products");

//     app.get("/products", async (req, res) => {
//       try {
//         const result = await productsCollection.find().toArray();
//         res.send(result);
//       } catch (error) {
//         res.send("An error occurred");
//       }
//     });

//     app.get("/", async (req, res) => {
//       res.send("<h1>Server is Running...</h1>");
//     });

//     app.listen(port, () => {
//       console.log(`Example app listening on http://localhost:${port}`);
//     });

//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

// run().catch(console.dir);

// ######################################################
// test code

app.get("/products", (req, res) => {
  res.send(`<h1>products route is Running...</h1>`);
});

app.get("/", (req, res) => {
  res.send(`<h1>Server is Running...</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

// app.get("/products", async (req, res) => {
//   try {
//     // console.log(data);
//     const tab = req.query.tab;
//     const limit = parseInt(req.params.limit) || 10;
//     const page = parseInt(req.params.page) || 1;
//     const skip = (page - 1) * limit;
//     // console.log({ limit, page, skip });

//     let query = {}; // Empty query object to fetch all products
//     if (tab === "express") {
//       query = { shipment: tab };
//     } else if (tab === "regular") {
//       query = { shipment: tab };
//     }
//     // console.log(tab);
//     const parseData = JSON.parse(data);
//     const result = await parseData.find(query).limit(limit).skip(skip).toArray();
//     res.status(200).send(result);
//   } catch (error) {
//     console.error("Error retrieving items:", error);
//     res.status(500).send("An error occurred");
//   }
// });
