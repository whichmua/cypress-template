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
  const files = fs.readdirSync(cucumberJsonDir).filter(file => {
    return file.indexOf('.json') > -1;
  });
  files.forEach(file => {
    const json = JSON.parse(
      fs.readFileSync(path.join(cucumberJsonDir, file))
    );
    if (!json[0]) {
      return;
    }
    const [feature] = json[0].uri.split('/').reverse();
    cucumberReportFileMap[feature] = file;
    cucumberReportMap[feature] = json;
  });
}

function addScreenshots () {
  const prependPathSegment = pathSegment => location => path.join(pathSegment, location);
  const readdirPreserveRelativePath = location => fs.readdirSync(location).map(prependPathSegment(location));
  const readdirRecursive = location => readdirPreserveRelativePath(location)
    .reduce((result, currentValue) => fs.statSync(currentValue).isDirectory()
      ? result.concat(readdirRecursive(currentValue))
      : result.concat(currentValue), []);
  const screenshots = readdirRecursive(path.resolve(screenshotsDir)).filter(file => {
    return file.indexOf('.png') > -1;
  });
  const featuresList = Array.from(new Set(screenshots.map(x => x.match(/[\w-_.]+\.feature/g)[0])));
  featuresList.forEach(feature => {
    screenshots.forEach(screenshot => {
      const featureTitle = cucumberReportMap[feature][0].name;
      const regex = /(?<=-- ).+?((?= \(example #\d+\))|(?= \(failed\))|(?=\.\w{3}))/g;
      const [scenarioName] = screenshot.match(regex);
      console.info(chalk.blue('\n    Adding screenshot(s) to HTML report for'));
      console.info(chalk.blue(`    '${featureTitle} - ${scenarioName}'`));
      const myScenarios = cucumberReportMap[feature][0].elements.filter(
        e => scenarioName.includes(e.name.replace(/["']/g, ''))
      );
      if (!myScenarios) {
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
        const data = fs.readFileSync(
          path.resolve(screenshot)
        );
        if (data) {
          const base64Image = Buffer.from(data, 'binary').toString('base64');
          if (!myStep.embeddings) {
            myStep.embeddings = [];
            myStep.embeddings.push({ data: base64Image, mime_type: 'image/png' });
            foundFailedStep = true;
          }
        }
      });
      fs.writeFileSync(
        path.join(cucumberJsonDir, cucumberReportFileMap[feature]),
        JSON.stringify(cucumberReportMap[feature], null, jsonIndentLevel)
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