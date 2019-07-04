
const waitElementIsPresent = (el, timeout = 5000) => {
    return browser.wait(protractor.ExpectedConditions.presenceOf(el), timeout, `Element not present: ${el.locator()}`);
};
const waitElementIsDisplayed = (el, timeout = 5000, description) => {
    return browser.wait(() => el.isDisplayed(), timeout, description || `Element ${el.locator()} was not displayed in ${timeout} ms`);
};


describe('Twinfield test task', () => {
    const searchBar = $('[name="q"]');
    const googleSearchButton = $('[name="btnK"]');
    const searchResults = $$('div.g');

    beforeEach(async () => {
        await browser.driver.get('https://google.com');
    });


    it('Should ensure that https://www.twinfield.co.uk is the first in the list of search results if searched for "Twinfield"', async () => {
        await waitElementIsDisplayed(searchBar);
        await searchBar.click();
        await searchBar.sendKeys('Twinfield');
        await waitElementIsDisplayed(googleSearchButton);
        await googleSearchButton.click();
        const firstLink = await searchResults.get(0).$('a').getAttribute('href');
        await console.log(firstLink);
        expect(firstLink).to.equal('https://twinfield.co.uk', 'first link should be https://twinfield.co.uk!!!');

    });

    it('Should follow each link that includes "twinfield"', async () => {
        await waitElementIsDisplayed(searchBar);
        await searchBar.click();
        await searchBar.sendKeys('Twinfield');
        await waitElementIsDisplayed(googleSearchButton);
        await googleSearchButton.click();

        let all = await searchResults.$$('a').getAttribute('href').each(function (element, index) {
            element.getAttribute('href').then(function (url) {
                if (url.includes('twinfield')) {
                    browser.driver.get(url);
                }
            })
        })


    });



});