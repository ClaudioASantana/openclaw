const { spawn } = require("child_process");
const child = spawn("/home/claud/.npm/_npx/e0bf66cd6f465425/node_modules/.bin/coolify-mcp", [], {
  stdio: ["pipe", "pipe", "inherit"],
  env: {
    ...process.env,
    COOLIFY_BASE_URL: "http://46.202.146.149:8000/api/v1",
    COOLIFY_TOKEN: "7|dRp5udbWNZFm2wWOuXMeWlx569mGSIELmnBwI2nOec9e4bdd",
  },
});
let output = "";
child.stdout.on("data", (data) => {
  output += data.toString();
  if (output.includes("jsonrpc")) {
    console.log("Received:", output);
    child.kill();
  }
});
const request = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "coolify.getLogs",
    arguments: { uuid: "wlyupeu77uo7xqrbft4k3233" },
  },
};
child.stdin.write(JSON.stringify(request) + "\n");
