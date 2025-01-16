const { exec } = require("child_process");

// Run the populatedb script
require("./data/populatedb");

// Start the app
require("./app");