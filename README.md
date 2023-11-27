# playwright-project

## Setup & Installation Guide

### Preliminary Setup

#### 1 - Global dependencies prequisites

In order to be able to setup this project and execute the tests, you are required to download and install global dependencies

***Install NVM***:

NVM is used to quickly install one or more node dependencies via the command line

Installation terminal command - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```
Github Reference: https://github.com/nvm-sh/nvm

***Install & Setup Git and Github***

Prior to exectuting the git commands, ensure that you have git installed with Github SSH configured on your local machine.

Download and install git package from: https://git-scm.com/downloads

Instructions for Connecting to GitHub with SSH (GitHub account required): https://docs.github.com/en/authentication/connecting-to-github-with-ssh

#### 2 - Repository Setup

Clone the repository using the following command:

`git clone git@github.com:mahtabnejad90/playwright-project.git`

Redirect your terminal path into the cloned playwright-project for the rest of the setup:

`cd your-local-path/playwright-project`

#### 3 - Environment variables

Copy the env.example file template from env/env.example to `env/env` (in the same directory), and then fill in the values in `env/env`:

Terminal copy command - `cp env/env.example env/env.env`

Source your environment variable file with this command - `source env/env.evn`

#### 4 - Project level dependencies

Install project node version:

`nvm install v20.8.0`

`nvm use`

Clean out any cached npm dependencies

`npm cache clean --force`

Install the browsers required to launch the tests:

`npx playwright install`

## Test Execution

### Running all tests locally

To run tests on all browsers in headless mode, execute the following command:

`npx playwright test --grep @local`

To run tests on all browsers in headed mode, execute the following command:

`npx playwright test --grep @local --headed`

To run tests on individual browsers in headless mode, execute either of the following commands:

***Chromium browser:***

`npx playwright test --project=Chromium --grep @local`

***Firefox browser:***

`npx playwright test --project=Firefox --grep @local`

***Safari (webkit) browser:***

`npx playwright test --project=Webkit --grep @local`

***Edge (webkit) browser:***

`npx playwright test --project=Edge --grep @local`

To run tests on individual browsers in headed mode, execute either of the following commands:

***Chromium browser:***

`npx playwright test --project=Chromium --grep @local --headed`

***Firefox browser:***

`npx playwright test --project=Firefox --grep @local --headed`

***Safari (webkit) browser:***

`npx playwright test --project=Webkit --grep @local --headed`

***Edge (webkit) browser:***

`npx playwright test --project=Edge --grep @local --headed`

### Using grep tags to execute tests

To run specific test/s against multiple browsers or a single browser, you can specify custom tag/s in the given test block like this:

***Headed mode:***
```javascript  
    test('@customTag example test description', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
  })
```

Then execute the test using either of the following commands:

***Headed mode:***

`npx playwright test --project=**BrowserName** --grep @customTag --headed`

`npx playwright test --grep @customTag --headed`

***Headless mode:***

`npx playwright test --project=**BrowserName** --grep @customTag`

`npx playwright test --grep @customTag`

Note: replace `**BrowserName**` with the actual valid browser value such as; `Chromium`, `Firefox`, `Webkit` or `Edge`

## Debugging

In order to debug your test/s, you can use the `--debug` flag at the end of your test execution command. This flag will pop up the playwright inspector and will allow you to debug your test/s step by step.