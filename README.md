# playwright-project

## Setup & Execution

### Preliminary Setup

If it is your first time running the tests, run the following:

Install NVM  (if you don't have it already installed):

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`


Github Reference: https://github.com/nvm-sh/nvm

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Clone the repository:

`git clone git@github.com:mahtabnejad90/playwright-project.git`

Redirect your terminal path into the cloned playwright-project for the rest of the terminal commands:

`cd your-local-path/playwright-project`

Copy the env.example file template from env/env.example to `env/env` (in the same directory), and then fill in the values in `env/env`:

Terminal copy command - `cp env/env.example env/env.env`

Source your environment variable file with this command - `source env/env.evn`

Install project node version:

`nvm install v20.8.0`

`nvm use`

Clean out any cached npm dependencies

`npm cache clean --force`

Install the browsers required to launch the tests:

`npx playwright install`

### Test Execution

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

