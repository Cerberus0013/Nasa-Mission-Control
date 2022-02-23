const PORT = process.env.PORT || 8000;

const app = require("./app");

const { loadPanetsData } = require("./models/planets.model");

const http = require("http");

const server = http.createServer(app);

async function startServer() {
  await loadPanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
