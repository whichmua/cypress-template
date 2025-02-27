import reporter from 'cucumber-html-reporter';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const cucumberJsonDir = 'report/JSON/';
const cucumberReportFileMap = {};
const cucumberReportMap = {};
const jsonIndentLevel = 2;
const screenshotsDir = './cypress/screenshots';

getCucumberReportMaps();
addScreenshots();
generateReport();

function getCucumberReportMaps () {
  try {
    const reportFiles = fs.readdirSync(cucumberJsonDir).filter(file => file.endsWith('.json'));

    reportFiles.forEach(file => {
      const reportPath = path.join(cucumberJsonDir, file);
      const json = JSON.parse(fs.readFileSync(reportPath));

      if (!Array.isArray(json)) {
        console.error(`❌ ERROR: '${file}' is not a valid Cucumber JSON report. Skipping.`);
        return;
      }

      json.forEach(feature => {
        if (!feature || !feature.name) {
          console.warn(`⚠ WARNING: Skipping feature in '${file}' with missing name.`);
          return;
        }

        const featureTitle = feature.name.trim();
        cucumberReportMap[featureTitle] = feature;
        cucumberReportFileMap[featureTitle] = file; // ✅ FIX: Ensure mapping is created
      });
    });

    console.log('✅ Loaded Features:', Object.keys(cucumberReportMap));
    console.log('📂 Final Report File Map:', cucumberReportFileMap); // Debugging output

  } catch (error) {
    console.error('❌ ERROR: Failed to load Cucumber report files:', error);
  }
}

