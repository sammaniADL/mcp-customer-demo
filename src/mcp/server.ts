import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

const API_BASE_URL = "http://localhost:3001";

const server = new McpServer({
  name: "customer-support",
  version: "1.0.0",
});

server.registerTool(
  "get_customer",
  {
    title: "Get Customer Details",
    description: "Retrieve details for a customer.",
    inputSchema: z.object({
      customerId: z.string().describe("Customer identifier"),
    }),
    annotations: {
      readOnlyHint: true,
    },
  },
  async ({ customerId }) => {
    return fetchCustomerData(`/customers/${encodeURIComponent(customerId)}`);
  }
);

server.registerTool(
  "get_balance",
  {
    title: "Get Customer Balance",
    description: "Retrieve the account balance for a customer.",
    inputSchema: z.object({
      customerId: z.string().describe("Customer identifier"),
    }),
    annotations: {
      readOnlyHint: true,
    },
  },
  async ({ customerId }) => {
    return fetchCustomerData(
      `/customers/${encodeURIComponent(customerId)}/balance`
    );
  }
);

server.registerTool(
  "get_orders",
  {
    title: "Get Customer Orders",
    description: "Retrieve the orders for a customer.",
    inputSchema: z.object({
      customerId: z.string().describe("Customer identifier"),
    }),
    annotations: {
      readOnlyHint: true,
    },
  },
  async ({ customerId }) => {
    return fetchCustomerData(
      `/customers/${encodeURIComponent(customerId)}/orders`
    );
  }
);

async function fetchCustomerData(path: string): Promise<{
  content: { type: "text"; text: string }[];
  isError?: boolean;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`);

    if (!response.ok) {
      return {
        content: [
          {
            type: "text",
            text: `Request failed. HTTP ${response.status}`,
          },
        ],
        isError: true,
      };
    }

    const data: unknown = await response.json();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  } catch {
    return {
      content: [
        {
          type: "text",
          text: "Unable to connect to the customer REST API.",
        },
      ],
      isError: true,
    };
  }
}

void serveStdio(() => server);

console.error("Customer Support MCP server started.");
