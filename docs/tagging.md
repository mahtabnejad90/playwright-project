# Tags Utility Documentation

## Overview
The `Tags` utility in this Playwright project is designed to streamline the process of tagging tests for different testing environments and functional areas. It offers an organized way to categorize tests, making them more manageable and easily identifiable based on their purpose and the environment they are intended for.

## Usage
The `Tags` class provides the `getTags` static method, which is used to generate a string of tags for a given test. This method allows for the specification of functional areas and the ability to enable or disable tests in certain environments (CI and local).

Example usage in a test:

```javascript
test('Generic Scenarios for Booking Website' + 
Tags.getTags(Tags.e2e, { disableCi: false, disableLocal: false }));
```
## Method Details

- `getTags(functionalArea?: string, disableTags?: { disableCi?: boolean; disableLocal?: boolean; }): string`
    - Parameters:
        - functionalArea: (Optional) A string representing the functional area of the test (e.g., e2e, ui, integration, etc.).
        - disableTags: (Optional) An object with boolean properties disableCi and disableLocal to control test execution in Continuous Integration (CI) and local environments.
    - Return Value: A string of active tags, prefixed with a hyphen and separated by commas for readability.

## Functional Area Tags
The Tags class includes predefined static properties representing different functional areas such as e2e, ui, integration, api, and specific domains like flights, hotels, login, etc. These can be used to categorize tests more specifically.

## Disabling Tests
The disableTags parameter in getTags allows for selective disabling of tests in certain environments. For example, setting disableCi to true will exclude the test from being run in the CI environment.

## Extensibility
The structure of the Tags utility is designed for easy extension. Additional functional areas or environments can be added as needed by defining new static properties or modifying the getTags method.

