const cron = require('node-cron');
const { exec } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, 'crawling.py'); // same directory

// Schedule: every Monday at 00:00
cron.schedule('0 0 * * 1', () => {
  console.log('Running weekly Python script...');

  exec(`python3 "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(` Script stderr: ${stderr}`);
      return;
    }
    console.log(`Script output:\n${stdout}`);
  });
});
