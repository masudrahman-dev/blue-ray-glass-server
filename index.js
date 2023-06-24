const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const port = 5000 || process.env.PORT;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3cwhptm.mongodb.net/?retryWrites=true&w=majority`;

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
      .db("blue-ray-glass-db")
      .collection("products");
    const cartsCollection = client.db("blue-ray-glass-db").collection("carts");
    // ----------------------------------------------------------------------------------
    app.get("/products", async (req, res) => {
      try {
        const tab = req.query.tab;
        const limit = parseInt(req.params.limit) || 10;
        const page = parseInt(req.params.page) || 1;
        const skip = (page - 1) * limit;
        console.log({ limit, page, skip });

        let query = {}; // Empty query object to fetch all products
        if (tab === "express") {
          query = { shipment: tab };
        } else if (tab === "regular") {
          query = { shipment: tab };
        }
        console.log(tab);
        const result = await productsCollection
          .find(query)
          .limit(limit)
          .skip(skip)
          .toArray();
        res.status(200).send(result);
      } catch (error) {
        console.error("Error retrieving items:", error);
        res.status(500).send("An error occurred");
      }
    });

    app.post("/products", async (req, res) => {
      try {
        const result = await productsCollection.insertOne({});
        res.status(200).send(result);
      } catch (error) {
        console.error("Error retrieving items:", error);
        res.status(500).send("An error occurred");
      }
      console.log("insert");
    });

    // --------------------------------------------------------------------
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
    app.get("/", async (req, res) => {
      res.send(`<h1>Server is Running...</h1>`);
    });
    app.listen(port, () => {
      console.log(`Example app listening on http://localhost:${port}`);
    });
  }
}
run().catch(console.dir);
