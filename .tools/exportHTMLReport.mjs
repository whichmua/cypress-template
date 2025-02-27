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
    const reportPath = path.join(cucumberJsonDir, 'cucumber_report.json');
    const json = JSON.parse(fs.readFileSync(reportPath));

    if (!Array.isArray(json)) {
      console.error('❌ ERROR: cucumber_report.json is not an array. Check JSON format.');
      return;
    }

    json.forEach(feature => {
      if (!feature || !feature.name) {
        console.warn('⚠ WARNING: Skipping feature with missing name:', feature);
        return;
      }

      const featureTitle = feature.name.trim();
      cucumberReportMap[featureTitle] = feature;
    });

    console.log('✅ Loaded Features:', Object.keys(cucumberReportMap));
  } catch (error) {
    console.error('❌ ERROR: Failed to load cucumber_report.json:', error);
  }
}

function addScreenshots () {
  const prependPathSegment = pathSegment => location => path.join(pathSegment, location);
  const readdirPreserveRelativePath = location => fs.readdirSync(location).map(prependPathSegment(location));
  const readdirRecursive = location => readdirPreserveRelativePath(location)
    .reduce((result, currentValue) => fs.statSync(currentValue).isDirectory()
      ? result.concat(readdirRecursive(currentValue))
      : result.concat(currentValue), []);

  const screenshots = readdirRecursive(path.resolve(screenshotsDir)).filter(file => file.indexOf('.png') > -1);

  const featuresList = Array.from(new Set(screenshots.map(x => {
    const match = x.match(/[\w-_.]+\.feature/g);
    return match ? match[0] : null;
  }).filter(Boolean))); // Remove null values

  featuresList.forEach(featureFile => {
    const featureKey = featureFile.replace('.feature', ''); // Strip `.feature` extension

    // Try direct match first
    let feature = Object.keys(cucumberReportMap).find(f => f === featureKey);

    // If no direct match, match by feature number
    if (!feature) {
      // Extract the feature number from the filename (e.g., "02_APIMock" → "02")
      const featureNumber = featureKey.match(/^\d+/)?.[0];

      if (featureNumber) {
        // Try matching by number, but ensure `f.name` exists and normalize whitespace
        feature = Object.values(cucumberReportMap).find(f => {
          if (!f || !f.name) {
            return false;
          } // Safeguard against undefined properties

          // Remove extra spaces from feature name before extracting the number
          const normalizedFeatureName = f.name.replace(/\s+/g, ' ').trim();
          const jsonFeatureNumber = normalizedFeatureName.match(/^\d+/)?.[0]; // Extract number

          return jsonFeatureNumber === featureNumber;
        });

        if (feature) {
          console.info(chalk.green(`INFO: Matched feature '${feature.name}' for '${featureKey}' based on number '${featureNumber}'.`));
        }
      }

      if (!feature) {
        console.warn(chalk.yellow(`WARNING: Feature '${featureKey}' not found in cucumberReportMap. Available Features -> ${Object.values(cucumberReportMap).map(f => f?.name?.replace(/\s+/g, ' ').trim() || '[UNKNOWN]').join(', ')}`));
        return;
      }
    }

    screenshots.forEach(screenshot => {
      const featureName = typeof feature === 'object' ? feature.name : feature;
      const featureData = cucumberReportMap[featureName];
      // console.log('featureData', featureData);

      if (!featureData) {
        console.warn(chalk.yellow(`WARNING: No data found for feature '${featureName}'. Skipping.`));
        return;
      }

      let featureTitle;
      let scenarioName;

      if (Array.isArray(featureData)) {
        featureTitle = featureData[0]?.name || 'Unknown Feature';
        scenarioName = featureData[0]?.elements?.[0]?.name || 'Unknown Scenario';
      } else if (featureData && typeof featureData === 'object') {
        featureTitle = featureData.name || 'Unknown Feature';
        scenarioName = featureData.elements?.[0]?.name || 'Unknown Scenario';
      } else {
        console.error('featureData is not defined or is not a valid object/array.');
        process.exit(1); // Stop execution if data is invalid
      }

      console.info(chalk.blue('\n    Adding screenshot(s) to HTML report for'));
      console.info(chalk.blue(`    '${featureTitle} - ${scenarioName}'`));

      // Ensure featureData is an array before filtering
      const myScenarios = Array.isArray(featureData[0]?.elements)
        ? featureData[0].elements.filter(e => scenarioName.includes(e.name.replace(/["']/g, '')))
        : [];

      if (!myScenarios.length) {
        console.warn(chalk.yellow(`WARNING: No matching scenario found for '${scenarioName}' in feature '${featureTitle}'. Skipping.`));
        return;
      }

      let foundFailedStep = false;
      myScenarios.forEach(myScenario => {
        if (foundFailedStep) {
          return;
        }
        let myStep;
        if (screenshot.includes('(failed)')) {
          myStep = myScenario.steps.find(
            step => step.result.status === 'failed'
          );
        } else {
          myStep = myScenario.steps.find(
            step => step.name.includes('screenshot')
          );
        }
        if (!myStep) {
          return;
        }

        try {
          const data = fs.readFileSync(path.resolve(screenshot));
          if (data) {
            const base64Image = Buffer.from(data, 'binary').toString('base64');
            if (!myStep.embeddings) {
              myStep.embeddings = [];
            }
            myStep.embeddings.push({ data: base64Image, mime_type: 'image/png' });
            foundFailedStep = true;
          }
        } catch (error) {
          console.error(`Error reading screenshot file: ${screenshot}`, error);
        }
      });

      fs.writeFileSync(
        path.join(cucumberJsonDir, cucumberReportFileMap[featureName]), // Use featureName instead of feature
        JSON.stringify(featureData, null, jsonIndentLevel)
      );
    });
  });
}

function generateReport () {
  if (!fs.existsSync(cucumberJsonDir)) {
    console.warn(chalk.yellow(`WARNING: Folder './${cucumberJsonDir}' not found. REPORT CANNOT BE CREATED!`));
  } else {

    const options = {
      brandTitle: 'Report',
      columnLayout: 1,
      jsonDir: 'report/JSON',
      launchReport: false,
      output: 'report/HTML/cucumber_report.html',
      reportSuiteAsScenarios: true,
      scenarioTimestamp: true,
      theme: 'bootstrap'
    };

    reporter.generate(options);
  }
}