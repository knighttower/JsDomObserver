const { execSync } = require('child_process');

/**
 * Function to run shell command and return its output
 * @param {string} command - The shell command to run
 * @param {string} stdio - The stdio setting ('inherit' or 'pipe')
 * @returns {string|boolean} - The stdout as a string or boolean indicating success/failure
 */
const runCommand = (command, returnOutput = false) => {
  try {
    const options = { encoding: 'utf8', stdio: 'inherit' };
    if (returnOutput) {
      options.stdio = 'pipe';
    }
    
    const stdout = execSync(command, options);
    return stdout;
  } catch (error) {
    console.log(`Error executing command: ${command}`, error);
    return false;
  }
};

/**
 * Function to check if npm script exists
 * @param {string} scriptName - The npm script name to check
 * @returns {boolean} - True if script exists, otherwise false
 */
const checkNpmScript = (scriptName) => {
  const npmScripts = runCommand('npm run-script', true);
  return npmScripts ? npmScripts.includes(scriptName) : false;
};

// Main function
const main = () => {
  // Check if npm is installed
  if (runCommand('npm -v', true)) {
    // Check if the "build" script is available
    if (checkNpmScript('build')) {
      runCommand('npm run build');
    } else if (checkNpmScript('production')) {
      // Check if the "production" script is available
      runCommand('npm run production');
    } else {
      console.log("Neither 'build' nor 'production' npm scripts are available.");
    }
  } else {
    console.log('npm is not installed.');
  }
};

main();
