const http = require("http");
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasaApi:HjGytMavrUmCp3qK@cluster0.kh3at.mongodb.net/nasa?retryWrites=true&w=majority";

const app = require("./app");

const { loadPanetsData } = require("./models/planets.model");


const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready')
});

mongoose.connection.on('error', (err)=> {
  console.error(err)
})

async function startServer() {
  await mongoose.connect(MONGO_URL)
  await loadPanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