function addScreenshots () {
  const readdirRecursive = (location) =>
    fs.readdirSync(location).reduce((result, file) => {
      const fullPath = path.join(location, file);
      return fs.statSync(fullPath).isDirectory()
        ? result.concat(readdirRecursive(fullPath))
        : result.concat(fullPath);
    }, []);

  // Recursively get all PNG screenshots
  const screenshots = readdirRecursive(path.resolve(screenshotsDir)).filter(file => file.endsWith('.png'));

  const featuresList = Array.from(
    new Set(
      screenshots.map((screenshot) => {
        // Extract feature folder name and scenario name correctly
        const relativePath = path.relative(screenshotsDir, screenshot);
        const featureFolder = relativePath.split(path.sep)[0]; // e.g., "02_APIMock.feature"
        const fileName = path.basename(screenshot).replace('(failed)', '').replace('.png', '').trim();
        const match = fileName.split(' -- ');

        return match.length === 2
          ? {
            featureFolder, // Store the feature folder for correct path resolution
            feature: match[0].trim(),
            scenario: match[1].trim(),
            fullPath: screenshot
          }
          : null;
      }).filter(Boolean)
    )
  );

  featuresList.forEach(({ featureFolder, feature: featureKey, scenario: scenarioName, fullPath: screenshotPath }) => {
    let feature = Object.keys(cucumberReportMap).find(f => f.trim().toLowerCase() === featureKey.trim().toLowerCase());

    if (!feature) {
      console.warn(
        chalk.yellow(
          `⚠ WARNING: Feature '${featureKey}' not found in cucumberReportMap. Available Features -> ${Object.keys(cucumberReportMap).join(', ')}`
        )
      );
      return;
    }

    const featureData = cucumberReportMap[feature];

    if (!featureData) {
      console.warn(chalk.yellow(`⚠ WARNING: No data found for feature '${feature}'. Skipping.`));
      return;
    }

    console.info(chalk.blue(`\n🔍 Matching Feature: '${featureKey}'`));
    console.info(chalk.blue(`🔍 Matching Scenario: '${scenarioName}'`));
    console.info(chalk.blue(`🗂️  Available Scenarios for '${featureKey}': ${featureData.elements?.map(e => e.name).join(', ')}`));

    const myScenarios = featureData.elements?.filter(
      (e) => e.name.trim().toLowerCase() === scenarioName.trim().toLowerCase()
    ) || [];

    if (!myScenarios.length) {
      console.warn(chalk.yellow(`⚠ WARNING: No matching scenario found for '${scenarioName}' in feature '${featureKey}'. Skipping.`));
      return;
    }

    let foundFailedStep = false;
    myScenarios.forEach((myScenario) => {
      if (foundFailedStep) {
        return;
      }
      let myStep;
      if (screenshotPath.includes('(failed)')) {
        myStep = myScenario.steps.find((step) => step.result.status === 'failed');
      } else {
        myStep = myScenario.steps.find((step) => step.name.includes('screenshot'));
      }
      if (!myStep) {
        return;
      }

      try {
        if (!fs.existsSync(screenshotPath)) {
          console.error(`❌ ERROR: Screenshot file not found -> ${screenshotPath}`);
          return;
        }

        const data = fs.readFileSync(screenshotPath);
        if (data) {
          const base64Image = Buffer.from(data, 'binary').toString('base64');
          if (!myStep.embeddings) {
            myStep.embeddings = [];
          }
          myStep.embeddings.push({ data: base64Image, mime_type: 'image/png' });
          foundFailedStep = true;
        }
      } catch (error) {
        console.error(`❌ ERROR reading screenshot file '${screenshotPath}':`, error);
      }
    });

    if (!cucumberReportFileMap[featureKey]) {
      console.warn(chalk.yellow(`⚠ WARNING: No report file mapping found for feature '${featureKey}'.`));
      console.log('📂 Debugging Report File Map:', cucumberReportFileMap);
      console.log('🧐 Checking if feature exists in Report File Map ->', Object.keys(cucumberReportFileMap));
      console.log(`🆔 Current Feature Key: '${featureKey}'`);
      return;
    }

    const reportFilePath = path.join(cucumberJsonDir, cucumberReportFileMap[featureKey]);

    // ✅ Step 1: Backup the existing JSON for debugging
    // if (fs.existsSync(reportFilePath)) {
    //   fs.copyFileSync(reportFilePath, reportFilePath + '.backup.json');
    // }

    // ✅ Step 2: Validate JSON format before saving
    try {
      const jsonString = JSON.stringify(featureData, null, jsonIndentLevel);
      JSON.parse(jsonString); // Ensures it's valid before writing

      // ✅ Step 3: Write the file safely
      const reportFilePath = path.join(cucumberJsonDir, cucumberReportFileMap[featureKey]);

      // ✅ Step 1: Backup the existing JSON for debugging
      // if (fs.existsSync(reportFilePath)) {
      //   fs.copyFileSync(reportFilePath, reportFilePath + '.backup.json');
      // }

      // ✅ Step 2: Read existing JSON and merge features correctly
      let existingData = [];
      if (fs.existsSync(reportFilePath)) {
        try {
          existingData = JSON.parse(fs.readFileSync(reportFilePath, 'utf8'));
          if (!Array.isArray(existingData)) {
            console.warn('⚠ WARNING: Existing JSON is not an array. Resetting.');
            existingData = [];
          }
        } catch (error) {
          console.error('❌ ERROR: Failed to read existing JSON. Resetting.', error);
          existingData = [];
        }
      }

      // ✅ Step 3: Ensure featureData is an array before merging
      const featureArray = Array.isArray(featureData) ? featureData : [featureData];

      // ✅ Step 4: Merge existing JSON with new feature data
      const mergedData = [...existingData.filter(f => f.name !== featureKey), ...featureArray];

      try {
        const jsonString = JSON.stringify(mergedData, null, jsonIndentLevel);
        JSON.parse(jsonString); // Validate before writing

        // ✅ Step 5: Write the properly formatted JSON
        fs.writeFileSync(reportFilePath, jsonString);
        console.log(`✅ Successfully updated report file: ${reportFilePath}`);
      } catch (error) {
        console.error(`❌ ERROR: Failed to write valid JSON for '${featureKey}'.`, error);
      }
    } catch (error) {
      console.error(`❌ ERROR: Failed to write valid JSON for '${featureKey}'.`, error);
    }
  });
}

function generateReport () {
  if (!fs.existsSync(cucumberJsonDir)) {
    console.warn(chalk.yellow(`⚠ WARNING: Folder './${cucumberJsonDir}' not found. REPORT CANNOT BE CREATED!`));
    return;
  }

  // ✅ Step 1: Filter out backup files
  const jsonFiles = fs.readdirSync(cucumberJsonDir)
    .filter(file => file.endsWith('.json') && !file.includes('.backup.json')); // Exclude backups

  if (jsonFiles.length === 0) {
    console.error(`❌ ERROR: No valid Cucumber JSON files found in '${cucumberJsonDir}'.`);
    return;
  }

  console.log(`📂 Using JSON files for report: ${jsonFiles.join(', ')}`);

  const options = {
    brandTitle: 'Report',
    columnLayout: 1,
    jsonDir: 'report/JSON',
    launchReport: false,
    output: 'report/HTML/cucumber_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    theme: 'bootstrap',
  };

  reporter.generate(options);
}