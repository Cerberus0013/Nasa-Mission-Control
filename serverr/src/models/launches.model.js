const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");
const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Keplar-x",
  rocket: "Explorer",
  launchDate: new Date(),
  target: "Kepler-442 b",
  customers: ["Nasa", "OSHA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function getLatestFlightNumber(){
  const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');
 
  if(!latestLaunch){
      return DEFAULT_FLIGHT_NUMBER
  }

  return latestLaunch.flightNumber
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function scheduleNewLaunch(){
  const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
       customers: ["Nasa", "ZTM"],
       upcoming: true,
       success: true,
       flightNumber: newFlightNumber,
    })
    await saveLaunch(newLaunch)
}

// function addNewLaunch(launch) {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       flightNumber: latestFlightNumber,
//       customers: ["Nasa", "ZTM"],
//       upcoming: true,
//       success: true,
//     })
//   );
// }

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target
  });

  if (!planet) {
    throw new Error("No Matching planet was found");
  }
  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
