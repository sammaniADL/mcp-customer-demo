import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

interface Customer {
  customerId: string;
  name: string;
  email: string;
}

interface Order {
  id: string;
  product: string;
  status: string;
}

const customers: Customer[] = [
  {
    customerId: "1001",
    name: "John Smith",
    email: "john@example.com",
  },
  {
    customerId: "1002",
    name: "Jane Doe",
    email: "jane@example.com",
  },
];

const balances: Record<string, number> = {
  "1001": 250.75,
  "1002": 120.5,
};

const orders: Record<string, Order[]> = {
  "1001": [
    {
      id: "ORD-10001",
      product: "Data Package",
      status: "ACTIVE",
    },
    {
      id: "ORD-10002",
      product: "Roaming Package",
      status: "COMPLETED",
    },
  ],
  "1002": [
    {
      id: "ORD-10003",
      product: "Voice Package",
      status: "ACTIVE",
    },
  ],
};

app.get("/customers/:id", (req, res) => {
  const customer = customers.find((item) => item.customerId === req.params.id);

  if (!customer) {
    res.status(404).json({
      error: "Customer not found",
    });
    return;
  }

  res.json(customer);
});

app.get("/customers/:id/balance", (req, res) => {
  const customerId = req.params.id;
  const customerExists = customers.some(
    (item) => item.customerId === customerId
  );

  if (!customerExists) {
    res.status(404).json({
      error: "Customer not found",
    });
    return;
  }

  res.json({
    customerId,
    balance: balances[customerId],
    currency: "USD",
  });
});

app.get("/customers/:id/orders", (req, res) => {
  const customerId = req.params.id;
  const customerExists = customers.some(
    (item) => item.customerId === customerId
  );

  if (!customerExists) {
    res.status(404).json({
      error: "Customer not found",
    });
    return;
  }

  res.json({
    customerId,
    orders: orders[customerId] ?? [],
  });
});

app.listen(PORT, () => {
  console.log(`Customer REST API running at http://localhost:${PORT}`);
});
