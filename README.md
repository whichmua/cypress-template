# STORYWORKS

## Installation

1. Download and install Visual Studio Code (https://code.visualstudio.com/download)
2. Download and install Node.js (https://nodejs.org/en/download)
3. Download and install Google Chrome (https://www.google.com/intl/en_uk/chrome)
4. Clone this Git repository to your local machine
5. Open up this local instance of the project in Visual Studio Code
6. Install the following extensions from Visual Studio Code Marketplace:

    1. Code Spell Checker (https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
    2. Cucumber (Gherkin) Full Support (https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)
    3. Cypress Fixture-IntelliSense (https://marketplace.visualstudio.com/items?itemName=JosefBiehler.cypress-fixture-intellisense)
    4. Cypress Helper (https://marketplace.visualstudio.com/items?itemName=Shelex.vscode-cy-helper)
    5. Edit csv (https://marketplace.visualstudio.com/items?itemName=janisdd.vscode-edit-csv)
    6. ESLint (https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    7. Excel Viewer (https://marketplace.visualstudio.com/items?itemName=GrapeCity.gc-excelviewer)
    8. Gherkin Beautifier (https://marketplace.visualstudio.com/items?itemName=siarheikuchuk.gherkin-beautifier-vs-code-plugin)
    9. ignore "g" it (https://marketplace.visualstudio.com/items?itemName=Andreabbondanza.ignoregit)
    10. npm (https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)
    11. npm intellisense (https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
    12. open in browser (https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser)
    13. Visual Studio IntelliCode (https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
    14. vscode-icons (https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

7. Open Terminal within Visual Studio Code and install Yarn by running `npm install --global yarn` from the terminal
8. Open Terminal within Visual Studio Code and install the dependencies by running `yarn install` from the terminal
9. Create the reports folders by running `mkdir -p test-results/cypress/{HTML,JSON}` from the terminal
10. Update the reporting config by running `cp ".tools/createTestFromScenario.js" "node_modules/cypress-cucumber-preprocessor/lib/createTestFromScenario.js"` from the terminal
11. To load vscode icons:

Linux & Windows: File > Preferences > File Icon Theme > VSCode Icons

MacOS: Code > Preferences > File Icon Theme > VSCode Icons

12. Quit and repopen Visual Studio Code

## Local Usage

The file 'package.json' contains the commands to run scripts, and these are all declared in 'scripts' object. Each command is run from the terminal and must be prefixed with `yarn`, for example `yarn cypress:test`

1. `cypress:test` Opens the Cypress Test Runner for the Test environment
2. `cypress:stage` Opens the Cypress Test Runner for the Stage environment
3. `cypress:live` Opens the Cypress Test Runner for the Live environment
4. `cypress:test:regression` Runs the feature file(s) tagged with @Regression in a Chrome browser, against the Test environment
5. `cypress:stage:regression` Runs the feature file(s) tagged with @Regression in a Chrome browser, against the Stage environment
6. `cypress:live:regression` Runs the feature file(s) tagged with @Regression in a Chrome browser, against the Live environment
7. `cypress:test:record:regression` Runs the feature file(s) tagged with @Regression in a Chrome browser, against the Test environment, and records using Cypress Dashboard
8. `report` Exports a HTML report (stored in report/HTML) of the last executed test run. A test run must be executed first, before this command can be used.
9. `delete:reports` Delete all reports from the reports folder
<br>
<br>
<br>
*Last updated: 16th November 2021*