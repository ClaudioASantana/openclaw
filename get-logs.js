const { spawn } = require("child_process");

const child = spawn(
  "node",
  ["/home/claud/.npm/_npx/e0bf66cd6f465425/node_modules/.bin/coolify-mcp"],
  {
    stdio: ["pipe", "pipe", "inherit"],
  },
);

let buffer = "";

child.stdout.on("data", (data) => {
  buffer += data.toString();
  // Try to parse full JSON-RPC lines
  const lines = buffer.split("\n");
  buffer = lines.pop(); // Keep incomplete line in buffer

  for (const line of lines) {
    if (line.trim()) {
      try {
        const response = JSON.parse(line);
        console.log(JSON.stringify(response, null, 2));
      } catch (e) {
        console.log("Raw output:", line);
      }
    }
  }
});

// 1. List applications to get the UUID
const request = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "coolify.listApplications",
    arguments: {},
  },
};

child.stdin.write(JSON.stringify(request) + "\n");
