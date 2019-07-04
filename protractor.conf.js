exports.config = {

    framework: 'mocha',
    mochaOpts: {
        timeout: 60000
    },
    baseUrl: '',

    specs: ['*-spec.js'],
    directConnect: true, //to use chromedriver directly
    capabilities: {
        'browserName': 'chrome'
    },

    onPrepare:  () => {
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().maximize();
        var chai = require('chai'); // chai
        var chaiAsPromised = require("chai-as-promised"); // deal with promises from protractor
        chai.use(chaiAsPromised); // add promise candy to the candy of chai
        global.chai = chai; // expose chai globally
        global.expect = chai.expect;

    }

}