app.get("/products", async (req, res) => {
  try {
    const tab = req.query.tab;
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    let query = {}; // Empty query object to fetch all products

    if (tab === "regular") {
      query = { shipment_regular: "regular" }; // Query to fetch regular orders
    } else if (tab === "express") {
      query = { shipment_express: "express" }; // Query to fetch express orders
    }

    const totalProducts = await productsCollection.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / pageSize);
    console.log({ tab, page, pageSize, totalProducts, totalPages });
    const result = await productsCollection
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    res.status(200).json({
      totalProducts,
      totalPages,
      currentPage: page,
      pageSize,
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).send("An error occurred");
  }
});

app.get("/products", async (req, res) => {
  try {
  
    const tab = req.query.tab;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    let query = {};
    if (tab === "express" || tab === "regular") {
      query = { shipment: tab };
    }

    const resultCursor = productsCollection.find(query).limit(limit).skip(skip);

    res.setHeader("Content-Type", "application/json");
    resultCursor.stream().pipe(res);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).send("An error occurred");
  }
});
