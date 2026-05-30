const { spawn } = require("child_process");
const child = spawn("/home/claud/.npm/_npx/e0bf66cd6f465425/node_modules/.bin/coolify-mcp", [], {
  stdio: ["pipe", "pipe", "inherit"],
});
child.stdout.on("data", (data) => {
  console.log("Received:", data.toString());
  // exit after first response
  child.kill();
});
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
