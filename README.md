# MCP Customer Support Demo

## 1. Project Overview

The MCP Customer Support Demo demonstrates how existing REST API operations can be exposed as tools using the **Model Context Protocol (MCP)**.

The project uses Node.js, TypeScript, Express, and the official MCP TypeScript SDK v2.

It consists of two main components:

- **REST API:** Provides customer information, account balances, and order details.
- **MCP Server:** Exposes the REST API operations as MCP tools so that MCP-compatible clients can discover and invoke them.

### Architecture

```text
       MCP Client / MCP Inspector
                  |
             MCP Protocol
                  |
              MCP Server
                  |
          +-------+-------+
          |       |       |
       Customer Balance Orders
          |       |       |
          +-------+-------+
                  |
             HTTP Requests
                  |
             REST API
              Express
                  |
           Sample Customer Data
```

The MCP server communicates with the Express REST API through HTTP requests. When an MCP client invokes a tool, the MCP server calls the corresponding REST endpoint and returns its response.

## 2. Prerequisites

Before running the project, ensure the following are installed:

- Node.js 20 or later
- npm
- Visual Studio Code or another code editor
- A web browser for MCP Inspector

Verify the installed versions:

```bash
node --version
npm --version
```

## 3. Installation

Clone the repository:

```bash
git clone <GITHUB_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd mcp-customer-demo
```

Install the project dependencies:

```bash
npm install
```

If setting up the project from scratch, the dependencies can be installed using:

```bash
npm init -y
npm pkg set type=module

npm install express @modelcontextprotocol/server zod

npm install -D typescript tsx @types/node @types/express
```

## 4. Start the REST API

Start the Express REST API using:

```bash
npm run api
```

The API will run at:

```text
http://localhost:3001
```

The REST API provides the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/customers/:id` | Retrieve customer details |
| GET | `/customers/:id/balance` | Retrieve customer account balance |
| GET | `/customers/:id/orders` | Retrieve customer orders |

Example request:

```http
GET http://localhost:3001/customers/1001
```

Example response:

```json
{
  "customerId": "1001",
  "name": "John Smith",
  "email": "john@example.com"
}
```

Keep the REST API running while testing the MCP server.

## 5. Start MCP Inspector

MCP Inspector is a development tool that allows you to connect to an MCP server, discover available tools, and test tool execution.

Open a new terminal in the project directory and execute:

```bash
npx @modelcontextprotocol/inspector npx tsx src/mcp/server.ts
```

MCP Inspector will start and provide a local URL.

Open the URL in your browser.

Once connected:

1. Navigate to the **Tools** section.
2. View the available MCP tools.
3. Select a tool.
4. Provide the required input.
5. Execute the tool and inspect the response.

Make sure the REST API is already running before invoking the tools.

## 6. Available MCP Tools

The MCP server exposes three tools.

| Tool | Description | REST API Endpoint |
|---|---|---|
| `get_customer` | Retrieves customer information | `GET /customers/:id` |
| `get_balance` | Retrieves customer account balance | `GET /customers/:id/balance` |
| `get_orders` | Retrieves customer order details | `GET /customers/:id/orders` |

### 6.1 get_customer

Retrieves customer information using the customer ID.

**Sample input:**

```json
{
  "customerId": "1001"
}
```

**Expected output:**

```json
{
  "customerId": "1001",
  "name": "John Smith",
  "email": "john@example.com"
}
```

### 6.2 get_balance

Retrieves the account balance of a customer.

**Sample input:**

```json
{
  "customerId": "1001"
}
```

**Expected output:**

```json
{
  "customerId": "1001",
  "balance": 250.75,
  "currency": "USD"
}
```

### 6.3 get_orders

Retrieves the orders associated with a customer.

**Sample input:**

```json
{
  "customerId": "1001"
}
```

**Expected output:**

```json
{
  "customerId": "1001",
  "orders": [
    {
      "id": "ORD-10001",
      "product": "Data Package",
      "status": "ACTIVE"
    },
    {
      "id": "ORD-10002",
      "product": "Roaming Package",
      "status": "COMPLETED"
    }
  ]
}
```

## 7. MCP SDK Version

This project uses the official MCP TypeScript SDK v2.

Installed package:

```text
@modelcontextprotocol/server@2.4.0
```
The SDK provides the functionality required to create the MCP server and register tools.

For additional information, refer to the official SDK documentation:

https://ts.sdk.modelcontextprotocol.io/v2/

## 8. Sample Data and Security Considerations

This project is intended for demonstration and learning purposes.

- It uses sample customer data stored in memory.
- It does not connect to a production database.
- It does not implement production authentication.
- It does not implement customer-level authorization.
- The customer ID supplied to an MCP tool is used to retrieve the corresponding sample data.

**Important:** Input validation does not replace authentication or authorization.

For production implementations, appropriate authentication, customer-level authorization, access controls, and secure error handling must be implemented before exposing customer-related operations.

## 9. Official References

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK v2](https://ts.sdk.modelcontextprotocol.io/v2/)
- [MCP TypeScript SDK GitHub Repository](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Inspector GitHub Repository](https://github.com/modelcontextprotocol/inspector)

---

**Note:** This project is a sample implementation created to demonstrate how existing REST API operations can be exposed and consumed through the Model Context Protocol.