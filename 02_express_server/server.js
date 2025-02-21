import express from "express";

const app = express();
const port = 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Coffee Inventory Management System!");
});

let inventory = [];

let id = 1;

app.post("/inventory", (req, res) => {
  try {
    const items = Array.isArray(req.body) ? req.body : [req.body];
    items.forEach((item) => {
      item.stockStatus = item.stock < 100 ? "Low Stock" : "In Stock";
      item.id = id++;
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

app.get("/inventory/:id", (req, res) => {
  console.log(req.params.id);
  const item = inventory.find((item) => item.id === parseInt(req.params.id));

  if (!item) {
    res.status(404).send("Item not found");
  }
  res.status(200).send(item);
});

app.patch("/inventory/:id", (req, res) => {
  let itemIndex = inventory.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );

  if (itemIndex === -1) {
    res.status(404).send("Item not found");
  }

  const item = inventory[itemIndex];

  if (req.body.name) item.name = req.body.name;
  if (req.body.stock !== undefined) {
    item.stock = req.body.stock;
    item.stockStatus = item.stock < 100 ? "Low Stock" : "In Stock";
  }
  if (req.body.remark) item.remark = req.body.remark;

  res.status(200).send("Item updated successfully");
});

app.delete("/inventory/:id", (req, res) => {
  let itemIndex = inventory.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );

  if (itemIndex === -1) {
    res.status(404).send("Item not found");
  }

  inventory.splice(itemIndex, 1);

  res.status(200).send("item deleted sucessfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
