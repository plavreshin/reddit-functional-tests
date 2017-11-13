# Webdriver.io based functional tests for Reddit

This is an attempt to test Reddit by using webdriver.io framework.

### Running locally
In order to run these tests against local Reddit instance, one shall bring Reddit vagrant instance up:
`vagrant up`

Make sure you can access now Reddity by following hostname: `http://reddit.local/`

Next, make sure you have `node` and `npm` installed locally.

Locate this repository and execute following commands:
```
npm install
npm install allure-commandline -g
```

Once `node_modules` are installed, feel free to run tests by executing: `npm test`.

### Allure reports

Allure reports can be viewed by executing following command:
```
allure generate allure-results; allure open allure-report
```