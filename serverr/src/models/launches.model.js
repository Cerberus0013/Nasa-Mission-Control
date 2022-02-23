
const launches = new Map()

let latestFlightNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Keplar-x',
    rocket: "Explorer",
    launchDate: new Date(),
    destination:'keplar-442 b',
    customers: ['Nasa', 'OSHA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch)

function getAllLaunches(){
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
latestFlightNumber++
launches.set(
  latestFlightNumber,
  Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customers: ["Nasa", "ZTM"],
    upcoming: true,
    success: true,
  })
);
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
}