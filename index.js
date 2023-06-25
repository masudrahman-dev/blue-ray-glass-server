const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://masudrahmandev:kSjiT9ZwPYQTKszx@cluster0.iuh6vbb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();
    // Send a ping to confirm a successful connection
    client.db("admin").command({ ping: 1 });

    const productsCollection = client
      .db("blue-ray-glass")
      .collection("products");
    // ----------------------------------------------------------------------
    app.post("/products", async (req, res) => {
      try {
        const body = req.body;
        const result = await productsCollection.insertOne(body);
        // console.log(result);
        res.status(200).json({ message: "Product added successfully" });
      } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "Failed to add product" });
      }
    });
    app.get("/test", async (req, res) => {
      try {
        const result = await productsCollection.find({}).toArray();
        // console.log(result);
        res.status(200).json(result);
      } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "Failed to retrieve products" });
      }
    });

    app.get("/products", async (req, res) => {
      try {
        const tab = req.query.tab;
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;
        // console.log({ limit, page, skip });
        let query = {};
        if (tab === "express") {
          query = { shipment: "express" };
        } else if (tab === "regular") {
          query = { shipment: "regular" };
        }
        const count = await productsCollection.countDocuments();
        const totalPages = Math.ceil(count / limit);
        const products = await productsCollection
          .find(query)
          .limit(limit)
          .skip(skip)
          .toArray();

        res.status(200).json({ products, totalPages });
      } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ message: "An error occurred" });
      }
    });
    app.delete("/products/:id", async (req, res) => {
      try {
        const id = req.params.id;
        // console.log(id);
        const query = { _id: new ObjectId(id) };
        const result = await productsCollection.deleteOne(query);
        res.status(200).json(result);
      } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Failed to delete product" });
      }
    });

    // ##############################################################
    app.get("/", (req, res) => {
      res.send(`<h1>Server is Running...</h1>`);
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    app.listen(port, () => {
      console.log(`Example app listening on http://localhost:${port}`);
    });
  }
}
run().catch(console.dir);
