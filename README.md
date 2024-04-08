# TS-Cucumber-Playwright Test Automation Framework 
This project was created to demonstrate an implementation of main components on a BDD test automation framework for a web application. Typescript, Cucumber and Playwright were used.
:camera
> [Here 🎬](https://youtu.be/XuX5oYNQKcc) is the video of test execution.

## About the application under test

To emulate a real scenario, a web application, also developed by me with **NextJS and Tailwind**, is used as application under test:
- Students Web App repository: https://github.com/chavus/nextjs-mongodb-ts

Different URLs of the deployed app are used to simulate different environments:
- QA: [https://www.ademo.live](https://www.ademo.live/)
- STG: [https://nextjs-mongodb-ts.vercel.app](https://www.ademo.live/)

### Test cases
Simple test scenarios are used as an example:
- Positive and negative scenarios for login functionality
- Different flows for students creation
  
*Refer to feature files for more details*

## Framework components
My intention was to include major required components for a web test automation framework. Some of them are just initial approaches, but provides the required functionality.

### BDD support
- CucumberJS is used as a BDD tool and test runner.
- Features are described using Gherkin syntax on feature files at: `tests\features`
- Steps are defined at: `tests\steps`
### Application abstraction with POM
`web-students-app`

Pages and components of the application are abstracted as classes, following the Page Object Model pattern. Attributes of the page class represent elements, and methods represent functionalities in that page or component.

Playwright is used to interact with the browser: navigate to pages, locate element locators and execute actions.

The POM of the aplication is at: `web-students-app` and it is loosely coupled with the test code, so it can be easily used by other test runners.

### Browser management
`web-students-app\utils\browserManager.ts`

A function that initializes the browser based on the test configuration. It also configures each browser with specific arguments.
> A more robust approach for this is to define a class that contains methods to create and interacts with browser. This is to be implemented in the future. Here is a reference from another of my projects with Java/Selenium: [DriverManager.java](https://github.com/chavus/java-selenium-cucumber-template/blob/main/src/main/java/app/DriverManager.java)

### Support for test configuration: different environments and browsers
`tests\utils\testConfig.ts`

Some test configuratinos can be defined at execution time, for example, the environment and browser they want to use. Example:

`npm test --env=qa --testBrowser=chromium`

For this, following assets are used:
- `cross-env` library to set environment variables from cli and scripts
- `tests\utils\testConfig.ts` module to handle test configuration variables: environment and browser. 
- `dotenv` library is used read environment variables, either from the OS or .env._environment file

### Test context
A `TestContext` object is used to share data across scenario steps. For this [Cucumber World](https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md) class is extended and required variables are defined.
[Cucumber World](https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md)
```ts
setWorldConstructor(function(this:TestContext, options:IWorldOptions){
    /**
     * Initializes custom cucumber World TestContext variables
     */
    this.valid_username = process.env.VALID_USERNAME as string,
    this.valid_password = process.env.VALID_PASSWORD as string
})
```
### Report
Built-in Cucumber reporting was configured to visualize test results. 

```typescript
"format": ["progress-bar", ["html", "/tests/reports/cucumber-report.html"]]
```

## Test execution
Once project has been cloned and dependencies installed. Test can be executed with the following options:

#### Using scripts configured in package.json:
- `npm test`
- `npm test --env=qa --testBrowser=chromium`

#### Using cucumber CLI:
- `npx cucumber-js test`
- `npx cucumber-js test --tags "@login1"`

#### Using cross-env to pass environment variables for test configuration :
- `npx cross-env ENV=qa BROWSER=webkit cucumber-js test `
- `npx cross-env ENV=qa BROWSER=chromium cucumber-js test --tags "@login1`" `

## Technical Debt
- Improve browser manager. Refactor to make it a class that contains methods to create and return a browser instance and other browser related actions. Here is a reference from another of my projects with Java/Selenium: [DriverManager.java](https://github.com/chavus/java-selenium-cucumber-template/blob/main/src/main/java/app/DriverManager.java)
- Improve assertion strategy on steps definitions to better show error messages. Currently Playwright `expect` approach is not displaying specified error messages. Also there are some `expect`'s in the page classes that are not being handled, so assertions are really happening in the page classes, which is not a good practice.
- Include clean up routines or steps. For example: to delete created students during the test.
- Enhance reporting: Options are Allure for Cucumber.js and Playwright reporter

## Current Issues
- Execution with *firefox* fails after first scenario. Need to review.
   
## Next steps
- CI/CD integration