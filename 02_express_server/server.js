import express from "express";

const app = express();
const port = 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Coffee Inventory Management System!");
});

let inventory = [];

app.post("/inventory", (req, res) => {
  try {
    const items = Array.isArray(req.body) ? req.body : [req.body];
    items.forEach((item) => {
      item.stockStatus = item.stock < 100 ? "Low Stock" : "In Stock";
      inventory.push(item);
    });
    res.status(201).send("Item(s) added to inventory successfully");
  } catch (error) {
    console.error("Error adding item to inventory:", error);
    res.status(400).send("Error adding item to inventory");
  }
});

app.get("/inventory", (req, res) => {
  res.status(200).send(inventory);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
