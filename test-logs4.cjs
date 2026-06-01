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
    try {
      const parsed = JSON.parse(output);
      const logs = parsed.result.structuredContent.logs;
      const lines = logs.split("\n");
      console.log(lines.slice(-30).join("\n"));
    } catch (e) {
      console.log(output);
    }
    child.kill();
  }
});
const request = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "coolify.getLogs",
    arguments: { uuid: "q24hka519k7kdll5av3obn2n" },
  },
};
child.stdin.write(JSON.stringify(request) + "\n");
