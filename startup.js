const { exec } = require('child_process');

// First, run populatedb.js to seed the database
exec('node ./data/populatedb.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing populatedb.js: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`populatedb.js output: ${stdout}`);

  // After seeding, run the app (your main server)
  exec('node app.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing app.js: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`app.js output: ${stdout}`);
  });
});