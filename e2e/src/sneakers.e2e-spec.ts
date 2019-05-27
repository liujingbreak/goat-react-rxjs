import { browser, by, element, ElementFinder } from 'protractor';
const {sneakers} = require('../../api');

const port = 3000;
const sneakerNames = sneakers.map(sneaker => sneaker.name);
describe('accessing localhost address', () => {
	beforeAll(() => {
		browser.waitForAngularEnabled(false);
	});

	it('should always redirect to /sneakers, even address is not found', async () => {
		await browser.get('http://localhost:' + port);
		await browser.sleep(500);
		let url = await browser.getCurrentUrl();
		expect(url).toMatch(/\/sneakers$/);

		await browser.get(`http://localhost:${port}/sneakers/404`);
		await browser.sleep(500);
		url = await browser.getCurrentUrl();
		expect(url).toMatch(/\/sneakers$/);
	});

	it('should display 20 sneakers', async () => {
		await browser.sleep(200);
		expect(await element(by.css('.tst-sneaker-grid')).isDisplayed()).toBe(true);

		const count = await element.all(by.css('.tst-sneaker-name')).count();
		expect(count).toBe(20);
		const names = await element.all(by.css('.tst-sneaker-name'))
		.then((els: ElementFinder[]) => {
			return Promise.all(els.map(el => el.getText()));
		})
		expect(names).toEqual(sneakerNames.slice(0, 20));
	});

	it('should display 20 more sneakers, when user click "SEE MORE"', async () => {
		const seeMore = element(by.cssContainingText('button', 'SEE MORE'));
		expect(await seeMore.isDisplayed).toBeTruthy();
		seeMore.click();
		browser.sleep(500);
		const count = await element.all(by.css('.tst-sneaker-name')).count();
		expect(count).toBe(40);

		const names = await element.all(by.css('.tst-sneaker-name'))
		.then((els: ElementFinder[]) => {
			return Promise.all(els.map(el => el.getText()));
		})

		expect(names).toEqual(sneakerNames.slice(0, 40));
		console.log(names);
	});

	
	it('should hide "SEE MORE" button after all sneakers are displayed', async () => {
		// TODO: more cases including nagetive cases like loading failed.
		// ...
	});

	it('should only display details and hide list page, when user click on on sneaker', async () => {
		browser.sleep(1000); // let reviewer see the screen content
		await element.all(by.css('.tst-sneaker-name')).get(Math.floor(Math.random() * 40)).click();
		browser.sleep(100);
		expect(await element(by.css('.tst-sneaker-grid')).isDisplayed()).toBe(false);
		expect(await element(by.css('.tst-SneakerDetail')).isDisplayed()).toBe(true);

		browser.sleep(1000); // let reviewer see the screen content
	});

	it('should display list page again, when user navigate back', async () => {
		browser.executeScript('history.back()');
		browser.sleep(1000); // let reviewer see the screen content
		expect(await element(by.css('.tst-sneaker-grid')).isDisplayed()).toBe(true);
	});

	it('should display details, when user navigates by URL', async () => {
		await browser.get(`http://localhost:${port}/sneakers/air-jordan-12-retro-bulls-130690-601`);
		await browser.sleep(500);
		expect(await element(by.css('.tst-sneaker-grid')).isDisplayed()).toBe(false);
		expect(await element(by.css('.tst-SneakerDetail')).isDisplayed()).toBe(true);
	});
});
