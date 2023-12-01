### Test Execution

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
